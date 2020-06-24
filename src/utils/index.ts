/**
 * Validates if email is valid.
 */
export const emailIsValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

/**
 * Creates an optimized cloudinary link based on the config I want them to have
 */
export const createOptimizedCloudinary = (url = '', params = '') => {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, id] = url.split('image/upload/')

  return `https://res.cloudinary.com/dfe5dv4zv/image/upload/f_auto,fl_progressive,q_auto:good,${params}/${id}`
}

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}
