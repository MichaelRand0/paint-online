import React, { useEffect } from 'react'
import { redirect, useNavigate } from 'react-router-dom'

type Props = {}

const Loading = (props: Props) => {
  useEffect(() => {
    navigate(`/${(+new Date()).toString(16)}`)
  }, [])

  const navigate = useNavigate()

  return <div>Загрузка сессии...</div>
}

export default Loading
