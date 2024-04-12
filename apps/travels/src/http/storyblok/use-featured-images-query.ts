import { UseQueryOptions } from '@tanstack/react-query/src/types'
import StoryblokApi from 'src/http/storyblok/storyblok-api'
import { FeaturedImage } from 'src/models/featured-image/featured-image'
import { AllienxApiListResponse } from 'ui/lib/http/allienx-api-list-response'
import HttpClient from 'ui/lib/http/http-client'
import useHttpQuery from 'ui/lib/http/use-http-query'

interface UseTtpLocationsQuery {
  queryOpts?: Omit<
    UseQueryOptions<AllienxApiListResponse<FeaturedImage>, any, any, any>,
    'queryKey' | 'queryFn'
  >
}

export default function useFeaturedImagesQuery({
  queryOpts,
}: UseTtpLocationsQuery = {}) {
  const featuredImagesQuery = useHttpQuery<
    AllienxApiListResponse<FeaturedImage>
  >({
    httpClient: new HttpClient(),
    url: StoryblokApi.featuredImagesUrl(),
    queryOpts: {
      cacheTime: Infinity,
      staleTime: 60 * 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      ...queryOpts,
    },
  })

  return {
    featuredImagesQuery,
    featuredImages: featuredImagesQuery.data?.records || [],
  }
}
