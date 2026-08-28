<?php
namespace OCA\Gestion\Db;

use OCA\Gestion\Service\VatExemptionReasonCatalog;
use OCP\IDBConnection;
use OCP\IL10N;

class Bdd {
    private IDBConnection $db;
    private array $whiteColumn;
    private array $whiteTable;
    private String $tableprefix;
    private $l;

    public function __construct(IDbConnection $db,
                                IL10N $l) {
        $this->whiteColumn = array("date", "num", "id_client", "entreprise", "nom", "prenom", "legal_one", "telephone", "mail", "adresse", "produit_id", "quantite", "date_paiement", "type_paiement", "id_devis", "reference", "description", "prix_unitaire", "legal_two", "path", "tva_default", "mentions_default", "version", "mentions", "comment", "status_paiement", "devise", "auto_invoice_number", "changelog", "format", "comment", "user_id", "facture_prefixe", "id_configuration", "delay", "header","vat", "vat_category", "vat_number", "zip_code", "city_name", "country_code","iban", "company_identification", "logo_width" );
        $this->whiteTable = array("client", "devis", "produit_devis", "facture", "produit", "configuration");
        $this->tableprefix = '*PREFIX*' ."gestion_";
        $this->db = $db;
        $this->l = $l;
    }

    public function getConfiguration($idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."configuration WHERE id = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getCompaniesList($User){
        $sql = "SELECT id, entreprise FROM ".$this->tableprefix."configuration WHERE id_nextcloud = ? OR id in (SELECT id_configuration FROM ".$this->tableprefix."conf_share WHERE id_nextcloud = ?)";
        return $this->execSQLNoJsonReturn($sql, array($User, $User));
    }

    public function getCompaniesOwner($User){
        $sql = "SELECT id FROM ".$this->tableprefix."configuration WHERE id_nextcloud = ?";
        return $this->execSQLNoJsonReturn($sql, array($User));
    }

    public function getUsersShared($idConfiguration){
        $sql = "SELECT id_nextcloud FROM ".$this->tableprefix."conf_share WHERE id_configuration = ?";
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
        $sql = "SELECT ".$this->tableprefix."facture.id," . $this->tableprefix . "facture.version," . $this->tableprefix . "facture.num, ".$this->tableprefix."facture.date, ".$this->tableprefix."devis.num as dnum, comment, date_paiement, type_paiement, id_devis, nom, prenom, entreprise, legal_one, mail, adresse, zip_code, city_name, country_code, company_identification, vat_number FROM (".$this->tableprefix."facture LEFT JOIN ".$this->tableprefix."devis on ".$this->tableprefix."facture.id_devis = ".$this->tableprefix."devis.id AND ".$this->tableprefix."facture.id_configuration = ".$this->tableprefix."devis.id_configuration) LEFT JOIN ".$this->tableprefix."client on ".$this->tableprefix."devis.id_client = ".$this->tableprefix."client.id AND ".$this->tableprefix."devis.id_configuration = ".$this->tableprefix."client.id_configuration WHERE ".$this->tableprefix."facture.id = ? AND ".$this->tableprefix."facture.id_configuration = ?";
        return $this->execSQL($sql, array($numfacture, $idNextcloud));
    }

