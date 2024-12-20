interface Props {
  width?: string
  height?: string
  fill?: string
}

const Rect = (props: Props) => {
  const { width = '25', height = '25', fill = 'black' } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 25 25'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M0 3.125C0 2.2962 0.32924 1.50134 0.915291 0.915291C1.50134 0.32924 2.2962 0 3.125 0L21.875 0C22.7038 0 23.4987 0.32924 24.0847 0.915291C24.6708 1.50134 25 2.2962 25 3.125V21.875C25 22.7038 24.6708 23.4987 24.0847 24.0847C23.4987 24.6708 22.7038 25 21.875 25H3.125C2.2962 25 1.50134 24.6708 0.915291 24.0847C0.32924 23.4987 0 22.7038 0 21.875V3.125Z'
        fill={fill}
      />
    </svg>
  )
}

export default Rect
