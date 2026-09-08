import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { DataPage, ErrorMessage } from './Activities.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((reason) => setError(reason.message)) }, [])
  return <DataPage eyebrow="Collective effort" title="Stronger together." description="The crews showing up and keeping each other accountable.">
    {error ? <ErrorMessage message={error} /> : <div className="team-grid">{teams.map((team) => <article className="team-card" key={team._id}><span className="card-kicker">Team / {team.members?.length ?? 0} members</span><h2>{team.name}</h2><div className="member-list">{team.members?.map((member) => <span key={member._id}>{member.avatar ?? member.name?.slice(0, 2)} <small>{member.name}</small></span>)}</div></article>)}</div>}
  </DataPage>
}
export default Teams