export interface FeaturedImage {
  alternates: any[]
  content: {
    _uid: string
    component: 'featured-image'
    description: {
      content: any[]
      type: 'doc'
    }
    image: {
      alt: string
      copyright: string
      fieldtype: 'asset'
      filename: string
      focus: string
      id: number
      is_external_url: boolean
      meta_data: {}
      name: string
      source: string
      title: string
    }
    is_mobile: boolean
    title: string
  }
  created_at: string
  default_full_slug: null
  first_published_at: string
  full_slug: string
  group_id: string
  id: number
  is_startpage: boolean
  lang: string
  meta_data: null
  name: string
  parent_id: number
  path: null
  position: number
  published_at: string
  release_id: null
  slug: string
  sort_by_date: null
  tag_list: any[]
  translated_slugs: null
  uuid: string
}
