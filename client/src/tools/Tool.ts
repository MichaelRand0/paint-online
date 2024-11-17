import { AccountDataType } from '../models/Account'

export default class Tool {
  canvas: HTMLCanvasElement
  account: AccountDataType
  websocket: WebSocket
  ctx: CanvasRenderingContext2D | null

  constructor(
    canvas: HTMLCanvasElement,
    account: AccountDataType,
    websocket: WebSocket
  ) {
    this.canvas = canvas
    this.account = account
    this.websocket = websocket
    this.ctx = canvas.getContext('2d')
  }

  setFillColor(color: string) {
    if (this.ctx) {
      this.ctx.fillStyle = color
    }
  }

  setStrokeColor(color: string) {
    if (this.ctx) {
      this.ctx.strokeStyle = color
    }
  }

  setLineWidth(width: number) {
    if (this.ctx) {
      this.ctx.lineWidth = width
    }
  }

  destroyListeners() {
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
    this.canvas.onmousemove = null
  }
}
