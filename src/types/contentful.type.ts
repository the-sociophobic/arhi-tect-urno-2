export type ContentfulDataType = {
  architects: ContentfulArchitectType[]
  emptyCards: ContentfulEmptyCardType[]
  materials: ContentfulMaterialType[]
  medias: ContentfulMediaType[]
  pages: ContentfulPageType[]
  projects: ContentfulProjectType[]
}


export interface ContentfulItemClass {
  id: string
}

export interface ContentfulFile extends ContentfulItemClass {
  file: {
    contentType: string
    details: {
      size: number
      image?: {
        width: number
        height: number
      }
    }
    fileName: string
    url: string
  }
  title: string
}

export interface ContentfulArchitectType extends ContentfulItemClass {
  url: string
  name: string
  company: string
  avatar: ContentfulFile
  description: string
  projects: ContentfulProjectType[]
  media: ContentfulMediaType[]
}

export interface ContentfulEmptyCardType extends ContentfulItemClass {
  url: string
}

export interface ContentfulMaterialType extends ContentfulItemClass {
  url: string
  title: string
  description: string
  avatar: ContentfulFile
}

export interface ContentfulMediaType extends ContentfulItemClass {
  url: string
  thumbnail: ContentfulFile
  title: string
  description: string
  vkUrl: string
  youtubeUrl: string
  rutubeUrl: string
}

export interface ContentfulPageType extends ContentfulItemClass {
  url: string
  tildaURL: string
  title: string
  description: string
  cards: (ContentfulArchitectType | ContentfulEmptyCardType | ContentfulMaterialType | ContentfulMediaType | ContentfulProjectType)[]
}

export interface ContentfulProjectType extends ContentfulItemClass {
  url: string
  title: string
  year: string
  description: string
  avatar: ContentfulFile
}
