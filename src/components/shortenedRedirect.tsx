import axios from "axios"
import React, { useEffect } from "react"

const shortenedRedirect = (): React.JSX.Element => {
  useEffect(() => {
    const path = window.location.pathname.split("/")[1] // get the identifier from the url
    console.log(path)
    axios.get(`http://localhost:3000/${path}`).then((res) => {window.location.href = res.data.source_url})
  }, [])
  return <div>redirecting...</div>
}

export default shortenedRedirect
