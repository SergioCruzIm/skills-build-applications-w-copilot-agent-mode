const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiUrl(component) {
  return `${apiBaseUrl}/api/${component}/`
}

function collectionFrom(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['data', 'results', 'items', 'docs']) {
    if (key in payload) return collectionFrom(payload[key])
  }

  return []
}

export async function fetchCollection(endpoint) {
  const response = await fetch(apiUrl(endpoint))
  if (!response.ok) throw new Error(`Could not load ${endpoint} (${response.status})`)
  return collectionFrom(await response.json())
}