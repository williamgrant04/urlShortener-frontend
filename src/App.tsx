import axios from "axios"
import React, { useState } from "react"

function App() {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")

  const clickHandler = async () => {
    const res = await axios.post("http://localhost:3000/create", { url: url })
    console.log(res)
    setUrl("")
    if (res.status === 200) {
      setShortUrl(res.data.identifier)
    }
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }
  // TODO: Add validation for url so that it matches the pattern of a valid url before sending it to backend
  // TODO: (also add validation on backend)
  return (
    <>
      <input type="text" value={url} onChange={inputChangeHandler} />
      <input type="button" value="submit" onClick={clickHandler} />
      {shortUrl && <p>http://localhost:5173/{shortUrl}</p>}
    </>
  )
}

export default App
