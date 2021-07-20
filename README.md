# data-mining-tools

Data mining helpers and utilities for Node JS.

### Getting Started

```Bash
npm install --save data-mining-tools axios puppeteer
```

Puppeteer is a peer dependency, since we recommend you choose your own version.

### Library

All functions and classes are at the top level of the module (think [Lodash](https://lodash.com/) or similar). So you could import everything with the following style of statement:

```JavaScript
import { filesExist, cleanText, ArrayFileStore } from 'data-mining-tools';
```

It may make more sense to break it into separate modules in the future, but we like the simplicity of this approach. Here are the docs on the individual parts:

#### Functional
* [file](docs/FILE.md)
* [render](docs/RENDER.md)
* [text](docs/TEXT.md)
* [time](docs/TIME.md)
* [url](docs/URL.md)

#### Classes
* [ArrayFileStore](docs/classes/_filestore_.arrayfilestore.md)
* [ObjectFileStore](docs/classes/_filestore_.objectfilestore.md)
