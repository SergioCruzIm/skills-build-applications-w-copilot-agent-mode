const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function fetchCollection(endpoint) {
  const response = await fetch(`${apiBaseUrl}/api/${endpoint}`)
  if (!response.ok) throw new Error(`Could not load ${endpoint}`)
  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  return payload.data ?? payload.results ?? payload.items ?? []
}