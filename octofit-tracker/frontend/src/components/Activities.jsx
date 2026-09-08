import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCollection('activities')
      .then(setActivities)
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false))
  }, [])

  return <DataPage eyebrow="Activity log" title="Every rep adds up." description="Recent movement across the OctoFit community.">
    {error ? <ErrorMessage message={error} /> : loading ? <LoadingMessage /> : activities.length === 0 ? <EmptyMessage /> : <div className="table-wrap"><table><thead><tr><th>Athlete</th><th>Type</th><th>Duration</th><th>Points</th><th>Date</th></tr></thead><tbody>{activities.map((activity, index) => <tr key={activity._id ?? index}><td className="strong">{activity.user?.name ?? activity.user ?? 'Unknown athlete'}</td><td><span className="tag">{activity.type ?? 'Activity'}</span></td><td>{activity.durationMinutes ?? 0} min</td><td className="points">+{activity.points ?? 0}</td><td>{activity.performedAt ? new Date(activity.performedAt).toLocaleDateString() : '—'}</td></tr>)}</tbody></table></div>}
  </DataPage>
}

export function DataPage({ eyebrow, title, description, children }) { return <section className="data-page"><div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p></div>{children}</section> }
export function ErrorMessage({ message }) { return <div className="empty-state"><strong>Could not load this view.</strong><span>{message}</span></div> }
export function LoadingMessage() { return <div className="empty-state"><strong>Loading data...</strong></div> }
export function EmptyMessage() { return <div className="empty-state"><strong>No records yet.</strong><span>New activity will appear here when it is recorded.</span></div> }
export default Activities