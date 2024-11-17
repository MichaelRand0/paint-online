import { AccountDataType } from '../models/Account'
import Tool from './Tool'

export default class Rect extends Tool {
  mouseDown: boolean = false
  name: string = 'rect'
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
      const width = e.offsetX - this.startX
      const height = e.offsetY - this.startY
      this.draw(this.startX, this.startY, width, height)
    }
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image()
    if (this.savedCanvas) {
      img.src = this.savedCanvas
      img.onload = () => {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
        this.ctx?.beginPath()
        this.ctx?.rect(x, y, w, h)
        this.ctx?.stroke()
        this.ctx?.fill()
      }
    }
  }
}
