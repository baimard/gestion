#!/bin/bash
grep -rni $1 . --exclude-dir=js --exclude-dir=l10n --exclude-dir=translationfiles --exclude-dir=Db --exclude-dir=Migration --exclude-dir=node_modules
