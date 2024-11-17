import { AccountDataType } from '../models/Account'
import Tool from './Tool'

export default class Line extends Tool {
  mouseDown: boolean = false
  name: string = 'line'
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
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      this.draw(e.offsetX, e.offsetY)
    }
  }

  draw(x: number, y: number) {
    const img = new Image()
    if (this.savedCanvas) {
      img.src = this.savedCanvas
      img.onload = () => {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx?.beginPath()
        this.ctx?.moveTo(this.startX, this.startY)
        this.ctx?.lineTo(x, y)
        this.ctx?.stroke()
      }
    }
  }
}
