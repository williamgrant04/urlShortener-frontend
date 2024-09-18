import axios from "axios"
import React, { useEffect, useState } from "react"

const shortenedRedirect = (): React.JSX.Element => {
  const [sourceURL, setSourceURL] = useState("")
  const [timesUsed, setTimesUsed] = useState(0)
  useEffect(() => {
    const path = window.location.pathname.split("/")[1] // get the identifier from the url
    console.log(path)
    axios.get(`http://localhost:3000/${path}`).then((res) => {
      console.log(res)
      setSourceURL(res.data.source_url)
      setTimesUsed(res.data.click_count)
      window.location.href = res.data.source_url
    })
  }, [])
  return (
    <div>
      <h1>Redirecting to {sourceURL}</h1>
      <p>This shortened URL has been used {timesUsed} times</p>
    </div>
  )
}

export default shortenedRedirect
