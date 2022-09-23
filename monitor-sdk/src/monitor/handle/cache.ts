const cache = []

export function addCache(data) {
  cache.push(data)
}
export function getCache() {
  return cache
}

export function clearCache() {
  cache.length = 0
} 