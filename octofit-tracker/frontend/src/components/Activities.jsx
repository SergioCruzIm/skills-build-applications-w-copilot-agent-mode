import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => { fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message)) }, [])

  return <DataPage eyebrow="Activity log" title="Every rep adds up." description="Recent movement across the OctoFit community.">
    {error ? <ErrorMessage message={error} /> : <div className="table-wrap"><table><thead><tr><th>Athlete</th><th>Type</th><th>Duration</th><th>Points</th><th>Date</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td className="strong">{activity.user?.name ?? activity.user}</td><td><span className="tag">{activity.type}</span></td><td>{activity.durationMinutes} min</td><td className="points">+{activity.points}</td><td>{new Date(activity.performedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div>}
  </DataPage>
}

export function DataPage({ eyebrow, title, description, children }) { return <section className="data-page"><div className="page-intro"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p></div>{children}</section> }
export function ErrorMessage({ message }) { return <div className="empty-state"><strong>Could not load this view.</strong><span>{message}</span></div> }
export default Activities