import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, ErrorMessage } from './Activities.jsx'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((reason) => setError(reason.message)) }, [])
  return <DataPage eyebrow="Competitive pulse" title="The board is moving." description="Points earned through consistent, recorded effort.">
    {error ? <ErrorMessage message={error} /> : <div className="leaderboard">{entries.map((entry, index) => <div className="rank-row" key={entry.user?._id ?? index}><span className={`rank rank-${index + 1}`}>{String(index + 1).padStart(2, '0')}</span><span className="avatar">{entry.user?.avatar ?? entry.user?.name?.slice(0, 2)}</span><span className="rank-name"><strong>{entry.user?.name ?? entry.user}</strong><small>{entry.activities} activities</small></span><span className="rank-points">{entry.points}<small> pts</small></span></div>)}</div>}
  </DataPage>
}
export default Leaderboard