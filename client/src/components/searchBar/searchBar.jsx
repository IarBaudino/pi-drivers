import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {driverByName} from '../../redux/actions/actions'

const SearchBar = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  const handleCahange = (event) => {
    event.preventDefault()
    setInput(event.target.value)
    
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(driverByName(input))
   document.getElementById("searchInput").value
   

    console.log("esto es el submit button",event)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input onChange={handleCahange} type="text" placeholder="Find a driver" />
      <input onClick={handleSubmit} type="submit" />
      </form>
    </div>
  )
}

export default SearchBar