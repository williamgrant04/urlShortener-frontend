import axios from "axios"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

const shortenedRedirect = (): React.JSX.Element => {
  const [sourceURL, setSourceURL] = useState("")
  const [timesUsed, setTimesUsed] = useState(0)
  useEffect(() => {
    const path = window.location.pathname.split("/")[1] // get the identifier from the url
    axios.get(`http://localhost:3000/${path}`).then((res) => {
      setSourceURL(res.data.source_url)
      setTimesUsed(res.data.click_count)
      window.location.href = res.data.source_url
    })
  }, [])
  return (
    <Main>
      <h1>Redirecting to {sourceURL}</h1>
      <p>This shortened URL has been used {timesUsed} time{timesUsed == 1 ? "" : "s"}</p>
    </Main>
  )
}

const Main = styled.div`
  font-family: 'Roboto', sans-serif;
  height: 90vh; // Just to make it slightly off-center
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export default shortenedRedirect
