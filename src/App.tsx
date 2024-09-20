import axios from "axios"
import React, { useState } from "react"
import styled from "styled-components"

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

  const submitUrlHandler = async (e: React.FormEvent) => {
    e.preventDefault()
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

  const copyShortUrl = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    navigator.clipboard.writeText(`http://localhost:5173/${shortUrl}`)
    event.currentTarget.innerText = "Copied!"
  }

  return (
    <Main>
      <Header>URL Shortener</Header>
      <form onSubmit={submitUrlHandler}>
        <UrlInput type="text" value={url} onChange={inputChangeHandler} />
        <Button type="submit" value="Shorten!"/>
      </form>
      {error && <Error>{error}</Error>}
      {shortUrl && <ShortUrl onClick={copyShortUrl}>http://localhost:5173/{shortUrl}</ShortUrl>}
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

const Header = styled.h1`
  font-size: 3rem;
`
const UrlInput = styled.input`
  font-size: 24px;
  width: 300px;
  height: 35px;
  padding: 8px 12px;
  border: 1px solid #aaa;
  border-right: none;
  border-radius: 8px 0 0 8px;

  &:focus-visible {
    outline: none;
  }
`

const Button = styled.input`
  font-size: 24px;
  background-color: #ddd;
  border: 1px solid #aaa;
  border-left: none;
  border-radius: 0 8px 8px 0;
  height: 35px;
  padding: 8px;
  box-sizing: initial;
  transition: background-color 0.3s;

  &:hover {
    cursor: pointer;
    background-color: #bbb;
  }
`

const ShortUrl = styled.p<{onClick: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void}>`
  font-size: 24px;
  cursor: pointer;
`

const Error = styled.p`
  font-size: 24px;
`

export default App
