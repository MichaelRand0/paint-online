export type ToolType = {
    canvas: HTMLCanvasElement
    name: string
    setFillColor: (color: string) => void
    setStrokeColor: (color: string) => void
    setLineWidth: (width: number) => void
} | null