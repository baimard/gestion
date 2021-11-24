<?php
namespace OCA\Gestion\Tests\Unit\Bdd;

use Exception;
use PHPUnit\Framework\TestCase;
use OCP\AppFramework\Http\TemplateResponse;
use PHPUnit\Framework\MockObject\MockObject;
use OCA\Gestion\Db\Bdd;
use OCP\IDBConnection;

class BddTest extends TestCase {
	private $userId = 'baimard';
	private $db;

	public function setUp(): void{
		parent::setUp();
		$myDb = \OC::$server->getDatabaseConnection();
		$l =  $this->createMock('OCP\IL10N');
		$this->db = new Bdd($myDb,$l);

	}

	public function testConfiguration(){
		$result = json_decode($this->db->getConfiguration($this->userId));
		$this->assertIsArray($result);
	}

	
}