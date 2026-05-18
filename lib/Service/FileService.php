<?php
namespace OCA\Gestion\Service;

use OCP\Files\IRootFolder;

class FileService {
	private $storage;

	public function __construct(IRootFolder $rootFolder, $UserId) {
		try {
			$this->storage = $rootFolder->getUserFolder($UserId);
		} catch (\OC\User\NoUserException $e) {
		}
	}

	public function getLogo($name) {
		try {
			if (isset($this->storage)) {
				$file = $this->storage->get('/.gestion/' . $name);
			} else {
				return "nothing";
			}
		} catch (\OCP\Files\NotFoundException $e) {
			return "nothing";
		}

		return base64_encode($file->getContent());
	}

	public function savePDF($content, $folder, $name): void {
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
				$data = base64_decode($content);
				$file->putContent($data);
			} catch (\OCP\Files\NotFoundException $e) {
			}
		} catch (\OCP\Files\NotPermittedException $e) {
		}
	}
}
