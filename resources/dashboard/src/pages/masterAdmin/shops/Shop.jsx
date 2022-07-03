// import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function Shop() {

  const { id } = useParams();

  return (
    <div>Shop {id}</div>
  )
}

export default Shop