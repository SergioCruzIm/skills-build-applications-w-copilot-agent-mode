import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, EmptyMessage, ErrorMessage, LoadingMessage } from './Activities.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchCollection('users')
      .then(setUsers)
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false))
  }, [])
  return <DataPage eyebrow="The community" title="Know your crew." description="Everyone making the tracker more than a number.">
    {error ? <ErrorMessage message={error} /> : loading ? <LoadingMessage /> : users.length === 0 ? <EmptyMessage /> : <div className="user-grid">{users.map((user, index) => <article className="user-card" key={user._id ?? index}><span className="avatar avatar--large">{user.avatar ?? user.name?.slice(0, 2) ?? '??'}</span><h2>{user.name ?? 'Unnamed user'}</h2><p>{user.email ?? 'No email provided'}</p></article>)}</div>}
  </DataPage>
}
export default Users