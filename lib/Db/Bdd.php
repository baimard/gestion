<?php
namespace OCA\Gestion\Db;

use OCP\IDBConnection;

class Bdd {
    private String $charset = 'utf8mb4';
    private IDbConnection $pdo;
    private array $whiteColumn;
    private array $whiteTable;
    private String $tableprefix;

    public function __construct(IDbConnection $db) {
        
        $this->whiteColumn = array("date", "num", "id_client", "entreprise", "nom", "prenom", "siret", "telephone", "mail", "adresse", "produit_id", "quantite", "date_paiement", "type_paiement", "id_devis", "reference", "description", "prix_unitaire", "siren", "path", "tva_default");
        $this->whiteTable = array("client", "devis", "produit_devis", "facture", "produit", "configuration");
        $this->tableprefix = '*PREFIX*' ."gestion_";
        $this->pdo = $db;
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
        $sql = "SELECT ".$this->tableprefix."devis.id, ".$this->tableprefix."client.nom, ".$this->tableprefix."client.prenom, ".$this->tableprefix."client.id as cid, ".$this->tableprefix."devis.num, ".$this->tableprefix."devis.date FROM (".$this->tableprefix."devis LEFT JOIN ".$this->tableprefix."client on id_client = ".$this->tableprefix."client.id) WHERE ".$this->tableprefix."devis.id_nextcloud = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getFactures($idNextcloud){
        $sql = "SELECT ".$this->tableprefix."facture.id, ".$this->tableprefix."facture.num, ".$this->tableprefix."facture.date, ".$this->tableprefix."devis.num as dnum, date_paiement, type_paiement, id_devis, nom, prenom, entreprise FROM (".$this->tableprefix."facture LEFT JOIN ".$this->tableprefix."devis on ".$this->tableprefix."facture.id_devis = ".$this->tableprefix."devis.id) LEFT JOIN ".$this->tableprefix."client on ".$this->tableprefix."devis.id_client = ".$this->tableprefix."client.id  WHERE ".$this->tableprefix."facture.id_nextcloud = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getOneFacture($numfacture, $idNextcloud){
        $sql = "SELECT ".$this->tableprefix."facture.id, ".$this->tableprefix."facture.num, ".$this->tableprefix."facture.date, ".$this->tableprefix."devis.num as dnum, date_paiement, type_paiement, id_devis, nom, prenom, entreprise FROM (".$this->tableprefix."facture LEFT JOIN ".$this->tableprefix."devis on ".$this->tableprefix."facture.id_devis = ".$this->tableprefix."devis.id) LEFT JOIN ".$this->tableprefix."client on ".$this->tableprefix."devis.id_client = ".$this->tableprefix."client.id WHERE ".$this->tableprefix."facture.id = ? AND ".$this->tableprefix."facture.id_nextcloud = ?";
        return $this->execSQL($sql, array($numfacture, $idNextcloud));
    }

    public function getProduits($idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."produit WHERE id_nextcloud = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getOneDevis($numdevis,$idNextcloud){
        $sql = "SELECT ".$this->tableprefix."devis.id as devisid, date, num, id_client, ".$this->tableprefix."client.id as clientid, nom, prenom, siret, entreprise, telephone, mail, adresse FROM ".$this->tableprefix."devis, ".$this->tableprefix."client WHERE id_client = ".$this->tableprefix."client.id AND ".$this->tableprefix."devis.id = ? AND ".$this->tableprefix."devis.id_nextcloud = ?";
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
     * INSERT
     */

    public function insertClient($idNextcloud,$name,$fname,$lc,$c,$pn,$email,$address){
        $sql = "INSERT INTO `".$this->tableprefix."client` (`id`,`id_nextcloud`,`nom`,`prenom`,`siret`,`entreprise`,`telephone`,`mail`,`adresse`) VALUES (NULL,?,?,?,?,?,?,?,?)";
        return $this-> execSQL($sql,array($idNextcloud,$name,$fname,$lc,$c,$pn,$email,$address));
    }

    public function insertDevis($idNextcloud,$nd){
        $sql = "INSERT INTO `".$this->tableprefix."devis` (`id`, `date`,`id_nextcloud`,`num`,`id_client`) VALUES (NULL, NOW(), ?,?,0);";
        return $this-> execSQL($sql, array($idNextcloud,$nd));
    }

    public function insertFacture($idNextcloud,$nf,$tp){
        $sql = "INSERT INTO `".$this->tableprefix."facture` (`id`, `date`,`id_nextcloud`,`num`,`date_paiement`,`type_paiement`,`id_devis`) VALUES (NULL, 'Texte libre', ?,?,NOW(),?,1);";
        return $this-> execSQL($sql, array($idNextcloud,$nf,$tp));
    }

    public function insertProduit($idNextcloud,$ref,$des){
        $sql = "INSERT INTO `".$this->tableprefix."produit` (`id`,`id_nextcloud`,`reference`,`description`,`prix_unitaire`) VALUES (NULL, ?,?,?, 0);";
        return $this-> execSQL($sql, array($idNextcloud,$ref,$des));
    }

    public function insertProduitDevis($id,$idNextcloud){
        $res = $this->searchMaxIdProduit($idNextcloud);
        $sql = "INSERT INTO `".$this->tableprefix."produit_devis` (`devis_id`, `id_nextcloud`,`produit_id`,`quantite`) VALUES (?,?,?,1);";
        return $this-> execSQL($sql, array($id,$idNextcloud,$res[0]['id']));

    }

    public function searchMaxIdProduit($idNextcloud){
        $sqlSearchMax = "SELECT MIN(id) as id FROM `".$this->tableprefix."produit` WHERE id_nextcloud = ?";
        return $this-> execSQLNoJsonReturn($sqlSearchMax, array($idNextcloud));
    }
    
    /**
     * UPDATE
     */
    public function gestion_update($table, $column, $data, $id, $idNextcloud){
        if(in_array($table, $this->whiteTable) && in_array($column, $this->whiteColumn)){
            $sql = "UPDATE ".$this->tableprefix.$table." SET $column = ? WHERE `id` = ? AND `id_nextcloud` = ?";
            return $this->execSQL($sql, array(htmlentities($data), $id, $idNextcloud));
        }
        return false;
    }

    /**
     * DELETE
     */
    public function gestion_delete($table, $id, $idNextcloud){
        if(in_array($table, $this->whiteTable)){
            $sql = "DELETE FROM ".$this->tableprefix.$table." WHERE `id` = ? AND `id_nextcloud` = ?";
            return $this->execSQL($sql, array($id, $idNextcloud));
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
            $sql = "INSERT INTO `".$this->tableprefix."configuration` (`id`, `entreprise`, `nom`, `prenom`, `siret`, `siren`, `mail`, `telephone`, `adresse`, `path`, `id_nextcloud`) VALUES (NULL, 'a remplir', 'a remplir', 'a remplir', 'a remplir', 'a remplir', 'a remplir', 'a remplir', 'a remplir', '/', ?);";
            $this->execSQL($sql, array($idNextcloud));
        }
        return $res;
    }

    public function isConfig($idNextcloud){
        $sql = "SELECT count(*) as res FROM `".$this->tableprefix."configuration` WHERE `id_nextcloud` = ?";
        $res = json_decode($this->execSQL($sql, array($idNextcloud)))[0]->res;
        if ( $res < 1 ){
            return false;
        }else{
            return true;
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

    private function execSQLNoJsonReturn($sql, $conditions){
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($conditions);
        $data = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        $stmt->closeCursor();
        return $data;
    }

}
    