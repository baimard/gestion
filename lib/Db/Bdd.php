<?php
namespace OCA\Gestion\Db;

use OCP\IDBConnection;
use OCP\IL10N;

class Bdd {
    private String $charset = 'utf8mb4';
    private IDbConnection $pdo;
    private array $whiteColumn;
    private array $whiteTable;
    private String $tableprefix;
    private $l;

    public function __construct(IDbConnection $db,
                                IL10N $l) {
        $this->whiteColumn = array("date", "num", "id_client", "entreprise", "nom", "prenom", "legal_one", "telephone", "mail", "adresse", "produit_id", "quantite", "date_paiement", "type_paiement", "id_devis", "reference", "description", "prix_unitaire", "legal_two", "path", "tva_default", "mentions_default", "version", "mentions", "comment", "status_paiement", "devise", "auto_invoice_number", "changelog", "format", "comment", "user_id", "facture_prefixe", "id_configuration", "delay", "header");
        $this->whiteTable = array("client", "devis", "produit_devis", "facture", "produit", "configuration");
        $this->tableprefix = '*PREFIX*' ."gestion_";
        $this->pdo = $db;
        $this->l = $l;
    }

    public function getConfiguration($idNextcloud){
        $sql = "SELECT * FROM `".$this->tableprefix."configuration` WHERE id = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getCompaniesList($User){
        $sql = "SELECT id, entreprise FROM `".$this->tableprefix."configuration` WHERE id_nextcloud = ? OR id in (SELECT id_configuration FROM `".$this->tableprefix."conf_share` WHERE id_nextcloud = ?)";
        return $this->execSQLNoJsonReturn($sql, array($User, $User));
    }

    public function getCompaniesOwner($User){
        $sql = "SELECT id FROM `".$this->tableprefix."configuration` WHERE id_nextcloud = ?";
        return $this->execSQLNoJsonReturn($sql, array($User));
    }

    public function getUsersShared($idConfiguration){
        $sql = "SELECT id_nextcloud FROM `".$this->tableprefix."conf_share` WHERE id_configuration = ?";
        return $this->execSQLNoJsonReturn($sql, array($idConfiguration));
    }

