import { useState, useEffect } from 'react'

const useMediaQuery = (query: string): boolean => {
  const [doesMatch, onSetDoesMatch] = useState<boolean>(false)

  useEffect(() => {
    const matcher = window.matchMedia(query)

    const onUpdateMatch = (event: MediaQueryListEvent | MediaQueryList) => {
      onSetDoesMatch(event.matches)
    }

    onUpdateMatch(matcher)

    if (matcher.addEventListener) {
      matcher.addEventListener('change', onUpdateMatch)
    } else {
      matcher.addListener(onUpdateMatch)
    }

    return () => {
      if (matcher.removeEventListener) {
        matcher.removeEventListener('change', onUpdateMatch)
      } else {
        matcher.removeListener(onUpdateMatch)
      }
    }
  }, [query, onSetDoesMatch])

  return doesMatch
}

export default useMediaQuery
