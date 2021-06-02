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
        
        $this->whiteColumn = array("date", "num", "id_client", "entreprise", "nom", "prenom", "siret", "telephone", "mail", "adresse", "produit_id", "quantite", "date_paiement", "type_paiement", "id_devis", "reference", "description", "prix_unitaire");
        $this->whiteTable = array("client", "devis", "produit_devis", "facture", "produit");


        $dsn = "mysql:host=$this->hostname;dbname=$this->database;charset=$this->charset";
        try {
            $this->pdo = new \PDO($dsn,$this->username,$this->password);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public function getClients(){
        $sql = "SELECT * FROM client";
        return $this->execSQL($sql, array());
    }
    
    public function getClient($id){
        $sql = "SELECT * FROM client WHERE id = ?";
        return $this->execSQL($sql, array($id));
    }

    public function getClientbyiddevis($id){
        $sql = "SELECT * FROM devis, client WHERE devis.id_client = client.id and devis.id = ?";
        return $this->execSQL($sql, array($id));
    }

    public function getDevis(){
        $sql = "SELECT devis.id, client.nom, client.prenom, client.id as cid, devis.num, devis.date FROM (devis LEFT JOIN client on id_client = client.id);";
        return $this->execSQL($sql, array());
    }

    public function getFactures(){
        $sql = "SELECT facture.id, facture.num, facture.date, devis.num as dnum, date_paiement, type_paiement, id_devis, nom, prenom, entreprise FROM (facture LEFT JOIN devis on facture.id_devis = devis.id) LEFT JOIN client on devis.id_client = client.id";
        return $this->execSQL($sql, array());
    }

    public function getOneFacture($numfacture){
        $sql = "SELECT facture.id, facture.num, facture.date, devis.num as dnum, date_paiement, type_paiement, id_devis, nom, prenom, entreprise FROM (facture LEFT JOIN devis on facture.id_devis = devis.id) LEFT JOIN client on devis.id_client = client.id WHERE facture.id = ?";
        return $this->execSQL($sql, array($numfacture));
    }

    public function getProduits(){
        $sql = "SELECT * FROM produit";
        return $this->execSQL($sql, array());
    }

    public function getOneDevis($numdevis){
        $sql = "SELECT devis.id as devisid, date, num, id_client, client.id as clientid, nom, prenom, siret, entreprise, telephone, mail, adresse FROM devis, client WHERE id_client = client.id AND devis.id = ?";
        return $this->execSQL($sql, array($numdevis));
    }

    public function getListProduit($numdevis){
        $sql = "SELECT produit_devis.id as pdid, reference, description, quantite, prix_unitaire FROM produit, devis, produit_devis WHERE produit.id = produit_id AND devis.id = devis_id AND devis.id = ?";
        return $this->execSQL($sql, array($numdevis));
    }

    private function getFunctionCall(){
        $trace = debug_backtrace();
        return $trace[2]['function'];
    }
    /**
     * INSERT
     */

    public function insertClient($nom, $prenom, $siret, $entreprise, $telephone, $mail, $adresse){
        $sql = "INSERT INTO `client` (`id`) VALUES (NULL);";
        return $this-> execSQL($sql, array());
    }

    public function insertDevis(){
        $sql = "INSERT INTO `devis` (`id`, `date`) VALUES (NULL, NOW());";
        return $this-> execSQL($sql, array());
    }

    public function insertFacture(){
        $sql = "INSERT INTO `facture` (`id`, `date`) VALUES (NULL, NOW());";
        return $this-> execSQL($sql, array());
    }

    public function insertProduit(){
        $sql = "INSERT INTO `produit` (`id`) VALUES (NULL);";
        return $this-> execSQL($sql, array());
    }

    public function insertProduitDevis($id){
        $sql = "INSERT INTO `produit_devis` (`devis_id`) VALUES (?);";
        return $this-> execSQL($sql, array($id));
    }

    /**
     * UPDATE
     */
    public function update($table, $column, $data, $id){
        if(in_array($table, $this->whiteTable) && in_array($column, $this->whiteColumn)){
            $sql = "UPDATE $table SET $column = ? WHERE `id` = ?";
            return $this->execSQL($sql, array($data, $id));
        }
        return false;
    }

    /**
     * DELETE
     */
    public function delete($table, $id){
        if(in_array($table, $this->whiteTable)){
            $sql = "DELETE FROM $table WHERE `id` = ?";
            return $this->execSQL($sql, array($id));
        }
        return false;
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
    