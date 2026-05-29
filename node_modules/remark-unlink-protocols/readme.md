<!--
  - SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: MIT
-->

# remark-unlink-protocols

[![REUSE status](https://api.reuse.software/badge/github.com/nextcloud-libraries/remark-unlink-protocol)](https://api.reuse.software/info/github.com/nextcloud-libraries/remark-unlink-protocol)

**[remark][]** plugin to turn links into plain text based on their protocols.

## Contents

* [What is this?](#what-is-this)
* [When should I use this?](#when-should-i-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
* [Types](#types)
* [Compatibility](#compatibility)
* [Security](#security)
* [Contribute](#contribute)
* [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin to remove all links
that use other protocols than the ones specified
(`http` and `https` by default).

## When should I use this?

This project is useful if you want to limit the protocols
that can be linked to when processing markdown.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install remark-unlink-protocols
```

## Use

Say we have the following file `example.md` and apply `remark-unlink-protocols`
with the default protocols (`http` and `https`).

```markdown
# Uranus

**Uranus** is the seventh [planet](/wiki/Planet 'Planet') from the Sun and is a
gaseous cyan [ice giant](/wiki/Ice_giant 'Ice giant').

Photograph of Uranus in true colour by Voyager 2 in 1986:

![This is an image of the planet Uranus taken by the spacecraft Voyager 2 in 1986.
The Voyager project is managed for NASA by the Jet Propulsion Laboratory.](<https://en.wikipedia.org/wiki/Uranus#/media/File:Uranus_as_seen_by_NASA's_Voyager_2_(remastered)_-_JPEG_converted.jpg>)

Send comments to [me](mailto:test@domain.example)
```

…and a module `example.js`:

```js
import {remark} from 'remark'
import remarkUnlinkProtocols from 'remark-unlink-protocols'
import {read} from 'to-vfile'

const file = await remark()
  .use(remarkUnlinkProtocols, { except: 'mailto' })
  .process(await read('example.md'))

console.log(String(file))
```

…then running `node example.js` yields:

```markdown
# Uranus

**Uranus** is the seventh planet from the Sun and is a
gaseous cyan ice giant.

Photograph of Uranus in true colour by Voyager 2 in 1986:

![This is an image of the planet Uranus taken by the spacecraft Voyager 2 in 1986.
The Voyager project is managed for NASA by the Jet Propulsion Laboratory.](<https://en.wikipedia.org/wiki/Uranus#/media/File:Uranus_as_seen_by_NASA's_Voyager_2_(remastered)_-_JPEG_converted.jpg>)

The Voyager project is managed for NASA by the Jet Propulsion
Laboratory.

Send comments to [me](mailto:test@domain.example).
```

## API

This package exports no identifiers.
The default export is `remarkUnlinkProtocols`.

#### `unified().use(remarkUnlinkProtocols)`

Remove all links and references that do not use the `http` or `https` protocols.

###### Parameters

`except`: `string[]` - protocols to keep - `['http', 'https']` by default.

###### Returns

Transform ([`Transformer`][unified-transformer]).

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

The current release, `remark-unlink-protocols@^1` is compatible with Node.js 22.

This plugin works with `unified` version 3+ and `remark` version 4+.

## Security

Use of `remark-unlink-protocols` does not involve
**[rehype][]** (**[hast][]**) or user content
so there are no openings for [cross-site scripting (XSS)][wiki-xss]
attacks.

## Contribute

[Nextcloud][nc-coc] and [Remarkjs][coc] have a code of conduct.
By interacting with the respective repositories, organization, or community
you agree to abide by its terms.

## License

[MIT][license] © 2025 Nextcloud GmbH and Nextcloud contributors

[coc]: https://github.com/remarkjs/.github/blob/main/code-of-conduct.md

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[hast]: https://github.com/syntax-tree/hast

[license]: LICENSE

[nc-coc]: https://nextcloud.com/contribute/code-of-conduct/

[npm]: https://docs.npmjs.com/cli/install

[rehype]: https://github.com/rehypejs/rehype

[remark]: https://github.com/remarkjs/remark

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[wiki-xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
