import isProd from './isProd'


const generatePath = (path: string) => {
  return (isProd() ? 'https://the-sociophobic.github.io/arhi-tect-urno-2/' : './arhi-tect-urno-2') + path
}


export default generatePath