    public function getClients($idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."client WHERE id_configuration = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }
    
    public function getClient($id,$idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."client WHERE id = ? AND id_configuration = ?";
        return $this->execSQL($sql, array($id,$idNextcloud));
    }

    public function getClientbyiddevis($id, $idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."devis as d, ".$this->tableprefix."client as c WHERE d.id_client = c.id AND d.id = ? AND d.id_configuration = ?";
        return $this->execSQL($sql, array($id, $idNextcloud));
    }

    public function getDevis($idNextcloud){
        $sql = "SELECT ".$this->tableprefix."devis.id, ".$this->tableprefix."devis.user_id, ".$this->tableprefix."client.entreprise, ".$this->tableprefix."client.nom, ".$this->tableprefix."client.prenom, ".$this->tableprefix."client.id as cid, ".$this->tableprefix."devis.num, ".$this->tableprefix."devis.date, ".$this->tableprefix."devis.version, ".$this->tableprefix."devis.mentions, ".$this->tableprefix."devis.delay FROM (".$this->tableprefix."devis LEFT JOIN ".$this->tableprefix."client on id_client = ".$this->tableprefix."client.id AND ".$this->tableprefix."devis.id_configuration = ".$this->tableprefix."client.id_configuration) WHERE ".$this->tableprefix."devis.id_configuration = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getFactures($idNextcloud){
        $sql = "SELECT ".$this->tableprefix."facture.id, ".$this->tableprefix."facture.user_id, ".$this->tableprefix."facture.num, ".$this->tableprefix."facture.date, ".$this->tableprefix."devis.num as dnum, date_paiement, type_paiement, id_devis, nom, prenom, entreprise, ".$this->tableprefix."facture.version, status_paiement FROM (".$this->tableprefix."facture LEFT JOIN ".$this->tableprefix."devis on ".$this->tableprefix."facture.id_devis = ".$this->tableprefix."devis.id AND ".$this->tableprefix."facture.id_configuration = ".$this->tableprefix."devis.id_configuration) LEFT JOIN ".$this->tableprefix."client on ".$this->tableprefix."devis.id_client = ".$this->tableprefix."client.id AND ".$this->tableprefix."devis.id_configuration = ".$this->tableprefix."client.id_configuration  WHERE ".$this->tableprefix."facture.id_configuration = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getOneFacture($numfacture, $idNextcloud){
        $sql = "SELECT ".$this->tableprefix."facture.id," . $this->tableprefix . "facture.version," . $this->tableprefix . "facture.num, ".$this->tableprefix."facture.date, ".$this->tableprefix."devis.num as dnum, comment, date_paiement, type_paiement, id_devis, nom, prenom, entreprise FROM (".$this->tableprefix."facture LEFT JOIN ".$this->tableprefix."devis on ".$this->tableprefix."facture.id_devis = ".$this->tableprefix."devis.id AND ".$this->tableprefix."facture.id_configuration = ".$this->tableprefix."devis.id_configuration) LEFT JOIN ".$this->tableprefix."client on ".$this->tableprefix."devis.id_client = ".$this->tableprefix."client.id AND ".$this->tableprefix."devis.id_configuration = ".$this->tableprefix."client.id_configuration WHERE ".$this->tableprefix."facture.id = ? AND ".$this->tableprefix."facture.id_configuration = ?";
        return $this->execSQL($sql, array($numfacture, $idNextcloud));
    }

    public function getProduits($idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."produit WHERE id_configuration = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getOneDevis($numdevis,$idNextcloud){
        $sql = "SELECT ".$this->tableprefix."devis.id as devisid, ".$this->tableprefix."devis.version, ".$this->tableprefix."devis.comment, date, num, id_client, ".$this->tableprefix."client.id as clientid, nom, prenom, legal_one, entreprise, telephone, mail, adresse, delay FROM ".$this->tableprefix."devis left join ".$this->tableprefix."client on id_client = ".$this->tableprefix."client.id WHERE ".$this->tableprefix."devis.id = ? AND ".$this->tableprefix."devis.id_configuration = ?";
        return $this->execSQL($sql, array($numdevis,$idNextcloud));
    }

    public function getListProduit($numdevis, $idNextcloud){
        $sql = "SELECT ".$this->tableprefix."produit.id as pid,".$this->tableprefix."produit_devis.id as pdid, header, reference, description,".$this->tableprefix."produit_devis.comment, quantite, prix_unitaire FROM ".$this->tableprefix."produit, ".$this->tableprefix."devis, ".$this->tableprefix."produit_devis WHERE ".$this->tableprefix."produit.id = produit_id AND ".$this->tableprefix."devis.id = devis_id AND ".$this->tableprefix."devis.id = ? AND ".$this->tableprefix."devis.id_configuration = ? AND ".$this->tableprefix."produit.id_configuration = ? ORDER BY `oc_gestion_produit_devis`.`order` ASC";
        return $this->execSQL($sql, array($numdevis, $idNextcloud, $idNextcloud));
    }

    public function addShareUser($idConfiguration, $idNextcloud){
        $sql = "INSERT INTO `".$this->tableprefix."conf_share` (`id_configuration`, `id_nextcloud`) VALUES (?,?)";
        $this->execSQLNoData($sql, array($idConfiguration, $idNextcloud));
        return true;
    } 

    public function delShareUser($idConfiguration, $idNextcloud){
        $sql = "DELETE FROM `".$this->tableprefix."conf_share` WHERE `id_configuration` = ? AND `id_nextcloud` = ?";
        $this->execSQLNoData($sql, array($idConfiguration, $idNextcloud));
        return true;
    }

    private function getFunctionCall(){
        $trace = debug_backtrace();
        return $trace[2]['function'];
    }

    /**
     * INSERT client
     * @$idnextcloud
     */
    public function insertClient($idNextcloud){
        $sql = "INSERT INTO `".$this->tableprefix."client` (`id_configuration`,`nom`,`prenom`,`legal_one`,`entreprise`,`telephone`,`mail`,`adresse`) VALUES (?,?,?,?,?,?,?,?)";
        $this->execSQLNoData($sql,array($idNextcloud,
                                            $this->l->t('Last name'),
                                            $this->l->t('First name'),
                                            $this->l->t('Limited company'),
                                            $this->l->t('Company'),
                                            $this->l->t('Phone number'),
                                            $this->l->t('Email'),
                                            $this->l->t('Address')
                                        )
                                    );
        return true;
    }

    /**
     * Insert quote
     */
    public function insertDevis($idNextcloud){
        $last=0;
        $last = $this->lastinsertid("devis", $idNextcloud) + 1;

        $sql = "INSERT INTO `".$this->tableprefix."devis` ( `date`,
                                                            `id_configuration`,
                                                            `num`,
                                                            `id_client`,
                                                            `version`,
                                                            `mentions`,
                                                            `comment`,
                                                            `user_id`,
                                                            `delay`
                                                        ) 
                                                VALUES (NOW(),?,?,0,'0.1',?,?,?,?);";
        $this->execSQLNoData($sql, array($idNextcloud,$this->l->t('Quote number'),$this->l->t('New'),$this->l->t('Comment'),$last,$this->l->t('Offer valid for 1 month from: ')));
        return true;
    }

