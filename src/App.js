import './App.css';
import {React, useEffect, useState} from 'react'
import randomWords from 'random-spanish-words'

function App() {

  const randomWord = randomWords(99)[Math.random() * 99 | 0];
  const [word, setWord] = useState(randomWord)
  const [input, setInput] = useState('')
  const [correctWords, setCorrectWords] = useState(0)
  const [incorrectWords, setIncorrectWords] = useState(0)
  const [time, setTime] = useState(0)
  const [record, setRecord] = useState(0)
  const rePlay = correctWords > 0 && record > 0 || incorrectWords > 0

  const total = correctWords + incorrectWords;

  const handleSubmit = (e) => {
    e.preventDefault();

    setWord(randomWord);

    if(input === word) {
      setCorrectWords((correctWords) => correctWords + 1);
    } else {
      setIncorrectWords(incorrectWords + 1)
    }

    setInput('');
  }

  const handlePlay = () => {
    setTime(100);

    setCorrectWords(0);
    setIncorrectWords(0);

    setInput('');
  }

  useEffect(() => {
    
    if (time !== 0) {
      const timeout = setTimeout(() => setTime(time - 1), 1000)
    } else {
      if(total > record) {
        setRecord(total)
      }
    }
  }, [time])

  return (
    <div className="App">
      {time !== 0 ? (
      <div>
        <div style={{textAlign: 'center', position: 'relative', bottom: '21px', display: 'flex', flexDirection: 'column'}}>
          <h1>{word}</h1>
          <h1 style={{fontSize: '30px'}}>{time}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input 
            autoFocus
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className='ingame-text-container'>
            <h2 className='ingame-text'>Correct words: {correctWords}</h2>
            <h2 className='ingame-text'>Wrong words: {incorrectWords}</h2>
          </div>
          <button 
            type='submit'
            className='submitBtn' 
          />
        </form>
      </div>
      ) : (
      <div>
        {rePlay ? (
          <div className='results-card'>
            <h1 className='results-title'>{total} WPM</h1>
            <div className='results-text'>
              <h2>Correct words: {correctWords}</h2>
              <h2>Wrong words: {incorrectWords}</h2>
              <h2>Best Score: {record}</h2>  
            </div>
          </div>
        ) : (<></>)}
        <button 
        className={rePlay ? 'playAgainBtn' : 'playBtn'}
        onClick={handlePlay}>
          {rePlay ? 'Play again' : 'PLAY'}
        </button>
      </div>
      )}

    </div>
  );
}

export default App;
