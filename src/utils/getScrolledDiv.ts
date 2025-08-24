const getScrolledDiv = () => {
  const canvas = [...document.getElementsByTagName('canvas')][0]
  const scrolledDiv = canvas?.parentNode?.children?.[1]

  return scrolledDiv
}


export default getScrolledDiv