    /**
     * Insert invoice
     */
    public function insertFacture($idNextcloud){
        $last=0;
        $last = $this->lastinsertid("facture", $idNextcloud) + 1;

        //PREFIX
        $pref = $this->execSQLNoJsonReturn("SELECT * FROM ".$this->tableprefix."configuration WHERE id = ?",array($idNextcloud));

        $sql = "INSERT INTO `".$this->tableprefix."facture` (`date`,`id_configuration`,`num`,`date_paiement`,`type_paiement`,`id_devis`,`user_id`) VALUES (?,?,?,NOW(),?,0,?);";
        $this->execSQLNoData($sql, array($this->l->t('Text free'),$idNextcloud,$pref[0]['facture_prefixe']."-".$last,$this->l->t('Means of payment'),$last));

        return $last;
    }

    public function insertProduit($idNextcloud){
        $sql = "INSERT INTO `".$this->tableprefix."produit` (`id_configuration`,`reference`,`description`,`prix_unitaire`) VALUES (?,?,?,0);";
        $this->execSQLNoData($sql, array($idNextcloud,$this->l->t('Reference'),$this->l->t('Designation')));
        return true;
    }

    public function insertProduitDevis($id_devis,$idNextcloud){
        $lastproduit = $this->searchMaxIdProduit($idNextcloud);
        $lastproduit = $lastproduit[0]['id'];
        $lastinsertProduitDevis = $this->lastinsertProduitDevis($id_devis, $idNextcloud) + 1;

        $sql = "INSERT INTO `".$this->tableprefix."produit_devis` (`devis_id`, `id_configuration`,`produit_id`,`quantite`,`discount`,`order`) VALUES (?,?,?,1,0,?);";
        $this->execSQLNoData($sql, array($id_devis,$idNextcloud,$lastproduit,$lastinsertProduitDevis));
        return $this->lastinsertProduitDevis($id_devis, $idNextcloud);
    }

    public function searchMaxIdProduit($idNextcloud){
        $sqlSearchMax = "SELECT MIN(id) as id FROM `".$this->tableprefix."produit` WHERE id_configuration = ?";
        return $this->execSQLNoJsonReturn($sqlSearchMax, array($idNextcloud));
    }
    
    /**
     * UPDATE
     */
    public function gestion_update($table, $column, $data, $id, $id_configuration){
        if(in_array($table, $this->whiteTable) && in_array($column, $this->whiteColumn)){
            $sql = "UPDATE ".$this->tableprefix.$table." SET $column = ? WHERE `id` = ? AND `id_configuration` = ?";
            $this->execSQLNoData($sql, array(htmlentities(rtrim($data)), $id, $id_configuration));
            return true;
        }
        return false;
    }

    /**
     * UPDATE
     */
    public function gestion_update_configuration($table, $column, $data, $id, $idNextcloud){
        if(in_array($table, $this->whiteTable) && in_array($column, $this->whiteColumn)){
            $sql = "UPDATE ".$this->tableprefix.$table." SET $column = ? WHERE `id` = ? AND `id_nextcloud` = ?";
            $this->execSQLNoData($sql, array(htmlentities(rtrim($data)), $id, $idNextcloud));
            return true;
        }
        return false;
    }

    /**
     * UPDATE CONFIGURATION TABLE
     * TODO Autorisation à faire cette action par l'utilisateur
     */
    public function gestion_updateConfiguration($table, $column, $data, $id){
        if(in_array($table, $this->whiteTable) && in_array($column, $this->whiteColumn)){
            $sql = "UPDATE ".$this->tableprefix.$table." SET $column = ? WHERE `id` = ?";
            $this->execSQLNoData($sql, array(htmlentities(rtrim($data)), $id));
            return true;
        }
        return false;
    }

