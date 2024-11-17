import './style.scss'

interface Props extends React.ComponentProps<'div'> {}

const Toolbar = (props: Props) => {
  const { children, className } = props
  return (
    <div className={`toolbar ${className}`}>
      <div className='toolbar__wrapper'>{children}</div>
    </div>
  )
}

export default Toolbar
