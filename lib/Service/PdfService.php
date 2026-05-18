<?php
namespace OCA\Gestion\Service;

require_once __DIR__ . '/../../vendor/autoload.php';

use Exception;
use Mpdf\Mpdf;
use OCP\AppFramework\Http\DataResponse;
use OCP\Mail\IMailer;

class PdfService {
	private IMailer $mailer;
	private FileService $fileService;

	public function __construct(IMailer $mailer, FileService $fileService) {
		$this->mailer = $mailer;
		$this->fileService = $fileService;
	}

	public function sendPDF($content, $name, $subject, $body, $to, $Cc): DataResponse {
		$clean_name = html_entity_decode($name);

		try {
			$data = base64_decode($content);
			$message = $this->mailer->createMessage();
			$message->setSubject($subject);
			$message->setTo((array) json_decode($to));
			$myrrCc = (array) json_decode($Cc);
			if ($myrrCc[0] != "") {
				$message->setCc($myrrCc);
			}
			$message->setBody($body, 'text/html');
			$AttachementPDF = $this->mailer->createAttachment($data, $clean_name . ".pdf", "application/pdf");
			$message->attach($AttachementPDF);

			$this->mailer->send($message);
			return new DataResponse("", 200, ['Content-Type' => 'application/json']);
		} catch (Exception $e) {
			return new DataResponse("Is your global mail server configured in Nextcloud ?", 500, ['Content-Type' => 'application/json']);
		}
	}

	public function savePDF($content, $folder, $name): void {
		$this->fileService->savePDF($content, $folder, $name);
	}

	public function generatePDF($html, $name, $folder): void {
		try {
			$mpdf = new Mpdf([
				'mode' => 'utf-8',
				'format' => 'A4',
				'margin_top' => 10,
				'margin_bottom' => 10,
				'margin_left' => 10,
				'margin_right' => 10,
			]);

			$css = file_get_contents(__DIR__ . '/../../css/style.css');

			$mpdf->WriteHTML($css, \Mpdf\HTMLParserMode::HEADER_CSS);
			$mpdf->WriteHTML($html, \Mpdf\HTMLParserMode::HTML_BODY);

			$pdfContent = $mpdf->Output('', \Mpdf\Output\Destination::STRING_RETURN);
			$encoded = base64_encode($pdfContent);
			$this->savePDF($encoded, $folder, $name);

			header('Content-Type: application/pdf');
			header('Content-Disposition: attachment; filename="' . $name . '.pdf"');
			echo $pdfContent;
		} catch (\Mpdf\MpdfException $e) {
			http_response_code(500);
			echo "Erreur lors de la génération du PDF : " . $e->getMessage();
		}
	}
}