    /**
     * DUPLICATE
     */
    public function gestion_duplicate($table, $id, $CurrentCompany){
        if(in_array($table, $this->whiteTable)){
            $sql = "SELECT * FROM ".$this->tableprefix.$table." WHERE `id` = ? AND `id_configuration` = ?";
            $res = $this->execSQLNoJsonReturn($sql, array($id, $CurrentCompany));
            
            $sql = "INSERT INTO ".$this->tableprefix.$table." (";
            $sql2 = " VALUES (";
            foreach($res[0] as $key => $value){
                if($key != "id"){
                    $sql .= $key.",";
                    $sql2 .= "?,";
                }
            }
            
            $sql = rtrim($sql, ",");
            $sql2 = rtrim($sql2, ",");
            $sql .= ")".$sql2.")";
            
            unset($res[0]['id']);
            $res[0]['user_id'] = $this->lastinsertid($table, $CurrentCompany) + 1;

            if($table == "facture"){
                $res[0]['num'] = $this->execSQLNoJsonReturn("SELECT * FROM ".$this->tableprefix."configuration WHERE id = ?", array($CurrentCompany))[0]['facture_prefixe']."-".$res[0]['user_id'];
            }
            $this->execSQLNoData($sql, array_values($res[0]));
            
            if($table == "devis"){
                $sql = "SELECT * FROM ".$this->tableprefix."produit_devis WHERE `devis_id` = ? AND `id_configuration` = ?";
                $res_produit_devis = $this->execSQLNoJsonReturn($sql, array($id, $CurrentCompany));

                $sql = "SELECT max(id) FROM ".$this->tableprefix."devis";
                $id_devis = $this->execSQLNoJsonReturn($sql, array())[0]['max(id)'];

                $sql = "INSERT INTO ".$this->tableprefix."produit_devis (devis_id, id_configuration, produit_id, quantite, discount) VALUES (?,?,?,?,?)";
                foreach($res_produit_devis as $key => $value){
                    $this->execSQLNoData($sql, array($id_devis, $CurrentCompany, $value['produit_id'], $value['quantite'], $value['discount']));
                }
            }
            
            return true;
        }
        return false;
    }

    /**
     * DROP
     */
    public function gestion_drop($id, $value, $CurrentCompany){
        $sql_produits_devis_current = "SELECT * FROM ".$this->tableprefix."produit_devis WHERE `id` = ? AND `id_configuration` = ?";
        $produits_devis_current = $this->execSQLNoJsonReturn($sql_produits_devis_current, array($id, $CurrentCompany));

        if($value == "down"){
            $devis_id = $produits_devis_current[0]['devis_id'];
            $order = $produits_devis_current[0]['order'] + 1;
        }else{
            $devis_id = $produits_devis_current[0]['devis_id'];
            $order = $produits_devis_current[0]['order'] - 1;
        }

        $sql_produits_devis_next = "SELECT * FROM ".$this->tableprefix."produit_devis WHERE `devis_id` = ? AND `order` = ? AND `id_configuration` = ?";
        $produits_devis_next = $this->execSQLNoJsonReturn($sql_produits_devis_next, array($devis_id, $order, $CurrentCompany));

        if(!empty($produits_devis_next)){
            $sql = "UPDATE ".$this->tableprefix."produit_devis SET `order` = ? WHERE `id` = ? AND `id_configuration` = ?";
            $this->execSQLNoData($sql, array($order, $id, $CurrentCompany));

            $sql = "UPDATE ".$this->tableprefix."produit_devis SET `order` = ? WHERE `id` = ? AND `id_configuration` = ?";
            $this->execSQLNoData($sql, array($produits_devis_current[0]['order'], $produits_devis_next[0]['id'], $CurrentCompany));
        }
    }

    /**
     * DELETE
     */
    public function gestion_delete($table, $id, $CurrentCompany){
        if(in_array($table, $this->whiteTable)){
            $sql = "DELETE FROM ".$this->tableprefix.$table." WHERE `id` = ? AND `id_configuration` = ?";
            $this->execSQLNoData($sql, array($id, $CurrentCompany));
            return true;
        }
        return false;
    }

    /**
     * Check
     * TODO id_possesseur à remplacer pour id_nextcloud à changer partout
     */

