<?php
namespace OCA\Gestion\Db;

class Bdd {
    private String $username;
    private String $password;
    private String $database;
    private String $hostname;
    private String $charset = 'utf8mb4';
    private \PDO $pdo;
    private array $whiteColumn;
    private array $whiteTable;

    function __construct() {
        $this->username = "gestion";
        $this->password = "gestion_corp20_216b4b_0d3255";
        $this->database = "gestion";
        $this->hostname = "g_db_gestion";
        
        $this->whiteColumn = array("date", "num", "id_client", "entreprise", "nom", "prenom", "siret", "telephone", "mail", "adresse", "produit_id", "quantite", "date_paiement", "type_paiement", "id_devis", "reference", "description", "prix_unitaire", "siren", "path");
        $this->whiteTable = array("client", "devis", "produit_devis", "facture", "produit", "configuration");


        $dsn = "mysql:host=$this->hostname;dbname=$this->database;charset=$this->charset";
        try {
            $this->pdo = new \PDO($dsn,$this->username,$this->password);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public function getConfiguration($idNextcloud){
        $sql = "SELECT * FROM `configuration` WHERE id_nextcloud = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getClients($idNextcloud){
        $sql = "SELECT * FROM client WHERE id_nextcloud = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }
    
    public function getClient($id,$idNextcloud){
        $sql = "SELECT * FROM client WHERE id = ? AND id_nextcloud = ?";
        return $this->execSQL($sql, array($id,$idNextcloud));
    }

    public function getClientbyiddevis($id, $idNextcloud){
        $sql = "SELECT * FROM devis, client WHERE devis.id_client = client.id AND devis.id = ? AND devis.id_nextcloud = ?";
        return $this->execSQL($sql, array($id, $idNextcloud));
    }

    public function getDevis($idNextcloud){
        $sql = "SELECT devis.id, client.nom, client.prenom, client.id as cid, devis.num, devis.date FROM (devis LEFT JOIN client on id_client = client.id) WHERE devis.id_nextcloud = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getFactures($idNextcloud){
        $sql = "SELECT facture.id, facture.num, facture.date, devis.num as dnum, date_paiement, type_paiement, id_devis, nom, prenom, entreprise FROM (facture LEFT JOIN devis on facture.id_devis = devis.id) LEFT JOIN client on devis.id_client = client.id  WHERE facture.id_nextcloud = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getOneFacture($numfacture, $idNextcloud){
        $sql = "SELECT facture.id, facture.num, facture.date, devis.num as dnum, date_paiement, type_paiement, id_devis, nom, prenom, entreprise FROM (facture LEFT JOIN devis on facture.id_devis = devis.id) LEFT JOIN client on devis.id_client = client.id WHERE facture.id = ? AND facture.id_nextcloud = ?";
        return $this->execSQL($sql, array($numfacture, $idNextcloud));
    }

    public function getProduits($idNextcloud){
        $sql = "SELECT * FROM produit WHERE id_nextcloud = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getOneDevis($numdevis,$idNextcloud){
        $sql = "SELECT devis.id as devisid, date, num, id_client, client.id as clientid, nom, prenom, siret, entreprise, telephone, mail, adresse FROM devis, client WHERE id_client = client.id AND devis.id = ? AND devis.id_nextcloud = ?";
        return $this->execSQL($sql, array($numdevis,$idNextcloud));
    }

    public function getListProduit($numdevis, $idNextcloud){
        $sql = "SELECT produit_devis.id as pdid, reference, description, quantite, prix_unitaire FROM produit, devis, produit_devis WHERE produit.id = produit_id AND devis.id = devis_id AND devis.id = ? AND devis.id_nextcloud = ? AND produit.id_nextcloud = ?";
        return $this->execSQL($sql, array($numdevis, $idNextcloud, $idNextcloud));
    }

    private function getFunctionCall(){
        $trace = debug_backtrace();
        return $trace[2]['function'];
    }
    /**
     * INSERT
     */

    public function insertClient($idNextcloud){
        $sql = "INSERT INTO `client` (`id`,`id_nextcloud`) VALUES (NULL, ?);";
        return $this-> execSQL($sql, array($idNextcloud));
    }

    public function insertDevis($idNextcloud){
        $sql = "INSERT INTO `devis` (`id`, `date`,`id_nextcloud`) VALUES (NULL, NOW(), ?);";
        return $this-> execSQL($sql, array($idNextcloud));
    }

    public function insertFacture($idNextcloud){
        $sql = "INSERT INTO `facture` (`id`, `date`,`id_nextcloud`) VALUES (NULL, NOW(), ?);";
        return $this-> execSQL($sql, array($idNextcloud));
    }

    public function insertProduit($idNextcloud){
        $sql = "INSERT INTO `produit` (`id`,`id_nextcloud`) VALUES (NULL, ?);";
        return $this-> execSQL($sql, array($idNextcloud));
    }

    public function insertProduitDevis($id,$idNextcloud){
        $sql = "INSERT INTO `produit_devis` (`devis_id`, `id_nextcloud`) VALUES (?,?);";
        return $this-> execSQL($sql, array($id,$idNextcloud));
    }

    /**
     * UPDATE
     */
    public function update($table, $column, $data, $id, $idNextcloud){
        if(in_array($table, $this->whiteTable) && in_array($column, $this->whiteColumn)){
            $sql = "UPDATE $table SET $column = ? WHERE `id` = ? AND `id_nextcloud` = ?";
            return $this->execSQL($sql, array($data, $id, $idNextcloud));
        }
        return false;
    }

    /**
     * DELETE
     */
    public function delete($table, $id, $idNextcloud){
        if(in_array($table, $this->whiteTable)){
            $sql = "DELETE FROM $table WHERE `id` = ? AND `id_nextcloud` = ?";
            return $this->execSQL($sql, array($id, $idNextcloud));
        }
        return false;
    }

    /**
     * Check
     */
    public function checkConfig($idNextcloud){
        $sql = "SELECT count(*) as res FROM `configuration` WHERE `id_nextcloud` = ?";
        $res = json_decode($this->execSQL($sql, array($idNextcloud)))[0]->res;
        if ( $res < 1 ){
            $sql = "INSERT INTO `configuration` (`id`, `entreprise`, `nom`, `prenom`, `siret`, `siren`, `mail`, `telephone`, `adresse`, `id_nextcloud`) VALUES (NULL, 'a remplir', 'a remplir', 'a remplir', 'a remplir', 'a remplir', 'a remplir', 'a remplir', 'a remplir', ?);";
            $this->execSQL($sql, array($idNextcloud));
        }
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

}
    