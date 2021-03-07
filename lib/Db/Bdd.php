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
        
        $this->whiteColumn = array("date", "num", "id_client", "entreprise", "nom", "prenom", "siret", "telephone", "mail", "adresse");
        $this->whiteTable = array("client", "devis");


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

    public function getDevis(){
        $sql = "SELECT devis.id, client.nom, client.prenom, client.id as cid, devis.num, devis.date FROM (devis LEFT JOIN client on id_client = client.id);";
        return $this->execSQL($sql, array());
    }

    public function getFactures(){
        $sql = "SELECT * FROM facture, client where id_client = client.id";
        return $this->execSQL($sql, array());
    }

    public function getProduits(){
        $sql = "SELECT * FROM produit";
        return $this->execSQL($sql, array());
    }

    public function getOneDevis($numdevis){
        $sql = "SELECT * FROM devis, client WHERE id_client = client.id AND devis.id = ?";
        return $this->execSQL($sql, array($numdevis));
    }

    public function getListProduit($numdevis){
        $sql = "SELECT reference, description, quantité, prix_unitaire FROM produit, devis, produit_devis WHERE produit.id = produit_id AND devis.id = devis_id AND devis.id = ?";
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
        $sql = "INSERT INTO `client` (`id`, `nom`, `prenom`, `siret`, `entreprise`, `telephone`, `mail`, `adresse`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?);";
        return $this-> execSQL($sql, array($nom, $prenom, $siret, $entreprise, $telephone, $mail, $adresse));
    }

    public function insertDevis(){
        $sql = "INSERT INTO `devis` (`id`, `date`) VALUES (NULL, NOW());";
        return $this-> execSQL($sql, array());
    }

    /**
     * UPDATE
     */
    public function updateClient($table, $column, $data, $id){
        if(in_array($table, $this->whiteTable) && in_array($column, $this->whiteColumn)){
            $sql = "UPDATE $table SET $column = ? WHERE `id` = ?";
            return $this->execSQL($sql, array($data, $id));
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
    