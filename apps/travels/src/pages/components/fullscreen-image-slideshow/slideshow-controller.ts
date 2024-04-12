import { shuffle } from 'lodash'
import { FullscreenImageDefinition } from 'src/pages/components/fullscreen-image-slideshow/fullscreen-image-definition'

interface SlideshowControllerConfig {
  firstElementId: string
  images: FullscreenImageDefinition[]
  secondElementId: string

  // This is how long each image will stay visible.
  timerMs?: number

  // This is how long the transition to the next image takes.
  transitionMs?: number
}

export class SlideshowController {
  config: Required<SlideshowControllerConfig>

  nextImageIndex: number

  constructor({ images, ...config }: SlideshowControllerConfig) {
    this.config = {
      timerMs: 6500,
      transitionMs: 1300,
      images: shuffle(images),
      ...config,
    }

    this.nextImageIndex = 2
  }

  init() {
    const firstEl = document.getElementById(this.config.firstElementId)
    const secondEl = document.getElementById(this.config.secondElementId)

    if (!firstEl || !secondEl || this.config.images.length <= 1) {
      return
    }

    // To start, the first element is visible.
    // The second element is actually on top of the first element but its opacity is 0.
    // A nice fade-in effect is achieved by changing the opacity of this second element.
    firstEl.style.backgroundImage = `url(${this.config.images[0].url})`
    secondEl.style.backgroundImage = `url(${this.config.images[1].url})`
    secondEl.style.opacity = '0'
    secondEl.style.transitionDuration = `${this.config.transitionMs}ms`

    setInterval(() => {
      const firstElement = document.getElementById(this.config.firstElementId)
      const secondElement = document.getElementById(this.config.secondElementId)

      if (!firstElement || !secondElement) {
        return
      }

      const isSecondImageVisible = secondElement.style.opacity === '1'

      secondElement.style.opacity = isSecondImageVisible ? '0' : '1'

      // After we've transitioned to the new image, load the next image into the hidden element.
      // Randomly order the images and reset our index counter if we've loaded all the images.
      setTimeout(() => {
        const hiddenElement = isSecondImageVisible
          ? document.getElementById(this.config.secondElementId)
          : document.getElementById(this.config.firstElementId)

        if (!hiddenElement) {
          return
        }

        if (this.nextImageIndex === this.config.images.length) {
          this.config.images = shuffle(this.config.images)
          this.nextImageIndex = 0
        }

        const nextImage = this.config.images[this.nextImageIndex]

        hiddenElement.style.backgroundImage = `url(${nextImage.url})`

        this.nextImageIndex += 1
      }, this.config.transitionMs + 100)
    }, this.config.timerMs)
  }
}
