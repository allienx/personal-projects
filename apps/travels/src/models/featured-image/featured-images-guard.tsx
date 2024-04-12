import { ReactNode } from 'react'
import useFeaturedImagesQuery from 'src/http/storyblok/use-featured-images-query'

interface FeaturedImagesGuardProps {
  children: ReactNode
}

export default function FeaturedImagesGuard({
  children,
}: FeaturedImagesGuardProps) {
  const { featuredImagesQuery } = useFeaturedImagesQuery()

  if (featuredImagesQuery.isError) {
    return (
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <pre className="p-2 text-left font-mono">
            {JSON.stringify(featuredImagesQuery.error, null, 2)}
          </pre>
        </div>
      </div>
    )
  }

  if (featuredImagesQuery.isLoading) {
    return null
  }

  return children
}
