import rawcycle from '../assets/rawcycle_logo.svg'
import './styles/home.css'

export default function HomePage() {
  return <>
    <button className='rawcycle-button' onClick={() => console.log('click')}>
      <img className='rawcycle-logo' src={rawcycle}></img>
    </button>
  </>
}
