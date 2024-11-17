import { AccountDataType } from '../models/Account'
import Tool from './Tool'

export default class Circle extends Tool {
  mouseDown: boolean = false
  name: string = 'circle'
  startX: number = 0
  startY: number = 0
  endX: number = 0
  endY: number = 0
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
      this.endX = e.offsetX
      this.endY = e.offsetY
      const radius = Math.sqrt(
        Math.pow(this.endX - this.startX, 2) +
          Math.pow(this.endY - this.startY, 2)
      )
      this.draw(this.startX, this.startY, radius)
    }
  }

  draw(centerX: number, centerY: number, radius: number) {
    const img = new Image()
    if (this.savedCanvas) {
      img.src = this.savedCanvas
      img.onload = () => {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

        this.ctx?.beginPath()
        this.ctx?.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        this.ctx?.stroke()
        this.ctx?.fill()
      }
    }
  }
}
