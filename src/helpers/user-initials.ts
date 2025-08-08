export function getUserInitials(name?: string | null, maxInitials = 2): string {
  if (!name || typeof name !== 'string') {
    return ''
  }

  const nameParts = name
    .trim()
    .split(' ')
    .filter((part) => part.length > 0)

  if (nameParts.length === 0) {
    return ''
  }

  const initials = nameParts
    .slice(0, maxInitials)
    .map((part) => part[0]?.toUpperCase())
    .filter((initial) => initial)
    .join('')

  return initials
}
