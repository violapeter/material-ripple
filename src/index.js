import Color from 'color'

/**
 * Ripple element default opacity before transition
 * @constant
 * @type {number}
 * @default
 */
const OPACTITY_AT_START = 0.3

/**
 * Duration of the opacity transition
 * @constant
 * @type {number}
 * @default
 */
const OPACTITY_DURATION = 1.2

/**
 * Duration of the scale transition
 * @constant
 * @type {number}
 * @default
 */
const SCALE_DURATION = 0.3

/**
 * Default ripple properties
 * @constant
 * @type {object}
 * @default
 */
const DEFAULT_RIPPLE_PROPERTIES = {
  x: 0,
  y: 0,
  opacity: 0,
  scaleDuration: SCALE_DURATION,
  opacityDuration: OPACTITY_DURATION,
  scale: 0
}

/** Class representing an element wiht ripple effect */
class ElementWithRippleEffect {
  /**
   * creates a ripple element
   * @param element
   */
  constructor (element) {
    this.element = element

    this.makeRippleElement()
    this.initEventListeners()
  }

  /**
   * Initializes event listeners
   */
  initEventListeners () {
    this.element.addEventListener('mousedown', e => {
      e.stopPropagation()

      this.resetAnimation()
      this.animate(e)
    })
  }

  /**
   * Creates the ripple element
   */
  makeRippleElement () {
    this.rippleElement = document.createElement('span')
    this.setRippleCss()
    this.element.appendChild(this.rippleElement)
  }

  /**
   * Formats the ripple element with the given parameters
   * @param opts
   */
  setRippleCss (opts = DEFAULT_RIPPLE_PROPERTIES) {
    this.rippleElement.style.cssText= `
      background: ${this.getRippleColor()};
      border-radius: 50%;
      position: absolute;
      height: ${this.getRippleSize()}px;
      left: ${opts.x}px;
      opacity: ${opts.opacity};
      pointer-events: none;
      transition: transform ${opts.scaleDuration}s cubic-bezier(0, 0, .2, 1),
                  opacity ${opts.opacityDuration}s cubic-bezier(0, 0, .2, 1);
      transform-origin: center;
      transform: translate(-50%, -50%) scale(${opts.scale});
      top: ${opts.y}px;
      width: ${this.getRippleSize()}px;`
  }

  /**
   * Plays the ripple animation
   * @param event
   */
  animate (event) {
    const rect = this.element.getBoundingClientRect()
    const currentPositionRule = window.getComputedStyle(this.element, null).getPropertyValue('position')

    if (currentPositionRule === 'static') {
      this.element.style.position = 'relative'
    }

    this.setRippleCss(Object.assign({}, DEFAULT_RIPPLE_PROPERTIES, {
      x: event.pageX - rect.x,
      y: event.pageY - rect.y,
      scale: 1,
      opacity: 0,
    }))
  }

  /**
   * Aborts the ripple animation by
   * setting the default css
   */
  resetAnimation () {
    this.setRippleCss(Object.assign({}, DEFAULT_RIPPLE_PROPERTIES, {
      scale: 0,
      opacity: OPACTITY_AT_START,
      scaleDuration: 0,
      opacityDuration: 0
    }))
  }

  /**
   * Returns the ripple size based on
   * the diagonal of container
   * element's bounding box
   * @returns {number}
   */
  getRippleSize () {
    const rect = this.element.getBoundingClientRect()

    return Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) * 2
  }

  /**
   * Returns black or white color based on
   * the container elements background color
   * @todo getting the background if the container element is transparent
   * @returns {string}
   */
  getRippleColor () {
    const elementBackground = Color(
      window.getComputedStyle(this.element, null)
            .getPropertyValue('background-color')
    )
    const isLight = elementBackground.light()
    const isTransparent = elementBackground.valpha < 0.5

    return (isLight || isTransparent) ? '#000' : '#fff'
  }
}

/**
 * Creates the ripple elements based on
 * the given selectors
 * @param selectors
 */
export const set = selectors => {
  selectors.reduce((allElements, selector) => {
    return allElements.concat(Array.from(document.querySelectorAll(selector)))
  }, []).filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos
  }).forEach(element => {
    new ElementWithRippleEffect(element)
  })
}
