import { useMemo } from 'react'
import useFeaturedImagesQuery from 'src/http/storyblok/use-featured-images-query'
import { FullscreenImageDefinition } from 'src/pages/components/fullscreen-image-slideshow/fullscreen-image-definition'
import FullscreenImageSlideshow from 'src/pages/components/fullscreen-image-slideshow/fullscreen-image-slideshow'
import { useIsMobile } from 'ui/lib/hooks/use-is-mobile'

export default function HomePageContent() {
  const isMobile = useIsMobile()
  const { featuredImages } = useFeaturedImagesQuery()

  const images = useMemo<FullscreenImageDefinition[]>(() => {
    return isMobile
      ? featuredImages
          .filter((featuredImage) => featuredImage.content.is_mobile)
          .map((featuredImage) => {
            return {
              url: `${featuredImage.content.image.filename}/m/0x1200`,
            }
          })
      : featuredImages
          .filter((featuredImage) => !featuredImage.content.is_mobile)
          .map((featuredImage) => {
            return {
              url: `${featuredImage.content.image.filename}/m/0x1200`,
            }
          })
  }, [featuredImages, isMobile])

  return <FullscreenImageSlideshow images={images} />
}
