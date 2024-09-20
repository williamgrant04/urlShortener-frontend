import axios from "axios"
import React, { useState } from "react"

const App = () => {
  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [error, setError] = useState("")

  const validateUrl = (): boolean => {
    if (!url) {
      setError("Please enter a URL")
      return false
    }
    if (!url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {
      setError("Please enter a valid URL")
      return false
    }

    setError("") // Just remove the error message if it was shown
    return true
  }

  const clickHandler = async () => {
    setShortUrl("") // Remove a previous short url if it was shown
    if (validateUrl()) {
      const response = await axios.post("http://localhost:3000/create", { url: url })
      setUrl("")
      if (response.status === 200) {
        setShortUrl(response.data.identifier)
      }
    }
  }

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  return (
    <>
      <input type="text" value={url} onChange={inputChangeHandler} />
      <input type="button" value="submit" onClick={clickHandler} />
      {error && <p>{error}</p>}
      {shortUrl && <p>http://localhost:5173/{shortUrl}</p>}
    </>
  )
}

export default App
