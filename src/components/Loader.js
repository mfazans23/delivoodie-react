import { Spinner } from 'react-bootstrap'

const Loader = ({ width, heigth }) => {
  return (
    <>
      <Spinner
        animation='border'
        role='status'
        style={{
          width: width ? width : '100px',
          height: heigth ? heigth : '100px',
          margin: 'auto',
          display: 'block',
        }}
      >
        <span className='sr-only'>Loading...</span>
      </Spinner>
    </>
  )
}

export default Loader
