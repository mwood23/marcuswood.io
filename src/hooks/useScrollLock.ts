import { useEffect } from 'react'

export const useScrollLock = (lockScroll: boolean) => {
  useEffect(() => {
    const { body } = document

    if (lockScroll) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = 'initial'
    }
  }, [lockScroll])
}
