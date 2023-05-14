import { useState } from 'react'

import './App.css'
import Start from './Start'
import Quiz from './Quiz'

function App() {
  const [showQuiz, setShowQuiz] = useState(false)

  const handleClick =()=>setShowQuiz(prevState => !prevState)

  return (
   <>
   <head>
   <meta charSet="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   </head>
      <main className="App">
        {!showQuiz ? (
        <>
          <Start/>
          <button onClick={handleClick}>Start Quiz</button>
        </>
        ):(
        <Quiz/>
        )}
      </main>
    </>
  )
}

export default App
