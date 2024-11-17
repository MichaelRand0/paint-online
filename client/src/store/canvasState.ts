import { makeAutoObservable } from 'mobx'
import { CanvasRefType } from '../models/Canvas'

class CanvasState {
  canvasRef: CanvasRefType = null
  undoList: any[] = []
  redoList: any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setCanvasRef(ref: CanvasRefType) {
    this.canvasRef = ref
  }

  pushUndoList(data: any) {
    this.undoList.push(data)
  }

  pushRedoList(data: any) {
    this.redoList.push(data)
  }

  undo() {
    if (this.undoList.length > 0) {
      const ctx = this.canvasRef?.current.getContext('2d')
      const lastAction = this.undoList.pop()
      this.pushRedoList(this.canvasRef?.current.toDataURL())
      const img = new Image()
      img.src = lastAction
      img.onload = () => {
        if (this.canvasRef?.current) {
          ctx?.clearRect(
            0,
            0,
            this.canvasRef.current.width,
            this.canvasRef.current.height
          )
          ctx?.drawImage(
            img,
            0,
            0,
            this.canvasRef?.current.width,
            this.canvasRef?.current.height
          )
        }
      }
    }
  }

  redo() {
    const ctx = this.canvasRef?.current.getContext('2d')
    const lastUndo = this.redoList.pop()
    this.pushUndoList(this.canvasRef?.current.toDataURL())
    const img = new Image()
    img.src = lastUndo
    img.onload = () => {
      if (this.canvasRef?.current) {
        ctx?.clearRect(
          0,
          0,
          this.canvasRef.current.width,
          this.canvasRef.current.height
        )
        ctx?.drawImage(
          img,
          0,
          0,
          this.canvasRef?.current.width,
          this.canvasRef?.current.height
        )
      }
    }
  }
}

export default new CanvasState()
