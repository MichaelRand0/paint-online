import { AccountDataType } from '../models/Account'
import Tool from './Tool'

export default class Brush extends Tool {
  mouseDown: boolean = false
  name: string = 'brush'
  constructor(
    canvas: HTMLCanvasElement,
    account: AccountDataType,
    websocket: WebSocket
  ) {
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
    this.ctx?.beginPath()
    this.ctx?.moveTo(e.offsetX, e.offsetY)
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      this.draw(e.offsetX, e.offsetY)
    }
  }

  draw(x: number, y: number) {
    this.ctx?.lineTo(x, y)
    this.ctx?.stroke()
  }
}
