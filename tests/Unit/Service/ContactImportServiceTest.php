<?php
namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Service\ContactImportService;
use OCP\Contacts\IManager;
use PHPUnit\Framework\TestCase;

class ContactImportServiceTest extends TestCase {
    public function testTypedVcardPropertiesAreNormalizedAndIdsAreBookScoped(): void {
        $manager = $this->createMock(IManager::class);
        $manager->method('isEnabled')->willReturn(true);
        $contact = ['id' => '12', 'addressbook-key' => 'personal', 'FN' => 'Jane Doe', 'N' => 'Doe;Jane;;;', 'ORG' => [['value' => 'Example']], 'EMAIL' => [['value' => 'jane@example.test']], 'TEL' => [['value' => '+330000']], 'ADR' => [['value' => ['','','1 Main Street','Paris','','75001','FR']]]];
        $other = $contact;
        $other['addressbook-key'] = 'shared';
        $manager->method('search')->willReturn([$contact, $other]);
        $service = new ContactImportService($manager);
        $rows = $service->list();
        $this->assertSame('Jane', $rows[0]['prenom']);
        $this->assertSame('Doe', $rows[0]['nom']);
        $this->assertSame('jane@example.test', $rows[0]['mail']);
        $this->assertSame('1 Main Street', $rows[0]['adresse']);
        $this->assertSame('75001', $rows[0]['zip_code']);
        $this->assertNotSame($rows[0]['id'], $rows[1]['id']);
        $this->assertNull($service->find('unknown-or-inaccessible'));
    }
    public function testDisabledContactsManagerReturnsEmptyList(): void {
        $manager = $this->createMock(IManager::class);
        $manager->method('isEnabled')->willReturn(false);
        $manager->expects($this->never())->method('search');
        $this->assertSame([], (new ContactImportService($manager))->list());
    }
}
