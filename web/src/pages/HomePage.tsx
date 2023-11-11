import { useNavigate } from 'react-router'
import rawcycle from '../assets/rawcycle_logo.svg'
import './styles/home.css'

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <button className="rawcycle-button" onClick={() => navigate('/capture')}>
      <img className="rawcycle-logo" src={rawcycle}></img>
    </button>
  )
}
