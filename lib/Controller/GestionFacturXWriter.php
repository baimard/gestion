<?php
namespace OCA\Gestion\Controller;

use Atgp\FacturX\Fpdi\FdpiFacturx;
use Atgp\FacturX\Utils\ProfileHandler;

/**
 * Surcharge de Writer pour contourner la restriction Nextcloud sur
 * simplexml_load_file() (entités externes bloquées par le resolver PHP).
 * On utilise file_get_contents() + simplexml_load_string() à la place.
 */
class GestionFacturXWriter extends \Atgp\FacturX\Writer
{
    protected function updatePdfMetadata(FdpiFacturx &$pdfWriter, \DOMDocument $document)
    {
        $pdf_metadata_infos = $this->preparePdfMetadata($document);
        $pdfWriter->set_pdf_metadata_infos($pdf_metadata_infos);

        // Remplacement de simplexml_load_file() — bloqué par Nextcloud (XXE resolver)
        $xmpPath    = __DIR__ . '/../../vendor/atgp/factur-x/xmp/' . static::XML_FILENAME;
        $xmpContent = file_get_contents($xmpPath);
        $xmp        = simplexml_load_string($xmpContent);

        if ($xmp === false) {
            throw new \RuntimeException('Impossible de charger le fichier XMP Factur-X : ' . $xmpPath);
        }

        $description_nodes = $xmp->xpath('rdf:Description');

        $desc_fx = $description_nodes[0];
        $desc_fx->children('fx', true)->ConformanceLevel = strtoupper(static::XMP_CONFORMANCE_LEVELS[$this->profile]);
        $pdfWriter->AddMetadataDescriptionNode($desc_fx->asXML());

        $pdfWriter->AddMetadataDescriptionNode($description_nodes[1]->asXML());

        $descPdfaid = $description_nodes[2];
        $pdfWriter->AddMetadataDescriptionNode($descPdfaid->asXML());

        $desc_dc   = $description_nodes[3];
        $desc_nodes = $desc_dc->children('dc', true);
        $desc_nodes->title->children('rdf', true)->Alt->li       = $pdf_metadata_infos['title'];
        $desc_nodes->creator->children('rdf', true)->Seq->li     = $pdf_metadata_infos['author'];
        $desc_nodes->description->children('rdf', true)->Alt->li = $pdf_metadata_infos['subject'];
        $pdfWriter->AddMetadataDescriptionNode($desc_dc->asXML());

        $desc_adobe = $description_nodes[4];
        $desc_adobe->children('pdf', true)->Producer = 'FPDF';
        $pdfWriter->AddMetadataDescriptionNode($desc_adobe->asXML());

        $desc_xmp  = $description_nodes[5];
        $xmp_nodes = $desc_xmp->children('xmp', true);
        $xmp_nodes->CreatorTool = sprintf('Factur-X PHP library v%s by @GP', static::VERSION);
        $xmp_nodes->CreateDate  = $pdf_metadata_infos['createdDate'];
        $xmp_nodes->ModifyDate  = $pdf_metadata_infos['modifiedDate'];
        $pdfWriter->AddMetadataDescriptionNode($desc_xmp->asXML());
    }
}
