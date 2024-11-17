import Toolbar from '../../components/toolbar'
import canvasState from '../../store/canvasState'
import toolState from '../../store/toolState'
import BrushTool from '../../tools/Brush'
import Brush from '../../components/icons/Brush'
import Rect from '../../components/icons/Rect'
import Circle from '../../components/icons/Circle'
import Eraser from '../../components/icons/Eraser'
import Line from '../../components/icons/Line'
import Colors from '../../components/icons/Colors'
import Arrow from '../../components/icons/Arrow'
import Save from '../../components/icons/Save'
import { observer } from 'mobx-react-lite'
import RectTool from '../../tools/Rect'
import CircleTool from '../../tools/Circle'
import EraserTool from '../../tools/Eraser'
import LineTool from '../../tools/Line'
import { useEffect, useRef } from 'react'
import accountState from '../../store/accountState'

interface Props {}

const HeaderList = observer((props: Props) => {
  // refactoring-todo: repeated conditions
  const toolbarLeftElements = [
    {
      id: 'brush',
      onClick: () => {
        if (
          canvasState.canvasRef?.current &&
          accountState?.accountData &&
          accountState?.websocket
        ) {
          toolState.setTool(
            new BrushTool(
              canvasState.canvasRef?.current,
              accountState?.accountData,
              accountState.websocket
            )
          )
        }
      },
      icon: <Brush />,
    },
    {
      id: 'rect',
      onClick: () => {
        if (
          canvasState.canvasRef?.current &&
          accountState?.accountData &&
          accountState?.websocket
        ) {
          toolState.setTool(
            new RectTool(
              canvasState.canvasRef?.current,
              accountState?.accountData,
              accountState.websocket
            )
          )
        }
      },
      icon: <Rect />,
    },
    {
      id: 'circle',
      icon: <Circle />,
      onClick: () => {
        if (
          canvasState.canvasRef?.current &&
          accountState?.accountData &&
          accountState?.websocket
        ) {
          toolState.setTool(
            new CircleTool(
              canvasState.canvasRef?.current,
              accountState?.accountData,
              accountState.websocket
            )
          )
        }
      },
    },
    {
      id: 'eraser',
      icon: <Eraser />,
      onClick: () => {
        if (
          canvasState.canvasRef?.current &&
          accountState?.accountData &&
          accountState?.websocket
        ) {
          toolState.setTool(
            new EraserTool(
              canvasState.canvasRef?.current,
              accountState?.accountData,
              accountState.websocket
            )
          )
        }
      },
    },
    {
      id: 'line',
      icon: <Line />,
      onClick: () => {
        if (
          canvasState.canvasRef?.current &&
          accountState?.accountData &&
          accountState?.websocket
        ) {
          toolState.setTool(
            new LineTool(
              canvasState.canvasRef?.current,
              accountState?.accountData,
              accountState.websocket
            )
          )
        }
      },
    },
    {
      id: 'colors',
      icon: <Colors />,
    },
  ]

  // const toolbarRightElements = [
  //   {
  //     id: 'arrow1',
  //     onClick: () => canvasState.undo(),
  //     disabled: canvasState.undoList.length < 1,
  //     icon: <Arrow />,
  //   },
  //   {
  //     id: 'arrow2',
  //     onClick: () => canvasState.redo(),
  //     disabled: canvasState.redoList.length < 1,
  //     icon: <Arrow className='rotate-y-180' />,
  //   },
  //   {
  //     id: 'save',
  //     icon: <Save />,
  //   },
  // ]

  const inputFillRef = useRef<HTMLInputElement>(null)
  const inputStrokeRef = useRef<HTMLInputElement>(null)

  // reset fill color to selected from input when changing tool from eraser
  useEffect(() => {
    if (
      inputFillRef?.current &&
      toolState.tool &&
      toolState.tool.name !== 'eraser'
    ) {
      toolState.tool.setFillColor(inputFillRef?.current?.value)
    }
  }, [toolState.tool, inputFillRef])

  // reset stroke color to selected from input when changing tool from eraser
  useEffect(() => {
    if (
      inputStrokeRef?.current &&
      toolState.tool &&
      toolState.tool.name !== 'eraser'
    ) {
      toolState.tool.setStrokeColor(inputStrokeRef?.current?.value)
    }
  }, [toolState.tool, inputStrokeRef])

  return (
    <Toolbar className='z-index-1'>
      <div className='flex-center gap-20'>
        {toolbarLeftElements?.map((element) => {
          return element.id === 'colors' ? (
            <input
              className='app__header-item hover-opacity-5'
              key={element.id}
              ref={inputFillRef}
              onChange={(e) => {
                if (toolState?.tool) {
                  toolState.setFillColor(e.target.value)
                }
              }}
              type='color'
            />
          ) : (
            <button
              style={
                element.id === toolState.tool?.name ? { opacity: '.5' } : {}
              }
              onClick={element?.onClick}
              key={element.id}
              className='app__header-item hover-opacity-5'
            >
              {element.icon}
            </button>
          )
        })}
        <div className='flex-center'>
          <label htmlFor='stroke_color' className='app__header-label'>
            Цвет обводки
          </label>
          <input
            id='stroke_color'
            name='stroke_color'
            ref={inputStrokeRef}
            defaultValue={1}
            onChange={(e) => toolState.tool?.setStrokeColor(e.target.value)}
            type='color'
          />
        </div>
      </div>
      {/* <div className='flex-center gap-20'>
        {toolbarRightElements?.length > 0 && toolbarRightElements?.map((element) => {
          return (
            <button
              key={element.id}
              disabled={element?.disabled}
              onClick={element?.onClick}
              className='app__header-item hover-opacity-5'
            >
              {element.icon}
            </button>
          )
        })}
      </div> */}
    </Toolbar>
  )
})

export default HeaderList
