<?php
namespace OCA\Gestion\Service;

use OCP\IURLGenerator;

class NavigationService {
	private IURLGenerator $urlGenerator;

	public function __construct(IURLGenerator $urlGenerator) {
		$this->urlGenerator = $urlGenerator;
	}

	public function getNavigationLink(): array {
		return [
			"index" => $this->urlGenerator->linkToRouteAbsolute("gestion.view.index"),
			"devis" => $this->urlGenerator->linkToRouteAbsolute("gestion.view.devis"),
			"facture" => $this->urlGenerator->linkToRouteAbsolute("gestion.view.facture"),
			"produit" => $this->urlGenerator->linkToRouteAbsolute("gestion.view.produit"),
			"config" => $this->urlGenerator->linkToRouteAbsolute("gestion.configuration.config"),
			"isConfig" => $this->urlGenerator->linkToRouteAbsolute("gestion.configuration.isConfig"),
			"statistique" => $this->urlGenerator->linkToRouteAbsolute("gestion.view.statistique"),
			"legalnotice" => $this->urlGenerator->linkToRouteAbsolute("gestion.view.legalnotice"),
			"france" => $this->urlGenerator->linkToRouteAbsolute("gestion.view.france"),
		];
	}
}
