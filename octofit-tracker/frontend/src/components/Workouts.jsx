import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, EmptyMessage, ErrorMessage, LoadingMessage } from './Activities.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchCollection('workouts')
      .then(setWorkouts)
      .catch((reason) => setError(reason.message))
      .finally(() => setLoading(false))
  }, [])
  return <DataPage eyebrow="Personalized training" title="Choose your challenge." description="Focused sessions for wherever you are today.">
    {error ? <ErrorMessage message={error} /> : loading ? <LoadingMessage /> : workouts.length === 0 ? <EmptyMessage /> : <div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><div className="workout-top"><span className="tag">{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><div className="workout-type">{workout.activityType}</div></article>)}</div>}
  </DataPage>
}
export default Workouts