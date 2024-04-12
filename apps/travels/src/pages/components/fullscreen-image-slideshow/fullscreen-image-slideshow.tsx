import { useEffect } from 'react'
import { FullscreenImageDefinition } from 'src/pages/components/fullscreen-image-slideshow/fullscreen-image-definition'
import { SlideshowController } from 'src/pages/components/fullscreen-image-slideshow/slideshow-controller'

interface FullscreenImageSlideshowProps {
  images: FullscreenImageDefinition[]
}

enum ElementIds {
  FirstElement = 'fis-image-1',
  SecondElement = 'fis-image-2',
}

export default function FullscreenImageSlideshow({
  images,
}: FullscreenImageSlideshowProps) {
  useEffect(() => {
    const slideshow = new SlideshowController({
      images,
      firstElementId: ElementIds.FirstElement,
      secondElementId: ElementIds.SecondElement,
    })

    // TODO: cleanup slideshow interval/timeout
    slideshow.init()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (images.length === 0) {
    return (
      <section className="h-screen">
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-xl font-semibold">
            No images in slideshow!
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="h-screen">
      <div
        className="absolute left-0 h-screen w-full bg-cover bg-center bg-no-repeat"
        id={ElementIds.FirstElement}
      />
      <div
        className="absolute left-0 h-screen w-full bg-cover bg-center bg-no-repeat transition-opacity ease-in-out"
        id={ElementIds.SecondElement}
      />
    </section>
  )
}
