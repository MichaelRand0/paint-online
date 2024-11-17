const express = require('express')

const app = express()

const cors = require('cors')

const fs = require('fs')

app.use(cors())

const WSServer = require('express-ws')(app)

const PORT = process.env.PORT || 5000

const clients = new Set()

app.get('/session/:id', (req, res) => {
  const sessionId = req.params.id

  fs.readFile(`./sessions/${sessionId}.png`, (err, data) => {
    if(data) {
      return res.status(200).json(
        JSON.stringify({
          status: 200,
          success: true,
          data: data.toString('base64'),
        })
      )
    } else {
      return res.status(200).json(JSON.stringify({
        status: 200,
        success: true,
        data: null
      }))
    }
  })
})

app.ws('/', (ws, req) => {
  clients.add(ws)
  ws.on('message', (msg) => {
    const message = JSON.parse(msg)

    switch (message?.method) {
      case 'draw':
        clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            const base64 = message?.img.replace(/^data:image\/\w+;base64,/, '')
            fs.writeFile(
              `./sessions/${message?.sessionId}.png`,
              base64,
              'base64',
              (err) => {
                console.log('err', err)
              }
            )
            client.send(JSON.stringify(message))
          }
        })
        break

      default:
        clients.forEach((client) => {
          client.send(JSON.stringify(message))
        })
        break
    }
  })
})

app.listen(PORT, () => {
  console.log(`server started on ${PORT} port`)
})
