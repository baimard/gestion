<?php

namespace OCA\Gestion\Service;

use OCP\Mail\IMailer;

class MailService
{
    public function __construct(
        private IMailer $mailer
    ) {
    }

    public function sendPdf(
        string $content,
        string $name,
        string $subject,
        string $body,
        string $to,
        string $cc
    ): array {

        try {

            /*
             |--------------------------------------------------------------------------
             | Decode PDF
             |--------------------------------------------------------------------------
             */

            $pdfContent =
                base64_decode(
                    $content
                );

            /*
             |--------------------------------------------------------------------------
             | Create message
             |--------------------------------------------------------------------------
             */

            $message =
                $this->mailer
                    ->createMessage();

            $message->setSubject(
                $subject
            );

            /*
             |--------------------------------------------------------------------------
             | Recipients
             |--------------------------------------------------------------------------
             */

            $recipients =
                (array) json_decode($to);

            $message->setTo(
                $recipients
            );

            /*
             |--------------------------------------------------------------------------
             | CC
             |--------------------------------------------------------------------------
             */

            $ccRecipients =
                (array) json_decode($cc);

            if (
                !empty($ccRecipients)
                && $ccRecipients[0] !== ''
            ) {

                $message->setCc(
                    $ccRecipients
                );
            }

            /*
             |--------------------------------------------------------------------------
             | Body
             |--------------------------------------------------------------------------
             */

            $message->setBody(
                $body,
                'text/html'
            );

            /*
             |--------------------------------------------------------------------------
             | Attachment
             |--------------------------------------------------------------------------
             */

            $cleanName =
                html_entity_decode($name);

            $attachment =
                $this->mailer
                    ->createAttachment(
                        $pdfContent,
                        $cleanName . '.pdf',
                        'application/pdf'
                    );

            $message->attach(
                $attachment
            );

            /*
             |--------------------------------------------------------------------------
             | Send
             |--------------------------------------------------------------------------
             */

            $this->mailer->send(
                $message
            );

            return [
                'status' => 'success'
            ];

        } catch (\Exception $e) {

            return [
                'status' => 'error',
                'message' => $e->getMessage()
            ];
        }
    }
}