    public function getProduits($idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."produit WHERE id_configuration = ?";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function getOneDevis($numdevis,$idNextcloud){
        $sql = "SELECT ".$this->tableprefix."devis.id as devisid, ".$this->tableprefix."devis.version, ".$this->tableprefix."devis.comment, date, num, id_client, ".$this->tableprefix."client.id as clientid, nom, prenom, legal_one, entreprise, telephone, mail, adresse, zip_code, city_name, country_code, company_identification, vat_number, delay FROM ".$this->tableprefix."devis left join ".$this->tableprefix."client on id_client = ".$this->tableprefix."client.id WHERE ".$this->tableprefix."devis.id = ? AND ".$this->tableprefix."devis.id_configuration = ?";
        return $this->execSQL($sql, array($numdevis,$idNextcloud));
    }

    public function getListProduit($numdevis, $idNextcloud){
        $query = $this->db->getQueryBuilder();
        $query->selectAlias('p.id', 'pid')
            ->selectAlias('pd.id', 'pdid')
            ->addSelect(
                'p.header',
                'p.reference',
                'p.description',
                'p.vat',
                'p.vat_category',
                'p.vat_exemption_reason_code',
                'p.vat_exemption_reason',
                'pd.comment',
                'pd.quantite',
                'p.prix_unitaire'
            )
            ->from('gestion_produit', 'p')
            ->innerJoin('p', 'gestion_produit_devis', 'pd', $query->expr()->eq('p.id', 'pd.produit_id'))
            ->innerJoin('pd', 'gestion_devis', 'd', $query->expr()->eq('d.id', 'pd.devis_id'))
            ->where($query->expr()->eq('d.id', $query->createNamedParameter($numdevis)))
            ->andWhere($query->expr()->eq('d.id_configuration', $query->createNamedParameter($idNextcloud)))
            ->andWhere($query->expr()->eq('p.id_configuration', $query->createNamedParameter($idNextcloud)))
            ->orderBy('pd.order', 'ASC');

        return $this->rowsToJson($this->fetchAll($query));
    }

    public function addShareUser($idConfiguration, $idNextcloud){
        $sql = "INSERT INTO ".$this->tableprefix."conf_share (id_configuration, id_nextcloud) VALUES (?,?)";
        $this->execSQLNoData($sql, array($idConfiguration, $idNextcloud));
        return true;
    }

    public function delShareUser($idConfiguration, $idNextcloud){
        $sql = "DELETE FROM ".$this->tableprefix."conf_share WHERE id_configuration = ? AND id_nextcloud = ?";
        $this->execSQLNoData($sql, array($idConfiguration, $idNextcloud));
        return true;
    }

    private function getFunctionCall(){
        $trace = debug_backtrace();
        return $trace[2]['function'];
    }

    public function insertClient($idNextcloud, array $client = []){
        $sql = "INSERT INTO ".$this->tableprefix."client (id_configuration,nom,prenom,legal_one,entreprise,telephone,mail,adresse,zip_code,city_name,country_code,company_identification,vat_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $this->execSQLNoData($sql,array($idNextcloud,
                                            $client['nom'] ?? $this->l->t('Last name'),
                                            $client['prenom'] ?? $this->l->t('First name'),
                                            $this->l->t('Limited company'),
                                            $client['entreprise'] ?? $this->l->t('Company'),
                                            $client['telephone'] ?? $this->l->t('Phone number'),
                                            $client['mail'] ?? $this->l->t('Email'),
                                            $client['adresse'] ?? $this->l->t('Address'),
                                            $client['zip_code'] ?? $this->l->t('zip_code'),
                                            $client['city_name'] ?? $this->l->t('city_name'),
                                            $client['country_code'] ?? 'FR',
                                            '',
                                            ''
                                        )
                                    );
        return true;
    }

    public function insertDevis($idNextcloud){
        $last=0;
        $last = $this->lastinsertid("devis", $idNextcloud) + 1;

        $sql = "INSERT INTO ".$this->tableprefix."devis ( date,
                                                            id_configuration,
                                                            num,
                                                            id_client,
                                                            version,
                                                            mentions,
                                                            comment,
                                                            user_id,
                                                            delay
                                                        )
                                                VALUES (?,?,?,0,'0.1',?,?,?,?);";
        $this->execSQLNoData($sql, array((new \DateTimeImmutable())->format('Y-m-d'),$idNextcloud,$this->l->t('Quote number'),$this->l->t('New'),$this->l->t('Comment'),$last,$this->l->t('Offer valid for 1 month from: ')));
        return true;
    }

    public function insertFacture($idNextcloud, int $devisId, $datePaiement = null): array {
        $quotes = $this->execSQLNoJsonReturn(
            "SELECT id, date FROM ".$this->tableprefix."devis WHERE id = ? AND id_configuration = ?",
            [$devisId, $idNextcloud]
        );
        if (empty($quotes)) {
            throw new \InvalidArgumentException('The quote does not exist.');
        }

        $last=0;
        $last = $this->lastinsertid("facture", $idNextcloud) + 1;

        $pref = $this->execSQLNoJsonReturn(
            "SELECT * FROM ".$this->tableprefix."configuration WHERE id = ?",
            array($idNextcloud)
        );

        $date = new \DateTimeImmutable();
        $paymentDate = $datePaiement ?: $date->modify('+1 month')->format('Y-m-d');

        $sql = "INSERT INTO ".$this->tableprefix."facture
        (date,id_configuration,num,date_paiement,type_paiement,id_devis,user_id)
        VALUES
        (?, ?, ?, ?, ?, ?, ?);";

        $this->execSQLNoData(
            $sql,
            array(
                $quotes[0]['date'],
                $idNextcloud,
                $pref[0]['facture_prefixe']."-".$last,
                $paymentDate,
                '30',
                $devisId,
                $last
            )
        );

        $invoice = $this->execSQLNoJsonReturn(
            "SELECT id FROM ".$this->tableprefix."facture WHERE user_id = ? AND id_configuration = ?",
            [$last, $idNextcloud]
        );
        return ['id' => (int)$invoice[0]['id']];
    }

    public function insertProduit($idNextcloud){
        $vat = $this->execSQLNoJsonReturn(
            "SELECT tva_default FROM ".$this->tableprefix."configuration WHERE id = ?",
            array($idNextcloud)
        )[0]['tva_default'];

        $vatCategory = (float)$vat === 0.0 ? 'E' : 'S';
        $exemptionReasonCode = $vatCategory === 'E'
            ? VatExemptionReasonCatalog::DEFAULT_CODE
            : null;
        $exemptionReason = $vatCategory === 'E'
            ? VatExemptionReasonCatalog::DEFAULT_REASON
            : null;
        $sql = "INSERT INTO ".$this->tableprefix."produit (id_configuration,reference,description,prix_unitaire,vat,vat_category,vat_exemption_reason_code,vat_exemption_reason) VALUES (?,?,?,0,?,?,?,?);";

        $this->execSQLNoData($sql, array(
            $idNextcloud,
            $this->l->t('Reference'),
            $this->l->t('Designation'),
            $vat,
            $vatCategory,
            $exemptionReasonCode,
            $exemptionReason
        ));

        return true;
    }

    public function insertProduitDevis($id_devis,$idNextcloud){
        $lastproduit = $this->searchMaxIdProduit($idNextcloud);
        $lastproduit = $lastproduit[0]['id'];
        $lastinsertProduitDevis = $this->lastinsertProduitDevis($id_devis, $idNextcloud) + 1;

        $query = $this->db->getQueryBuilder();
        $query->insert('gestion_produit_devis')
            ->values([
                'devis_id' => $query->createNamedParameter($id_devis),
                'id_configuration' => $query->createNamedParameter($idNextcloud),
                'produit_id' => $query->createNamedParameter($lastproduit),
                'quantite' => $query->createNamedParameter(1),
                'discount' => $query->createNamedParameter(0),
                'order' => $query->createNamedParameter($lastinsertProduitDevis),
            ])
            ->executeStatement();
        return $this->lastinsertProduitDevis($id_devis, $idNextcloud);
    }

    public function searchMaxIdProduit($idNextcloud){
        $sqlSearchMax = "SELECT MIN(id) as id FROM ".$this->tableprefix."produit WHERE id_configuration = ?";
        return $this->execSQLNoJsonReturn($sqlSearchMax, array($idNextcloud));
    }

    public function gestion_update($table, $column, $data, $id, $id_configuration) {
        if (in_array($table, $this->whiteTable, true) && in_array($column, $this->whiteColumn, true)) {
            $safeData = strip_tags($data, '<br>');
            $safeData = html_entity_decode($safeData, ENT_QUOTES, 'UTF-8');
            $safeData = rtrim($safeData);
            $safeData = $this->normalizeColumnData($column, $safeData);

            $sql = "UPDATE " . $this->tableprefix . $table . " SET $column = ? WHERE id = ? AND id_configuration = ?";
            $this->execSQLNoData($sql, array($safeData, $id, $id_configuration));

			if ($table === 'produit' && $column === 'vat_category') {
				$this->synchronizeVatExemptionReason($safeData, $id, $id_configuration);
			}

            return true;
        }
        return false;
    }

	public function updateProductVatExemptionReason(
		$id,
		string $code,
		$idConfiguration
	): bool {
		$reason = VatExemptionReasonCatalog::reasonFor($code);
		if ($reason === null) {
			return false;
		}

		$product = $this->execSQLNoJsonReturn(
			"SELECT vat_category FROM " . $this->tableprefix . "produit
				WHERE id = ? AND id_configuration = ?",
			[$id, $idConfiguration]
		);
		if (($product[0]['vat_category'] ?? null) !== 'E') {
			return false;
		}

		$sql = "UPDATE " . $this->tableprefix . "produit
			SET vat_exemption_reason_code = ?, vat_exemption_reason = ?
			WHERE id = ? AND id_configuration = ? AND vat_category = 'E'";

		$this->execSQLNoData(
			$sql,
			[$code, $reason, $id, $idConfiguration]
		);
		return true;
	}

	private function synchronizeVatExemptionReason(
		string $category,
		$id,
		$idConfiguration
	): void {
		if ($category === 'E') {
			$sql = "UPDATE " . $this->tableprefix . "produit
				SET vat_exemption_reason_code = ?, vat_exemption_reason = ?
				WHERE id = ? AND id_configuration = ?
					AND (
						vat_exemption_reason_code IS NULL
						OR vat_exemption_reason_code = ''
						OR vat_exemption_reason IS NULL
						OR vat_exemption_reason = ''
					)";
			$this->execSQLNoData($sql, [
				VatExemptionReasonCatalog::DEFAULT_CODE,
				VatExemptionReasonCatalog::DEFAULT_REASON,
				$id,
				$idConfiguration,
			]);
			return;
		}

		$sql = "UPDATE " . $this->tableprefix . "produit
			SET vat_exemption_reason_code = NULL, vat_exemption_reason = NULL
			WHERE id = ? AND id_configuration = ?";
		$this->execSQLNoData($sql, [$id, $idConfiguration]);
	}

    /**
     * Update a field of the configuration identified by its company ID.
     */
    public function gestion_updateConfiguration($column, $data, $idConfiguration){
        if(!in_array($column, $this->whiteColumn, true)){
            return false;
        }

        $safeData = $this->normalizeColumnData($column, htmlentities(rtrim($data)));
        $sql = "UPDATE ".$this->tableprefix."configuration SET $column = ? WHERE id = ?";
        $this->execSQLNoData($sql, array($safeData, $idConfiguration));
        return true;
    }

    private function normalizeColumnData($column, $data){
		if ($column === 'vat_category') {
			$category = strtoupper(trim($data));
			return in_array($category, ['S', 'E', 'Z', 'O', 'AE', 'G', 'K'], true) ? $category : 'S';
		}

        if ($column === 'zip_code') {
            return substr($data, 0, 20);
        }

        if ($column === 'country_code') {
            return substr($data, 0, 5);
        }

        if ($column === 'logo_width') {
            return max(40, min(600, (int)$data));
        }

        return $data;
    }

    public function gestion_duplicate($table, $id, $CurrentCompany){
        if(in_array($table, $this->whiteTable, true)){
            $sql = "SELECT * FROM ".$this->tableprefix.$table." WHERE id = ? AND id_configuration = ?";
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
                $sql = "SELECT * FROM ".$this->tableprefix."produit_devis WHERE devis_id = ? AND id_configuration = ?";
                $res_produit_devis = $this->execSQLNoJsonReturn($sql, array($id, $CurrentCompany));

                $sql = "SELECT max(id) AS max_id FROM ".$this->tableprefix."devis";
                $id_devis = $this->execSQLNoJsonReturn($sql, array())[0]['max_id'];

                $sql = "INSERT INTO ".$this->tableprefix."produit_devis (devis_id, id_configuration, produit_id, quantite, discount) VALUES (?,?,?,?,?)";
                foreach($res_produit_devis as $key => $value){
                    $this->execSQLNoData($sql, array($id_devis, $CurrentCompany, $value['produit_id'], $value['quantite'], $value['discount']));
                }
            }

            return true;
        }
        return false;
    }

    public function gestion_drop($id, $value, $CurrentCompany){
        $produits_devis_current = $this->selectProductQuoteRows([
            'id' => $id,
            'id_configuration' => $CurrentCompany,
        ]);

        if (empty($produits_devis_current)) {
            return;
        }

        if($value == "down"){
            $devis_id = $produits_devis_current[0]['devis_id'];
            $order = $produits_devis_current[0]['order'] + 1;
        }else{
            $devis_id = $produits_devis_current[0]['devis_id'];
            $order = $produits_devis_current[0]['order'] - 1;
        }

        $produits_devis_next = $this->selectProductQuoteRows([
            'devis_id' => $devis_id,
            'order' => $order,
            'id_configuration' => $CurrentCompany,
        ]);

        if(!empty($produits_devis_next)){
            $this->updateProductQuoteOrder($id, $CurrentCompany, $order);
            $this->updateProductQuoteOrder(
                $produits_devis_next[0]['id'],
                $CurrentCompany,
                $produits_devis_current[0]['order']
            );
        }
    }

    public function reorderProductQuoteRows(int $devisId, array $ids, $currentCompany): void {
        $rows = $this->selectProductQuoteRows(['devis_id' => $devisId, 'id_configuration' => $currentCompany]);
        $currentIds = array_map('intval', array_column($rows, 'id'));
        $requestedIds = array_map('intval', $ids);
        $sortedCurrent = $currentIds;
        $sortedRequested = $requestedIds;
        sort($sortedCurrent);
        sort($sortedRequested);

        if (count($requestedIds) !== count(array_unique($requestedIds)) || $sortedCurrent !== $sortedRequested) {
            throw new \InvalidArgumentException('The product order does not match this quote.');
        }

        $this->db->beginTransaction();
        try {
            foreach ($requestedIds as $position => $id) {
                $this->updateProductQuoteOrder($id, $currentCompany, $position + 1);
            }
            $this->db->commit();
        } catch (\Throwable $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    public function gestion_delete($table, $id, $CurrentCompany){
        if(in_array($table, $this->whiteTable, true)){
            $sql = "DELETE FROM ".$this->tableprefix.$table." WHERE id = ? AND id_configuration = ?";
            $this->execSQLNoData($sql, array($id, $CurrentCompany));
            return true;
        }
        return false;
    }

    public function checkConfig($idConfiguration, $idNextcloud){
        $sql = "SELECT count(*) as res FROM ".$this->tableprefix."configuration WHERE id_nextcloud = ?";
        $res = json_decode($this->execSQL($sql, array($idNextcloud)))[0]->res;
        if ( $res < 1 ){
            $this->createCompany($idNextcloud);
        }
        return $res;
    }

    public function createCompany($idNextcloud){
        $sql = "INSERT INTO ".$this->tableprefix."configuration (entreprise, nom, prenom, legal_one, legal_two, mail, telephone, adresse, path, id_nextcloud,mentions_default,tva_default,devise,facture_prefixe, vat_number, city_name, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, '', ?, ?, '0',?,?,?,?,?);";
        $this->execSQLNoData($sql, array( $this->l->t('Your company name'),
                                         $this->l->t('Your company contact last name'),
                                         $this->l->t('Your company contact first name'),
                                         $this->l->t('Company legal information line one'),
                                         $this->l->t('Company legal information line two'),
                                         $this->l->t('Your company email'),
                                         $this->l->t('Your company phone'),
                                         $this->l->t('Your company address'),
                                         $idNextcloud, $this->l->t('All Legal mentions, disclaimer or everything you want to place in the footer.'),
                                         $this->l->t('EUR'),
                                         $this->l->t('INVOICE'),
                                         $this->l->t('Your company vat number'),
                                         $this->l->t('Your company city name'),
                                         ''));
        return true;
    }

    public function deleteCompany($idCompany, $idNextcloud){
        $sql = "SELECT * FROM ".$this->tableprefix."configuration WHERE id = ?";
        $res = $this->execSQLNoJsonReturn($sql, array($idCompany));

        if ($res[0]['id_nextcloud'] == $idNextcloud){
            $sql = "DELETE FROM ".$this->tableprefix."configuration WHERE id = ? AND id_nextcloud = ?";
            $this->execSQLNoData($sql, array($idCompany, $idNextcloud));

            $sql = "DELETE FROM ".$this->tableprefix."client WHERE id_configuration = ?";
            $this->execSQLNoData($sql, array($idCompany));

            $sql = "DELETE FROM ".$this->tableprefix."devis WHERE id_configuration = ?";
            $this->execSQLNoData($sql, array($idCompany));

            $sql = "DELETE FROM ".$this->tableprefix."facture WHERE id_configuration = ?";
            $this->execSQLNoData($sql, array($idCompany));

            $sql = "DELETE FROM ".$this->tableprefix."produit WHERE id_configuration = ?";
            $this->execSQLNoData($sql, array($idCompany));

            $sql = "DELETE FROM ".$this->tableprefix."produit_devis WHERE id_configuration = ?";
            $this->execSQLNoData($sql, array($idCompany));

            $sql = "DELETE FROM ".$this->tableprefix."conf_share WHERE id_configuration = ?";
            $this->execSQLNoData($sql, array($idCompany));

            return true;
        }else{
            return false;
        }
    }

    public function isConfig($idConfiguration,$idNextcloud){
        $changelog = 30200;

        if (empty($idConfiguration)) {
            return false;
        }

        $sql = "SELECT changelog as res FROM ".$this->tableprefix."configuration WHERE id = ? AND (id_nextcloud = ? OR id in (SELECT id_configuration FROM ".$this->tableprefix."conf_share WHERE id_nextcloud = ?))";
        $configuration = json_decode($this->execSQL($sql, array($idConfiguration, $idNextcloud, $idNextcloud)));

        if (empty($configuration)) {
            return false;
        }

        $res = (int)$configuration[0]->res;
        if($res < $changelog){
            $this->gestion_updateConfiguration("changelog", $changelog, $idConfiguration);
            return false;
        }

        return true;
    }

    public function numberClient($idNextcloud){
        $sql = "SELECT count(*) as c from ".$this->tableprefix."client WHERE id_configuration = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function numberDevis($idNextcloud){
        $sql = "SELECT count(*) as c from ".$this->tableprefix."devis WHERE id_configuration = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function numberFacture($idNextcloud){
        $sql = "SELECT count(*) as c from ".$this->tableprefix."facture WHERE id_configuration = ?;";
        return $this->execSQL($sql, array($idNextcloud));
    }

    public function numberProduit($id_configuration){
        $sql = "SELECT count(*) as c from ".$this->tableprefix."produit WHERE id_configuration = ?;";
        return $this->execSQL($sql, array($id_configuration));
    }

    public function getAnnualTurnoverPerMonthNoVat($id_configuration){
        $query = $this->db->getQueryBuilder();
        $query->select('f.date_paiement', 'p.prix_unitaire', 'pd.quantite')
            ->from('gestion_facture', 'f')
            ->innerJoin('f', 'gestion_produit_devis', 'pd', $query->expr()->eq('f.id_devis', 'pd.devis_id'))
            ->innerJoin('pd', 'gestion_produit', 'p', $query->expr()->eq('pd.produit_id', 'p.id'))
            ->where($query->expr()->eq('f.id_configuration', $query->createNamedParameter($id_configuration)));

        $totals = [];
        foreach ($this->fetchAll($query) as $row) {
            $date = new \DateTimeImmutable((string)$row['date_paiement']);
            $key = $date->format('Y-m');
            if (!isset($totals[$key])) {
                $totals[$key] = [
                    'y' => $date->format('Y'),
                    'm' => $date->format('n'),
                    'total' => 0.0,
                ];
            }
            $totals[$key]['total'] += (float)$row['prix_unitaire'] * (float)$row['quantite'];
        }

        krsort($totals);
        return $this->rowsToJson(array_values($totals));
    }

    public function lastinsertid($table,$idNextcloud){
        $sql = "SELECT max(user_id) as last_insert_id FROM " . $this->tableprefix . $table . " WHERE " . $this->tableprefix . $table .".id_configuration = ?;";
        $res = $this->execSQLNoJsonReturn($sql,array($idNextcloud));
        return $res[0]['last_insert_id'];
    }

    public function lastinsertProduitDevis($id_devis,$idNextcloud){
        $query = $this->db->getQueryBuilder();
        $query->selectAlias($query->func()->max('pd.order'), 'last_insert_id')
            ->from('gestion_produit_devis', 'pd')
            ->where($query->expr()->eq('pd.id_configuration', $query->createNamedParameter($idNextcloud)))
            ->andWhere($query->expr()->eq('pd.devis_id', $query->createNamedParameter($id_devis)));
        $res = $this->fetchAll($query);
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

    private function execSQL($sql, $conditions){
        return $this->rowsToJson($this->execSQLNoJsonReturn($sql, $conditions));
    }

    private function execSQLNoData($sql, $conditions){
        $this->db->executeStatement($sql, $conditions);
    }

    private function execSQLNoJsonReturn($sql, $conditions){
        $result = $this->db->executeQuery($sql, $conditions);
        $rows = $result->fetchAll();
        $result->closeCursor();
        return $rows;
    }

    private function fetchAll($query): array {
        $result = $query->executeQuery();
        $rows = $result->fetchAll();
        $result->closeCursor();
        return $rows;
    }

    private function rowsToJson(array $rows): string {
        return json_encode($rows);
    }

    private function selectProductQuoteRows(array $conditions): array {
        $query = $this->db->getQueryBuilder();
        $query->select('*')->from('gestion_produit_devis');
        foreach ($conditions as $column => $value) {
            $query->andWhere(
                $query->expr()->eq($column, $query->createNamedParameter($value))
            );
        }
        return $this->fetchAll($query);
    }

    private function updateProductQuoteOrder($id, $idConfiguration, $order): void {
        $query = $this->db->getQueryBuilder();
        $query->update('gestion_produit_devis')
            ->set('order', $query->createNamedParameter($order))
            ->where($query->expr()->eq('id', $query->createNamedParameter($id)))
            ->andWhere($query->expr()->eq(
                'id_configuration',
                $query->createNamedParameter($idConfiguration)
            ))
            ->executeStatement();
    }
}
