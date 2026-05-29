[![NPM version](https://img.shields.io/npm/v/@file-type/xml.svg)](https://npmjs.org/package/@file-type/xml)
[![Node.js CI](https://github.com/Borewit/file-type-xml/actions/workflows/nodejs-ci.yml/badge.svg)](https://github.com/Borewit/file-type-xml/actions/workflows/nodejs-ci.yml)
[![npm downloads](http://img.shields.io/npm/dm/@file-type/xml.svg)](https://npmcharts.com/compare/@file-type/xml?start=365)

# @file-type/xml

Detector plugin for [file-type](https://github.com/sindresorhus/file-type) for XML files.

## Installation

```bash
npm install @file-type/xml
```

## Usage

The following example shows how add the XML detector to [file-type](https://github.com/sindresorhus/file-type).
```js
import {FileTypeParser} from 'file-type';
import {detectXml} from '@file-type/xml';

const parser = new FileTypeParser({customDetectors: [detectXml]});
const fileType = await parser.fromFile('example.kml');
console.log(fileType);
```

You can also use the XML detector outside [file-type](https://github.com/sindresorhus/file-type):
```js
import {XmlTextDetector} from '@file-type/xml';

const xmlTextDetector = new XmlTextDetector();
xmlTextDetector.write('<svg xmlns="http://www.w3.org/2000/svg"><path fill="#00CD9F"/></svg>');
const fileType = xmlTextDetector.fileType;
console.log(JSON.stringify(fileType)); // Outputs: {"ext":"svg","mime":"image/svg+xml"}
```

## Support file formats

- [XML](https://en.wikipedia.org/wiki/XML) (default for XML, unless more specific format was detected)
- [GML (Geography Markup Language)](https://en.wikipedia.org/wiki/Geography_Markup_Language)
- [KML (Keyhole Markup Language)](https://en.wikipedia.org/wiki/XHTML)
- [MusicXML, Uncompressed](https://en.wikipedia.org/wiki/MusicXML)
- [RSS (RDF Site Summary or Really Simple Syndication)](https://en.wikipedia.org/wiki/RSS)
- [SVG: (Scalable Vector Graphics)](https://en.wikipedia.org/wiki/SVG)
- [XHTML](https://en.wikipedia.org/wiki/XHTML)

## Licence

This project is licensed under the [MIT License](LICENSE.txt). Feel free to use, modify, and distribute as needed.
