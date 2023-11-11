import rawcycle from '../assets/logo.webp'
import './styles/home.css'

export default function HomePage() {
  return <div className='home-container'>
    <h1>Give new life to your critical raw materials</h1>
    <div className='button-container'>
      <h2>Tap to Rawcycle</h2>
      <a className='rawcycle-button' href="/capture">
        <img className='rawcycle-logo' src={rawcycle}></img>
      </a>
    </div>
  </div>
}
