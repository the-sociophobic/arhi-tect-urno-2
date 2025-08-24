import { useQuery } from '@tanstack/react-query'

import {
  ContentfulArchitectType,
  ContentfulDataType,
  ContentfulEmptyCardType,
  ContentfulMaterialType,
  ContentfulMediaType,
  ContentfulPageType,
  ContentfulProjectType,
} from '../../types/contentful.type'
import { getContentfulData } from './contentful'
import isProd from '../../utils/isProd'
// import static_data from '@/app/lib/utils/static/contentful.json'


export const emptyContentful: ContentfulDataType = {
  architects: [] as ContentfulArchitectType[],
  emptyCards: [] as ContentfulEmptyCardType[],
  materials: [] as ContentfulMaterialType[],
  medias: [] as ContentfulMediaType[],
  pages: [] as ContentfulPageType[],
  projects: [] as ContentfulProjectType[],
}


export const getContentfulDataWithoutBadItems = async () => {
  let data: ContentfulDataType | undefined = emptyContentful
  let error = false

  // if (!isProd()) {
  //   // data = static_data as any as ContentfulDataType
  //   data = {} as any as ContentfulDataType
  // } else {
    try {
      data = {
        ...(await getContentfulData<{ architects: ContentfulArchitectType[] }>('architect')),
        ...(await getContentfulData<{ emptyCards: ContentfulEmptyCardType[] }>('emptyCard')),
        ...(await getContentfulData<{ materials: ContentfulMaterialType[] }>('material')),
        ...(await getContentfulData<{ medias: ContentfulMediaType[] }>('media')),
        ...(await getContentfulData<{ pages: ContentfulPageType[] }>('page')),
        ...(await getContentfulData<{ projects: ContentfulProjectType[] }>('project')),
      }
      // downloadFile(JSON.stringify(data), 'contentful', 'json')
    } catch (err) {
      error = true
    }
  // }

  if (error)
    return emptyContentful
  else
    return data
}

const useContentful = () => {
  return useQuery<ContentfulDataType>({
    queryKey: ['contentful'],
    queryFn: getContentfulDataWithoutBadItems
  })
}


export default useContentful
