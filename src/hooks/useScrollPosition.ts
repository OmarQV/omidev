import { useEffect, useState } from 'react'

/**
 * Custom hook to track scroll position and direction
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    let lastScrollY = window.pageYOffset

    const updateScrollPosition = () => {
      const scrollY = window.pageYOffset
      const direction = scrollY > lastScrollY ? 'down' : 'up'

      if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
        setScrollDirection(direction)
      }

      lastScrollY = scrollY > 0 ? scrollY : 0
      setScrollPosition(scrollY)
    }

    window.addEventListener('scroll', updateScrollPosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateScrollPosition)
    }
  }, [scrollDirection])

  return { scrollPosition, scrollDirection }
}
