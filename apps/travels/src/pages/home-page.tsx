import FeaturedImagesGuard from 'src/models/featured-image/featured-images-guard'
import HomePageContent from 'src/pages/home/home-page-content'

export default function HomePage() {
  return (
    <FeaturedImagesGuard>
      <HomePageContent />
    </FeaturedImagesGuard>
  )
}
