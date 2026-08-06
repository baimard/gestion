#!/usr/bin/env bash

set -euo pipefail

project_directory="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
mustang_version="2.25.0"
mustang_sha256="d68b9fd6a9948a0964b7c93ed06b7e903a6dbafcd0df581e992e3178bf016701"
mustang_url="https://github.com/ZUGFeRD/mustangproject/releases/download/core-${mustang_version}/Mustang-CLI-${mustang_version}.jar"
tools_directory="${project_directory}/build/tools"
reports_directory="${project_directory}/build/reports/facturx"
mustang_jar="${tools_directory}/Mustang-CLI-${mustang_version}.jar"
generated_source="${reports_directory}/gestion-en16931.xml"
source_file="${1:-${generated_source}}"
report_file="${reports_directory}/validation-report.xml"
log_file="${reports_directory}/validation.log"

for command_name in curl java php sha256sum; do
	if ! command -v "${command_name}" >/dev/null 2>&1; then
		echo "Missing required command: ${command_name}" >&2
		exit 2
	fi
done

mkdir -p "${tools_directory}" "${reports_directory}"

if [ ! -f "${mustang_jar}" ]; then
	temporary_jar="${mustang_jar}.download"
	curl --fail --location --retry 3 --output "${temporary_jar}" "${mustang_url}"
	mv "${temporary_jar}" "${mustang_jar}"
fi

echo "${mustang_sha256}  ${mustang_jar}" | sha256sum --check --status || {
	echo "Mustang CLI checksum verification failed: ${mustang_jar}" >&2
	exit 1
}

if [ "${source_file}" = "${generated_source}" ]; then
	php "${project_directory}/scripts/generate-facturx-validation-fixture.php" "${generated_source}"
elif [ ! -f "${source_file}" ]; then
	echo "Factur-X source not found: ${source_file}" >&2
	exit 2
fi

set +e
java -Xmx1G -Dfile.encoding=UTF-8 -jar "${mustang_jar}" \
	--action validate \
	--source "${source_file}" \
	--no-notices \
	>"${report_file}" 2>"${log_file}"
validator_status=$?
set -e

if [ "${validator_status}" -ne 0 ] \
	|| grep -Eq '<failed>[1-9][0-9]*</failed>|<(error|warning)([ >])|<summary status="invalid"' "${report_file}"; then
	echo "Factur-X validation failed. Report: ${report_file}" >&2
	grep -E '<(error|warning)([ >])' "${report_file}" >&2 || true
	exit 1
fi

echo "Factur-X XSD and Schematron validation passed: ${source_file}"
echo "Validation report: ${report_file}"
