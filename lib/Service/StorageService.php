<?php

namespace OCA\Gestion\Service;

use OCP\Files\IRootFolder;
use OCP\Files\Folder;

class StorageService
{
    private ?Folder $storage = null;

    public function __construct(
        private IRootFolder $rootFolder,
        private string $userId
    ) {

        try {

            $this->storage =
                $this->rootFolder->getUserFolder(
                    $this->userId
                );

        } catch (\Exception $e) {

            $this->storage = null;
        }
    }

    /**
     * Return current user storage
     */
    public function getStorage(): ?Folder
    {
        return $this->storage;
    }

    /**
     * Ensure folder exists
     */
    public function ensureFolder(
        string $folder
    ): void {

        if (!$this->storage) {
            return;
        }

        try {

            $this->storage->newFolder(
                $folder
            );

        } catch (\Exception $e) {
            // Folder already exists
        }
    }

    /**
     * Save file into Nextcloud storage
     */
    public function saveFile(
        string $folder,
        string $filename,
        string $content
    ): bool {

        if (!$this->storage) {
            return false;
        }

        $folder = html_entity_decode($folder);
        $filename = html_entity_decode($filename);

        $this->ensureFolder($folder);

        $path = $folder . $filename;

        try {

            try {

                $this->storage->newFile(
                    $path
                );

            } catch (\Exception $e) {
                // File already exists
            }

            $file = $this->storage->get(
                $path
            );

            $file->putContent(
                $content
            );

            return true;

        } catch (\Exception $e) {

            return false;
        }
    }

    /**
     * Save base64 encoded PDF
     */
    public function savePdf(
        string $base64Content,
        string $folder,
        string $filename
    ): bool {

        $content = base64_decode(
            $base64Content
        );

        return $this->saveFile(
            $folder,
            $filename,
            $content
        );
    }

    /**
     * Return file content
     */
    public function getFile(
        string $path
    ): ?string {

        if (!$this->storage) {
            return null;
        }

        try {

            $file = $this->storage->get(
                $path
            );

            return $file->getContent();

        } catch (\Exception $e) {

            return null;
        }
    }

    /**
     * Return logo as base64
     */
    public function getLogo(
        string $filename
    ): string {

        $content = $this->getFile(
            '/.gestion/' . $filename
        );

        if (!$content) {
            return 'nothing';
        }

        return base64_encode(
            $content
        );
    }

    /**
     * Check if file exists
     */
    public function exists(
        string $path
    ): bool {

        if (!$this->storage) {
            return false;
        }

        return $this->storage->nodeExists(
            $path
        );
    }

    /**
     * Delete file
     */
    public function delete(
        string $path
    ): bool {

        if (!$this->storage) {
            return false;
        }

        try {

            $file = $this->storage->get(
                $path
            );

            $file->delete();

            return true;

        } catch (\Exception $e) {

            return false;
        }
    }
}