    public function checkConfig($idConfiguration, $idNextcloud){
        $sql = "SELECT count(*) as res FROM `".$this->tableprefix."configuration` WHERE `id_nextcloud` = ?";
        $res = json_decode($this->execSQL($sql, array($idNextcloud)))[0]->res;
        if ( $res < 1 ){
            $this->createCompany($idNextcloud);
        }
        return $res;
    }

    /**
     * Create a new company
     */
    public function createCompany($idNextcloud){
        $sql = "INSERT INTO `".$this->tableprefix."configuration` (`entreprise`, `nom`, `prenom`, `legal_one`, `legal_two`, `mail`, `telephone`, `adresse`, `path`, `id_nextcloud`,`mentions_default`,`tva_default`,`devise`,`facture_prefixe`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, '', ?, ?, '0',?,?);";
        $this->execSQLNoData($sql, array(
            $this->l->t('Your company name'),
            $this->l->t('Your company contact last name'),
            $this->l->t('Your company contact first name'),
            $this->l->t('Company legal information line one'),
            $this->l->t('Company legal information line two'),
            $this->l->t('Your company email'),
            $this->l->t('Your company phone'),
            $this->l->t('Your company address'),
            $idNextcloud,
            $this->l->t('All Legal mentions, disclaimer or everything you want to place in the footer.'),
            $this->l->t('EUR'),
            $this->l->t('INVOICE')
        ));
        return true;
    }

    public function deleteCompany($idCompany, $idNextcloud){
        $sql = "SELECT * FROM `".$this->tableprefix."configuration` WHERE `id` = ?";
        $res = $this->execSQLNoJsonReturn($sql, array($idCompany));
        
        if ($res[0]['id_nextcloud'] == $idNextcloud){

            $sql = "DELETE FROM `".$this->tableprefix."configuration` WHERE `id` = ? AND `id_nextcloud` = ?";
            $this->execSQLNoData($sql, array($idCompany, $idNextcloud));

            $sql = "DELETE FROM `".$this->tableprefix."client` WHERE `id_configuration` = ?";
            $this->execSQLNoData($sql, array($idCompany));

            $sql = "DELETE FROM `".$this->tableprefix."devis` WHERE `id_configuration` = ?";
            $this->execSQLNoData($sql, array($idCompany));

            $sql = "DELETE FROM `".$this->tableprefix."facture` WHERE `id_configuration` = ?";
            $this->execSQLNoData($sql, array($idCompany));

            $sql = "DELETE FROM `".$this->tableprefix."produit` WHERE `id_configuration` = ?";
            $this->execSQLNoData($sql, array($idCompany));

            $sql = "DELETE FROM `".$this->tableprefix."produit_devis` WHERE `id_configuration` = ?";
            $this->execSQLNoData($sql, array($idCompany));

            $sql = "DELETE FROM `".$this->tableprefix."conf_share` WHERE `id_configuration` = ?";
            $this->execSQLNoData($sql, array($idCompany));
            
            return true;
        }else{

            return false;
        }
    }

    public function isConfig($idConfiguration,$idNextcloud){
        $changelog = 9; //+1 if you want changelog appear for everybody one time !

        $sql = "SELECT count(*) as res FROM `".$this->tableprefix."configuration` WHERE `id_nextcloud` = ?";
        $res = json_decode($this->execSQL($sql, array($idNextcloud)))[0]->res;

        // Utilisateur jamais utilisé l'application
        if ( $res < 1 ){
            return false;
        }else{
            $sql = "SELECT id as id, changelog as res FROM `".$this->tableprefix."configuration` WHERE `id` = ?";
            $res = json_decode($this->execSQL($sql, array($idConfiguration)))[0]->res;
            if($res < $changelog){
                $this->gestion_update_configuration("configuration","changelog",$changelog,$idConfiguration,$idNextcloud);
                return false;
            }else{
                return true;
            }
        }
    }

