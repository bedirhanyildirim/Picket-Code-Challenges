import { useState, useEffect } from "react"

export default function App() {
  const [inputValue, setInputValue] = useState('')
  const [isInvalid, setIsInvalid] = useState(false)
  const [isVibrating, setIsVibrating] = useState(false)

  let timeoutToClearLater

  // before component dies clear the timeout
  useEffect(() => {
    return () => {
      clearTimeout(timeoutToClearLater)
    }
  }, [])

  // when input value is changed
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
    setIsInvalid(false)
    setIsVibrating(false)
  }

  // when clicked to submit button
  const handleSubmit = () => {
    const integerRegex = /^\d+$/

    if (!integerRegex.test(inputValue)) {
      setIsInvalid(true)
      setIsVibrating(true)
      timeoutToClearLater = setTimeout(() => { setIsVibrating(false) }, 500)
    } else {
      alert(`The number entered is: ${inputValue}`)
    }
  }

  // button style
  const inputStyle = {
    border: isInvalid ? '2px solid red' : '2px solid blue',
    outline: 'none',
    padding: '5px',
    borderRadius: '5px',
    marginRight: '10px',
    animation: isVibrating ? 'vibrate 0.3s' : 'none',
  }

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        style={inputStyle}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
