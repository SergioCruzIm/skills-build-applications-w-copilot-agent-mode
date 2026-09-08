import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, EmptyMessage, ErrorMessage, LoadingMessage } from './Activities.jsx'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchCollection('leaderboard')
      .then(setEntries)
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false))
  }, [])
  return <DataPage eyebrow="Competitive pulse" title="The board is moving." description="Points earned through consistent, recorded effort.">
    {error ? <ErrorMessage message={error} /> : loading ? <LoadingMessage /> : entries.length === 0 ? <EmptyMessage /> : <div className="leaderboard">{entries.map((entry, index) => <div className="rank-row" key={entry.user?._id ?? entry._id ?? index}><span className={`rank rank-${index + 1}`}>{String(index + 1).padStart(2, '0')}</span><span className="avatar">{entry.user?.avatar ?? entry.user?.name?.slice(0, 2) ?? '??'}</span><span className="rank-name"><strong>{entry.user?.name ?? entry.user ?? 'Unknown athlete'}</strong><small>{entry.activities ?? 0} activities</small></span><span className="rank-points">{entry.points ?? 0}<small> pts</small></span></div>)}</div>}
  </DataPage>
}
export default Leaderboard