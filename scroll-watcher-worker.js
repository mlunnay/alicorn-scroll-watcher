// Singleton class to handle requestAnimationFrame for scroll watching
let singleton = Symbol();
class ScrollWatcherWorker {
  constructor() {
    this.scrollTargets = [];
    this.watchedElements = [];
    this.addScrollTarget(window.document.documentElement);
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ScrollWatcherWorker();
      this[singleton].loop();
    }
    return this[singleton];
  }

  loop() {
    if (this.scrollTargets.length !== 0) {
      this.scrollTargets.forEach(t => {
        if (this.handleScroll(t)) {
          this.watchedElements
            .filter(e => e.target === t.element)
            .forEach(e => e.element._updateScroll(t.viewport));
        }
      });
      this.watchedElements.forEach(e => {
        var target = this.scrollTargets.find(
          t => t.changed && t.element === e.target
        );
        if (target && e.element._updateScroll) {
          e.element._updateScroll([target.top, target.height]);
        }
      });
    }
    window.requestAnimationFrame(() => this.loop());
  }

  addScrollTarget(element) {
    if (!this.scrollTargets.find(t => t.element === element)) {
      var target = {
        element: element,
        viewport: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          height: 0,
          width: 0
        }
      };
      this.handleScroll(target);
      this.scrollTargets.push(target);
    }
  }

  removeScrollTarget(element) {
    if (
      element === window.document.documentElement // ignore removing root document
    )
      return;
    var index = this.scrollTargets.findIndex(t => t.element === element);
    if (index >= 0 && !this.watchedElements.some(e => e.target === element))
      this.scrollTargets.splice(index, 1);
  }

  addWatchedElement(element, target) {
    if (!this.watchedElements.find(e => e.element === element)) {
      target = target || window.document.documentElement;
      this.watchedElements.push({
        element: element,
        target: target
      });
      if (target !== window.document.documentElement)
        this.addScrollTarget(target);
    }
  }

  removeWatchedElement(element) {
    var index = this.watchedElements.findIndex(e => e.element === element);
    if (index >= 0) {
      this.removeScrollTarget(this.watchedElements[index].target);
      this.watchedElements.splice(index, 1);
    }
  }

  changeWatchedElementTarget(element, target) {
    var watched = this.watchedElements.find(e => e.element === element);
    if (watched === undefined) {
      this.addWatchedElement(element, target);
    } else if (watched.target !== target) {
      this.removeScrollTarget(watched.target);
      if (target !== window.document.documentElement)
        this.addScrollTarget(target);
      watched.target = target;
    }

    var t = this.scrollTargets.find(e => e.element === target);
    element._updateScroll(t.viewport);
  }

  /**
   * Updates the viewport of the target element.
   * @param {*} target
   * @returns {boolean} true if the scroll changed, false otherwise.
   */
  handleScroll(target) {
    var left = target.element === window.document.documentElement
      ? window.pageXOffset ||
          window.document.documentElement.scrollLeft ||
          window.document.body.scrollLeft
      : target.element.scrollLeft;
    var top = target.element === window.document.documentElement
      ? window.pageYOffset ||
          window.document.documentElement.scrollTop ||
          window.document.body.scrollTop
      : target.element.scrollTop;
    var height = (target.element === window.document.documentElement
      ? window.innerHeight || window.document.documentElement.clientHeight
      : target.clientHeight) || 0;
    var width = (target.element === window.document.documentElement
      ? window.innerWidth || window.document.documentElement.clientWidth
      : target.clientWidth) || 0;
    if (
      target.viewport.top === top &&
      target.viewport.height === height &&
      target.viewport.left === left &&
      target.viewport.width === width
    )
      return false;
    else {
      target.viewport.top = top;
      target.viewport.Left = left;
      target.viewport.height = height;
      target.viewport.width = width;
      target.viewport.bottom = top + height;
      target.viewport.right = left + width;
      return true;
    }
  }
}
