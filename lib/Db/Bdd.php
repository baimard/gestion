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
        
        $this->whiteColumn = array("date", "num", "id_client", "entreprise", "nom", "prenom", "legal_one", "telephone", "mail", "adresse", "produit_id", "quantite", "date_paiement", "type_paiement", "id_devis", "reference", "description", "prix_unitaire", "legal_two", "path", "tva_default", "mentions_default", "version", "mentions", "comment", "status_paiement", "devise", "auto_invoice_number", "changelog");
        $this->whiteTable = array("client", "devis", "produit_devis", "facture", "produit", "configuration");
        $this->tableprefix = '*PREFIX*' ."gestion_";
        $this->pdo = $db;
        $this->l = $l;
    }

    public function getConfiguration($idNextcloud){
        $sql = "SELECT * FROM `".$this->tableprefix."configuration` WHERE id_nextcloud = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getClients($idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."client WHERE id_nextcloud = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }
    
    public function getClient($id,$idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."client WHERE id = ? AND id_nextcloud = ?";
        return $this->execSQL($sql, array($id,$idNextcloud));
    }

    public function getClientbyiddevis($id, $idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."devis as d, ".$this->tableprefix."client as c WHERE d.id_client = c.id AND d.id = ? AND d.id_nextcloud = ?";
        return $this->execSQL($sql, array($id, $idNextcloud));
    }

    public function getDevis($idNextcloud){
        $sql = "SELECT ".$this->tableprefix."devis.id, ".$this->tableprefix."client.nom, ".$this->tableprefix."client.prenom, ".$this->tableprefix."client.id as cid, ".$this->tableprefix."devis.num, ".$this->tableprefix."devis.date, ".$this->tableprefix."devis.version, ".$this->tableprefix."devis.mentions FROM (".$this->tableprefix."devis LEFT JOIN ".$this->tableprefix."client on id_client = ".$this->tableprefix."client.id) WHERE ".$this->tableprefix."devis.id_nextcloud = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getFactures($idNextcloud){
        $sql = "SELECT ".$this->tableprefix."facture.id, ".$this->tableprefix."facture.num, ".$this->tableprefix."facture.date, ".$this->tableprefix."devis.num as dnum, date_paiement, type_paiement, id_devis, nom, prenom, entreprise, ".$this->tableprefix."facture.version, status_paiement FROM (".$this->tableprefix."facture LEFT JOIN ".$this->tableprefix."devis on ".$this->tableprefix."facture.id_devis = ".$this->tableprefix."devis.id) LEFT JOIN ".$this->tableprefix."client on ".$this->tableprefix."devis.id_client = ".$this->tableprefix."client.id  WHERE ".$this->tableprefix."facture.id_nextcloud = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getOneFacture($numfacture, $idNextcloud){
        $sql = "SELECT ".$this->tableprefix."facture.id," . $this->tableprefix . "facture.version," . $this->tableprefix . "facture.num, ".$this->tableprefix."facture.date, ".$this->tableprefix."devis.num as dnum, comment, date_paiement, type_paiement, id_devis, nom, prenom, entreprise FROM (".$this->tableprefix."facture LEFT JOIN ".$this->tableprefix."devis on ".$this->tableprefix."facture.id_devis = ".$this->tableprefix."devis.id) LEFT JOIN ".$this->tableprefix."client on ".$this->tableprefix."devis.id_client = ".$this->tableprefix."client.id WHERE ".$this->tableprefix."facture.id = ? AND ".$this->tableprefix."facture.id_nextcloud = ?";
        return $this->execSQL($sql, array($numfacture, $idNextcloud));
    }

    public function getProduits($idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."produit WHERE id_nextcloud = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getOneDevis($numdevis,$idNextcloud){
        $sql = "SELECT ".$this->tableprefix."devis.id as devisid, ".$this->tableprefix."devis.version, ".$this->tableprefix."devis.comment, date, num, id_client, ".$this->tableprefix."client.id as clientid, nom, prenom, legal_one, entreprise, telephone, mail, adresse FROM ".$this->tableprefix."devis left join ".$this->tableprefix."client on id_client = ".$this->tableprefix."client.id WHERE ".$this->tableprefix."devis.id = ? AND ".$this->tableprefix."devis.id_nextcloud = ?";
        return $this->execSQL($sql, array($numdevis,$idNextcloud));
    }

    public function getListProduit($numdevis, $idNextcloud){
        $sql = "SELECT ".$this->tableprefix."produit.id as pid,".$this->tableprefix."produit_devis.id as pdid, reference, description, quantite, prix_unitaire FROM ".$this->tableprefix."produit, ".$this->tableprefix."devis, ".$this->tableprefix."produit_devis WHERE ".$this->tableprefix."produit.id = produit_id AND ".$this->tableprefix."devis.id = devis_id AND ".$this->tableprefix."devis.id = ? AND ".$this->tableprefix."devis.id_nextcloud = ? AND ".$this->tableprefix."produit.id_nextcloud = ?";
        return $this->execSQL($sql, array($numdevis, $idNextcloud, $idNextcloud));
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
        $sql = "INSERT INTO `".$this->tableprefix."client` (`id_nextcloud`,`nom`,`prenom`,`legal_one`,`entreprise`,`telephone`,`mail`,`adresse`) VALUES (?,?,?,?,?,?,?,?)";
        $this->execSQLNoData($sql,array($idNextcloud,
                                            $this->l->t('Name'),
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
        $sql = "INSERT INTO `".$this->tableprefix."devis` (`id`, `date`,`id_nextcloud`,`num`,`id_client`,version,mentions,comment) VALUES (NULL, NOW(),?,?,0,'0.1',?,?);";
        $this->execSQLNoData($sql, array($idNextcloud,$this->l->t('Quote number'),$this->l->t('New'),$this->l->t('Comment')));
        return true;
    }

    /**
     * Insert invoice
     */
    public function insertFacture($idNextcloud){
        $sql = "INSERT INTO `".$this->tableprefix."facture` (`id`, `date`,`id_nextcloud`,`num`,`date_paiement`,`type_paiement`,`id_devis`) VALUES (NULL,?,?,?,NOW(),?,0);";
        $this->execSQLNoData($sql, array($this->l->t('Text free'),$idNextcloud,$this->l->t('Invoice number'),$this->l->t('Means of payment')));

        if(json_decode($this->getConfiguration(($idNextcloud)))[0]->auto_invoice_number == 1){
            $this->gestion_update('facture', 'num', $this->l->t('INVOICE')."-".$this->lastinsertid(),$this->lastinsertid(),$idNextcloud);
        }
        
        return true;
    }
    
    public function insertProduit($idNextcloud){
        $sql = "INSERT INTO `".$this->tableprefix."produit` (`id_nextcloud`,`reference`,`description`,`prix_unitaire`) VALUES (?,?,?,0);";
        $this->execSQLNoData($sql, array($idNextcloud,$this->l->t('Reference'),$this->l->t('Designation')));
        return true;
    }

    public function insertProduitDevis($id,$idNextcloud){
        $res = $this->searchMaxIdProduit($idNextcloud);
        $sql = "INSERT INTO `".$this->tableprefix."produit_devis` (`devis_id`, `id_nextcloud`,`produit_id`,`quantite`,`discount`) VALUES (?,?,?,1,0);";
        $this->execSQLNoData($sql, array($id,$idNextcloud,$res[0]['id']));
        return true;
    }

    public function searchMaxIdProduit($idNextcloud){
        $sqlSearchMax = "SELECT MIN(id) as id FROM `".$this->tableprefix."produit` WHERE id_nextcloud = ?";
        return $this->execSQLNoJsonReturn($sqlSearchMax, array($idNextcloud));
    }
    
    /**
     * UPDATE
     */
    public function gestion_update($table, $column, $data, $id, $idNextcloud){
        if(in_array($table, $this->whiteTable) && in_array($column, $this->whiteColumn)){
            $sql = "UPDATE ".$this->tableprefix.$table." SET $column = ? WHERE `id` = ? AND `id_nextcloud` = ?";
            $this->execSQLNoData($sql, array(htmlentities($data), $id, $idNextcloud));
            return true;
        }
        return false;
    }

    /**
     * DELETE
     */
    public function gestion_delete($table, $id, $idNextcloud){
        if(in_array($table, $this->whiteTable)){
            $sql = "DELETE FROM ".$this->tableprefix.$table." WHERE `id` = ? AND `id_nextcloud` = ?";
            $this->execSQLNoData($sql, array($id, $idNextcloud));
            return true;
        }
        return false;
    }

    /**
     * Check
     * TODO Translation
     */
    public function checkConfig($idNextcloud){
        $sql = "SELECT count(*) as res FROM `".$this->tableprefix."configuration` WHERE `id_nextcloud` = ?";
        $res = json_decode($this->execSQL($sql, array($idNextcloud)))[0]->res;
        if ( $res < 1 ){
            $sql = "INSERT INTO `".$this->tableprefix."configuration` (`id`, `entreprise`, `nom`, `prenom`, `legal_one`, `legal_two`, `mail`, `telephone`, `adresse`, `path`, `id_nextcloud`,`mentions_default`,`tva_default`,`devise`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, '/', ?, ?, '0',?);";
            $this->execSQLNoData($sql, array($this->l->t('Your company name'),
                                        $this->l->t('Your company contact surname'),
                                        $this->l->t('Your company contact name'),
                                        $this->l->t('Company legal information line one'),
                                        $this->l->t('Company legal information line two'),
                                        $this->l->t('Your company email'),
                                        $this->l->t('Your company phone'),
                                        $this->l->t('Your company address'),
                                        $idNextcloud,
                                        $this->l->t('All Legal mentions, disclaimer or everything, you want place in the footer.'),
                                        $this->l->t('EUR')
                                        )
                                    );
        }
        return $res;
    }

    public function isConfig($idNextcloud){
        $sql = "SELECT count(*) as res FROM `".$this->tableprefix."configuration` WHERE `id_nextcloud` = ?";
        $res = json_decode($this->execSQL($sql, array($idNextcloud)))[0]->res;
        if ( $res < 1 ){
            return false;
        }else{
            $sql = "SELECT id as id, changelog as res FROM `".$this->tableprefix."configuration` WHERE `id_nextcloud` = ?";
            $res = json_decode($this->execSQL($sql, array($idNextcloud)))[0]->res;
            $id = json_decode($this->execSQL($sql, array($idNextcloud)))[0]->id;
            if($res < 1){
                $this->gestion_update("configuration","changelog",($res+1),$id,$idNextcloud);
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
        $sql = "SELECT count(*) as c from ".$this->tableprefix."client WHERE `id_nextcloud` = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    /**
     * Number devis
     */
    public function numberDevis($idNextcloud){
        $sql = "SELECT count(*) as c from ".$this->tableprefix."devis WHERE `id_nextcloud` = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }
    
    /**
     * Number facture
     */
    public function numberFacture($idNextcloud){
        $sql = "SELECT count(*) as c from ".$this->tableprefix."facture WHERE `id_nextcloud` = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    /**
     * Number produit
     */
    public function numberProduit($idNextcloud){
        $sql = "SELECT count(*) as c from ".$this->tableprefix."produit WHERE `id_nextcloud` = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    /**
     * Annual turnover per month without VAT
     */
    public function getAnnualTurnoverPerMonthNoVat($idNextcloud){
        $sql = "SELECT  YEAR(oc_gestion_facture.date_paiement) as y, 
                        MONTH(oc_gestion_facture.date_paiement) as m, 
                        sum(oc_gestion_produit.prix_unitaire * oc_gestion_produit_devis.quantite) as total
                FROM `oc_gestion_facture`, `oc_gestion_produit_devis`, `oc_gestion_produit`
                WHERE oc_gestion_facture.id_devis = oc_gestion_produit_devis.devis_id
                AND oc_gestion_produit_devis.produit_id = oc_gestion_produit.id
                AND oc_gestion_facture.id_nextcloud = ?
                GROUP BY YEAR(oc_gestion_facture.date_paiement), MONTH(oc_gestion_facture.date_paiement)
                ORDER BY YEAR(oc_gestion_facture.date_paiement) DESC, MONTH(oc_gestion_facture.date_paiement);";
        return $this->execSQL($sql, array($idNextcloud));
    }

    /**
     * Get last insert id
     */
    public function lastinsertid(){
        return $this->execSQLNoJsonReturn("SELECT LAST_INSERT_ID();",array())[0]['LAST_INSERT_ID()'];
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
    
