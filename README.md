[![Build Status](https://travis-ci.org/mlunnay/alicorn-scroll-watcher.svg?branch=master)](https://travis-ci.org/mlunnay/alicorn-scroll-watcher) [![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/mlunnay/alicorn-scroll-watcher)

_[Demo and API docs](https://www.webcomponents.org/element/mlunnay/alicorn-scroll-watcher)_

# &lt;alicorn-scroll-watcher&gt; 
alicorn-scroll-watcher provides a mixin and custom element that generate events based on its position inside the parent document, or a specified target element. For performance it uses requestAnimationFrame, over scroll events.


## Installation
### Bower
```bash
bower install alicorn-scroll-watcher --save
```
### NPM
```bash
npm install alicorn-scroll-watcher
```
### Yarn
```bash
yarn add alicorn-scroll-watcher
```

## Import
```html
<link rel="import" href="../../alicorn-scroll-watcher/alicorn-scroll-watcher.html">
```

## Usage
The alicorn-scroll-watcher element fires events for when it enters or exits the target viewport.

### Events

#### viewport-state-changed
This fires when any of the other events fire.

#### enter-viewport
This fires when any part of the element enters the target viewport.

#### fully-enter-viewport
This fires when all of the element is fully inside the target viewport.

#### exit-viewport
This fires when all of the element has exited the target viewport.

#### partially-exit-viewport
This fires when any part of the element has exited the target viewport.

### Mixin
A mixin class AlicornScrollWatcherMixin can be extended by custom elements. The `_scrollHandler` method is called whenever the target viewport changed and can be overridden to add scroll logic.

```html
<link rel="import" href="../../alicorn-scroll-watcher/alicorn-scroll-watcher-mixin.html">
<style>
  class MyElement extends AlicornScrollWatcherMixin(PolymerElement) {
    //...
    _scrollHandler() {
      //...
    }
  }
</style>
```

## History
v1.0.0 Initial version

## License
[MIT](https://cdn.rawgit.com/mlunnay/alicorn-scroll-watcher/9cc23971/LICENSE.txt) License © Michael Lunnay