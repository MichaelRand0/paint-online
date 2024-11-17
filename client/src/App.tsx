import { useEffect, useRef, useState } from 'react'
import './App.scss'
import Canvas from './components/canvas'
import Toolbar from './components/toolbar'
import HeaderList from './modules/headerList'
import toolState from './store/toolState'
import canvasState from './store/canvasState'
import BrushTool from './tools/Brush'
import { Button, Form, Input, Modal } from 'antd'
import Title from 'antd/es/typography/Title'
import { LoginFormDataType } from './models/Account'
import { useParams } from 'react-router-dom'
import accountState from './store/accountState'
import axios from 'axios'

function App() {
  const port = process.env.PORT || 5000
  const syncSession = () => {
    axios.get(`http://localhost:${port}/session/${params?.id}`).then((resp) => {
      const base64 = JSON.parse(resp?.data)?.data

      const ctx = canvasState.canvasRef?.current.getContext('2d')
      const img = new Image()
      img.src = ('data:image/png;base64,' + base64).toString()
      img.onload = () => {
        if (canvasState.canvasRef?.current) {
          ctx?.drawImage(
            img,
            0,
            0,
            canvasState.canvasRef?.current.width,
            canvasState.canvasRef?.current.height
          )
        }
      }
    })
  }

  const [loginModal, setLoginModal] = useState(true)

  const params = useParams()

  const loginSubmit = (data: LoginFormDataType) => {
    const websocket = new WebSocket(`ws://localhost:${port}/`)

    accountState.setWebsocket(websocket)

    accountState.setAccountData({
      sessionId: params?.id ?? '',
      username: data?.username,
    })

    websocket.onopen = (event) => {
      websocket.send(
        JSON.stringify({
          username: data.username,
          method: 'connection',
          sessionId: params.id,
        })
      )

      syncSession()
      if (
        canvasState.canvasRef?.current &&
        accountState.accountData &&
        accountState.websocket
      ) {
        toolState.setTool(
          new BrushTool(
            canvasState.canvasRef?.current,
            accountState.accountData,
            accountState.websocket
          )
        )
      }

      setLoginModal(false)
    }

    websocket.onmessage = (msg) => {
      const message = JSON.parse(msg?.data)
      switch (message?.method) {
        case 'connection':
          console.log(`Пользователь ${message?.username} подключился к сессии`)
          break

        case 'draw':
          const ctx = canvasState.canvasRef?.current.getContext('2d')
          const img = new Image()
          img.src = message?.img
          console.log('mesas', message)
          img.onload = () => {
            if (canvasState.canvasRef?.current) {
              ctx?.drawImage(
                img,
                0,
                0,
                canvasState.canvasRef?.current.width,
                canvasState.canvasRef?.current.height
              )
            }
          }
          break

        default:
          break
      }
    }
  }

  return (
    <div className='app'>
      <Modal footer={null} closeIcon={null} open={loginModal}>
        <Form
          onFinish={(data: LoginFormDataType) => loginSubmit(data)}
          layout='vertical'
          name='login'
        >
          <Title>Авторизация</Title>
          <Form.Item
            label='Имя'
            name='username'
            rules={[{ required: true, message: 'Обязательное поле' }]}
          >
            <Input placeholder='John Doe' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit'>Ok</Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className='app__header'>
        <HeaderList />
        <Toolbar>
          <div className='app__header-item'>
            <label htmlFor='width' className='app__header-label'>
              Толщина линии
            </label>
            <input
              id='width'
              name='width'
              className='app__header-input'
              min={1}
              max={50}
              defaultValue={1}
              onChange={(e) =>
                toolState.tool?.setLineWidth(Number(e.target.value))
              }
              type='number'
            />
          </div>
        </Toolbar>
      </div>
      <div className='app__main'>
        <Canvas />
      </div>
    </div>
  )
}

export default App
