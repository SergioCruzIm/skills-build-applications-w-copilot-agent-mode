import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl } from './api.js'
import './App.css'

const codespaceConfigured = Boolean(import.meta.env.VITE_CODESPACE_NAME?.trim())
const apiLocation = codespaceConfigured && apiBaseUrl.startsWith('https://')
  ? 'Codespaces / live data'
  : 'Local API / live data'

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Overview() {
  return (
    <section className="overview">
      <div className="page-intro">
        <p className="eyebrow">OctoFit Tracker / Command center</p>
        <h1>Move with intent.</h1>
        <p className="lede">A clear view of the people, teams, and effort powering your next personal best.</p>
      </div>
      <div className="overview-grid">
        <NavLink className="overview-card overview-card--lime" to="/activities">
          <span className="card-kicker">01 / Log</span>
          <strong>Activities</strong>
          <span>Capture the work that counts.</span>
        </NavLink>
        <NavLink className="overview-card overview-card--orange" to="/leaderboard">
          <span className="card-kicker">02 / Compete</span>
          <strong>Leaderboard</strong>
          <span>See momentum across the squad.</span>
        </NavLink>
        <NavLink className="overview-card overview-card--blue" to="/workouts">
          <span className="card-kicker">03 / Train</span>
          <strong>Workouts</strong>
          <span>Find your next focused session.</span>
        </NavLink>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>OctoFit<span className="brand-muted"> / tracker</span></span>
        </NavLink>
        <div className="sidebar-label">Workspace</div>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(({ label, path }) => (
            <NavLink key={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={path} end={path === '/'}>
              <span className="nav-index">{String(navigation.findIndex((item) => item.path === path) + 1).padStart(2, '0')}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-foot"><span className="status-dot" />API connected<br /><small>{apiLocation}</small></div>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
