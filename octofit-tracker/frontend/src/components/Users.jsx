import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, ErrorMessage } from './Activities.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users').then(setUsers).catch((reason) => setError(reason.message)) }, [])
  return <DataPage eyebrow="The community" title="Know your crew." description="Everyone making the tracker more than a number.">
    {error ? <ErrorMessage message={error} /> : <div className="user-grid">{users.map((user) => <article className="user-card" key={user._id}><span className="avatar avatar--large">{user.avatar ?? user.name?.slice(0, 2)}</span><h2>{user.name}</h2><p>{user.email}</p></article>)}</div>}
  </DataPage>
}
export default Users