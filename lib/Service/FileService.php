<?php
namespace OCA\Gestion\Service;

use OCP\Files\IRootFolder;
use OCP\Files\File;
use OCP\Files\NotFoundException;
use OCP\Files\NotPermittedException;

class FileService {
	private $storage;

	public function __construct(private IRootFolder $rootFolder, private $UserId) {
		try {
			$this->storage = $rootFolder->getUserFolder($UserId);
		} catch (\OC\User\NoUserException $e) {
		}
	}

	public function getLogo(string $name, ?string $owner = null): string {
        if ($owner !== null && $owner !== $this->UserId) {
            try {
                $logo = $this->readLogo($this->rootFolder->getUserFolder($owner), $name);
                if ($logo !== 'nothing') return $logo;
            } catch (\OC\User\NoUserException $e) {
            }
        }
        return $this->readLogo($this->storage ?? null, $name);
	}

    private function readLogo(?\OCP\Files\Folder $folder, string $name): string {
        try {
            $file = $folder?->get('/.gestion/' . $name);
            if (!$file instanceof File || $file->getSize() > LogoImage::MAX_INPUT_BYTES) {
                return 'nothing';
            }
            return base64_encode(LogoImage::prepare($file->getContent(), false));
        } catch (\InvalidArgumentException | NotFoundException | NotPermittedException $e) {
            return 'nothing';
        }
    }

    public function saveCompanyLogo(int $company, string $position, string $encoded): void {
        $suffix = match ($position) {
            'main' => 'logo.png',
            'header' => 'logo_header.png',
            'footer' => 'logo_footer.png',
            default => throw new \InvalidArgumentException('Invalid logo position.'),
        };
        $png = LogoImage::prepareUpload($encoded);
        if (!isset($this->storage)) {
            throw new NotPermittedException('Cannot access the company logo folder.');
        }
        try {
            $folder = $this->storage->get('/.gestion');
        } catch (NotFoundException $e) {
            $folder = $this->storage->newFolder('.gestion');
        }
        if (!$folder instanceof \OCP\Files\Folder) {
            throw new NotPermittedException('The logo folder path is not a folder.');
        }
        $name = $company . $suffix;
        try {
            $file = $folder->get($name);
        } catch (NotFoundException $e) {
            $folder->newFile($name, $png);
            return;
        }
        if (!$file instanceof File) {
            throw new NotPermittedException('The logo path is not a file.');
        }
        $file->putContent($png);
    }

	public function savePDF($content, $folder, $name): void {
		$clean_folder = html_entity_decode($folder);
		$clean_name = html_entity_decode($name);
		$this->saveContent(base64_decode($content), $clean_folder, $clean_name);
	}

	public function saveContent($content, $folder, $name): void {
		$clean_folder = html_entity_decode($folder);
		$clean_name = html_entity_decode($name);
		try {
			$this->storage->newFolder($clean_folder);
		} catch (\OCP\Files\NotPermittedException $e) {
		}

		try {
			try {
				$ff = $clean_folder . $clean_name;
				$this->storage->newFile($ff);
				$file = $this->storage->get($ff);
				$file->putContent($content);
			} catch (\OCP\Files\NotFoundException $e) {
			}
		} catch (\OCP\Files\NotPermittedException $e) {
		}
	}
}
