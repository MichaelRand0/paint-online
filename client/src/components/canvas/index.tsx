import { observer } from 'mobx-react-lite'
import calculatePx from '../../helpers/calculatePx'
import './style.scss'
import { useEffect, useRef } from 'react'
import canvasState from '../../store/canvasState'
import toolState from '../../store/toolState'
import Brush from '../../tools/Brush'
import { CanvasRefType } from '../../models/Canvas'

interface Props {}

const Canvas = observer((props: Props) => {
  const width = calculatePx(1920, 800)
  const height = calculatePx(1920, 600)

  const canvasRef = useRef<any>(null)

  useEffect(() => {
    if (canvasRef) {
      canvasState.setCanvasRef(canvasRef)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={() =>
        canvasState.pushUndoList(canvasRef.current?.toDataURL())
      }
      className='canvas'
      width={width}
      height={height}
    ></canvas>
  )
})

export default Canvas
