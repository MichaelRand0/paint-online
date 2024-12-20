interface Props {
  width?: string
  height?: string
  fill?: string
  className?: string
}

const Arrow = (props: Props) => {
  const { width = '25', height = '25', fill = 'black', className } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 25 25'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M7.8125 9.61538H17.1875C19.7719 9.61538 21.875 12.2038 21.875 15.3846C21.875 18.5654 19.7719 21.1538 17.1875 21.1538H12.5V25H17.1875C21.4953 25 25 20.6865 25 15.3846C25 10.0827 21.4953 5.76923 17.1875 5.76923H7.8125V0L0 7.69231L7.8125 15.3846V9.61538Z'
        fill={fill}
      />
    </svg>
  )
}

export default Arrow
