<?php
namespace OCA\Gestion\Tests\Unit\Service;

use OCA\Gestion\Service\CommercialMath;
use PHPUnit\Framework\TestCase;

class CommercialMathTest extends TestCase {
    public function testDiscountAndCurrencyRounding(): void {
        $this->assertSame(27.0, CommercialMath::lineTotal((object)['prix_unitaire' => '10', 'quantite' => '3', 'discount' => '10']));
        $this->assertSame(0.0, CommercialMath::lineTotal((object)['prix_unitaire' => '10', 'quantite' => '3', 'discount' => '100']));
        $this->assertSame(0.34, CommercialMath::lineTotal((object)['prix_unitaire' => '0.335', 'quantite' => '1']));
    }
    public function testInvalidDiscountIsRejected(): void {
        $this->expectException(\InvalidArgumentException::class);
        CommercialMath::discount(100.01);
    }
}
