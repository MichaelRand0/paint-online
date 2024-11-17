import { AccountDataType } from '../models/Account'
import Tool from './Tool'

export default class Eraser extends Tool {
  mouseDown: boolean = false
  name: string = 'eraser'
  startX: number = 0
  startY: number = 0
  savedCanvas: string | null = null
  constructor(canvas: HTMLCanvasElement, account: AccountDataType, websocket: WebSocket) {
    super(canvas, account, websocket)
    this.listen()
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  mouseUpHandler(e: MouseEvent) {
    this.mouseDown = false
    this.websocket.send(
      JSON.stringify({
        ...this.account,
        method: 'draw',
        img: this.canvas.toDataURL()
      })
    )
  }

  mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true
    this.startX = e.offsetX
    this.startY = e.offsetY
    this.savedCanvas = this.canvas.toDataURL()
    this.ctx?.beginPath()
    this.ctx?.moveTo(e.offsetX, e.offsetY)
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      if (this.ctx) {
        this.ctx.strokeStyle = 'white'
      }
      this.ctx?.lineTo(e.offsetX, e.offsetY)
      this.ctx?.stroke()
    }
  }
}
