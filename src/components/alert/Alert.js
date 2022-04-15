import { useSelector } from 'react-redux'

import Loading from './Loading'
import Toast from './Toast'

const Alert = () => {
  const { alertReducer } = useSelector(state => state)

  return (
    <div>
      { alertReducer.loading && <Loading /> }

      { 
        alertReducer.errors && 
        <Toast 
        title="Errors"
        body={alertReducer.errors}
        bgColor="bg-danger"
        />
      }

      { 
        alertReducer.success && 
        <Toast 
        title="Success"
        body={alertReducer.success}
        bgColor="bg-success"
        />
      }
    </div>
  )
}

export default Alert