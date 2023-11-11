import { useState } from 'react'
import rawcycle from './assets/rawcycle_logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => console.log('click')}>
        <img src={rawcycle}></img>
      </button>
    </>
  )
}

export default App
