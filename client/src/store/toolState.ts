import { makeAutoObservable } from 'mobx'
import { ToolType } from '../models/Tool'

class ToolState {
  tool: ToolType = null
  constructor() {
    makeAutoObservable(this)
  }

  setTool(tool: ToolType) {
    this.tool = tool
  }

  setFillColor(color: string) {
    if (this.tool) {
      this.tool.setFillColor(color)
    }
  }

  setStrokeColor(color: string) {
    if (this.tool) {
      this.tool.setStrokeColor(color)
    }
  }

  setLineWidth(width: number) {
    if (this.tool) {
      this.tool.setLineWidth(width)
    }
  }
}

export default new ToolState()