    /**
     * Number client
     */
    public function numberClient($idNextcloud){
        $sql = "SELECT count(*) as c from ".$this->tableprefix."client WHERE `id_configuration` = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    /**
     * Number devis
     */
    public function numberDevis($idNextcloud){
        $sql = "SELECT count(*) as c from ".$this->tableprefix."devis WHERE `id_configuration` = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }
    
    /**
     * Number facture
     */
    public function numberFacture($idNextcloud){
        $sql = "SELECT count(*) as c from ".$this->tableprefix."facture WHERE `id_configuration` = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    /**
     * Number produit
     */
    public function numberProduit($id_configuration){
        $sql = "SELECT count(*) as c from ".$this->tableprefix."produit WHERE `id_configuration` = ?;";
        return $this->execSQL($sql, array($id_configuration));
    }

    /**
     * Annual turnover per month without VAT
     */
    public function getAnnualTurnoverPerMonthNoVat($id_configuration){
        $sql = "SELECT  EXTRACT(YEAR FROM ".$this->tableprefix."facture.date_paiement) as y, 
                        EXTRACT(MONTH FROM ".$this->tableprefix."facture.date_paiement) as m, 
                        sum(".$this->tableprefix."produit.prix_unitaire * ".$this->tableprefix."produit_devis.quantite) as total
                FROM `".$this->tableprefix."facture`, `".$this->tableprefix."produit_devis`, `".$this->tableprefix."produit`
                WHERE ".$this->tableprefix."facture.id_devis = ".$this->tableprefix."produit_devis.devis_id
                AND ".$this->tableprefix."produit_devis.produit_id = ".$this->tableprefix."produit.id
                AND ".$this->tableprefix."facture.id_configuration = ?
                GROUP BY EXTRACT(YEAR FROM ".$this->tableprefix."facture.date_paiement), EXTRACT(MONTH FROM ".$this->tableprefix."facture.date_paiement)
                ORDER BY EXTRACT(YEAR FROM ".$this->tableprefix."facture.date_paiement) DESC, EXTRACT(MONTH FROM ".$this->tableprefix."facture.date_paiement);";
        return $this->execSQL($sql, array($id_configuration));
    }

    /**
     * Get last insert id
     */
    public function lastinsertid($table,$idNextcloud){
        $sql = "SELECT max(user_id) as last_insert_id FROM `" . $this->tableprefix . $table . "` WHERE " . $this->tableprefix . $table .".id_configuration = ?;";
        $res = $this->execSQLNoJsonReturn($sql,array($idNextcloud));
        return $res[0]['last_insert_id'];
    }

    public function lastinsertProduitDevis($id_devis,$idNextcloud){
        $table = "produit_devis";
        $sql = "SELECT max(`order`) as last_insert_id FROM `" . $this->tableprefix . $table . "` WHERE " . $this->tableprefix . $table . ".id_configuration = ? AND " . $this->tableprefix . $table . ".devis_id = ?;";
        $res = $this->execSQLNoJsonReturn($sql,array($idNextcloud, $id_devis));
        return $res[0]['last_insert_id'];
    }

    public function backup(){
        $res = array();
        $res[] = array("===client===");
        $sql = "SELECT * FROM ".$this->tableprefix."client";
        $res = array_merge($res, $this->execSQLNoJsonReturn($sql, array()));
        
        $res[] = array("===devis===");
        $sql = "SELECT * FROM ".$this->tableprefix."devis";
        $res = array_merge($res,$this->execSQLNoJsonReturn($sql, array()));

        $res[] = array("===facture===");
        $sql = "SELECT * FROM ".$this->tableprefix."facture";
        $res = array_merge($res,$this->execSQLNoJsonReturn($sql, array()));

        $res[] = array("===produit===");
        $sql = "SELECT * FROM ".$this->tableprefix."produit";
        $res = array_merge($res,$this->execSQLNoJsonReturn($sql, array()));

        $res[] = array("===produit_devis===");
        $sql = "SELECT * FROM ".$this->tableprefix."produit_devis";
        $res = array_merge($res,$this->execSQLNoJsonReturn($sql, array()));

        $res[] = array("===configuration===");
        $sql = "SELECT * FROM ".$this->tableprefix."configuration";
        $res = array_merge($res,$this->execSQLNoJsonReturn($sql, array()));

        return $res;
    }

    /**
     * @sql
     * @array() //prepare statement
     */
    private function execSQL($sql, $conditions){
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($conditions);
        $data = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        $stmt->closeCursor();
        return json_encode($data);
    }

    private function execSQLNoData($sql, $conditions){
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($conditions);
        $stmt->closeCursor();
    }

    private function execSQLNoJsonReturn($sql, $conditions){
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($conditions);
        $data = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        $stmt->closeCursor();
        return $data;
    }

}
