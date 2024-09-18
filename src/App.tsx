import axios from "axios"
import { useState } from "react"

function App() {
  const [url, setUrl] = useState("")

  const clickHandler = async () => {
    const res = await axios.post("http://localhost:3000/create", { url: url })
    console.log(res)
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setUrl(e.target.value)
  }

  return (
    <>
      <input type="text" value={url} onChange={inputChangeHandler} />
      <button onClick={clickHandler}>
        submit
      </button>
    </>
  )
}

export default App
