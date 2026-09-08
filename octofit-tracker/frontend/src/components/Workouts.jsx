import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, EmptyMessage, ErrorMessage, LoadingMessage } from './Activities.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchCollection('/api/workouts/')
      .then(setWorkouts)
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false))
  }, [])
  return <DataPage eyebrow="Personalized training" title="Choose your challenge." description="Focused sessions for wherever you are today.">
    {error ? <ErrorMessage message={error} /> : loading ? <LoadingMessage /> : workouts.length === 0 ? <EmptyMessage /> : <div className="workout-grid">{workouts.map((workout, index) => <article className="workout-card" key={workout._id ?? index}><div className="workout-top"><span className="tag">{workout.difficulty ?? 'All levels'}</span><span>{workout.durationMinutes ?? 0} min</span></div><h2>{workout.title ?? 'Untitled workout'}</h2><p>{workout.description ?? 'No description available.'}</p><div className="workout-type">{workout.activityType ?? 'Training'}</div></article>)}</div>}
  </DataPage>
}
export default Workouts