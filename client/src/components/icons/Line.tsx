interface Props {
  width?: string
  height?: string
  fill?: string
}

const Line = (props: Props) => {
  const { width = '25', height = '25', fill = 'black' } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 22 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M19.1274 0.158655L0.193206 15.7068C0.0869428 15.7941 0.0951929 15.9814 0.21154 16.1231L1.69232 17.9263C1.80866 18.068 1.9908 18.1126 2.09706 18.0253L21.0313 2.47713C21.1375 2.38987 21.1293 2.20255 21.0129 2.06087L19.5322 0.257609C19.4158 0.115924 19.2337 0.0713948 19.1274 0.158655Z'
        fill={fill}
      />
    </svg>
  )
}

export default Line
