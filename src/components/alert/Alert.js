import { useSelector } from 'react-redux'
import "./alert.scss"
import Loading from './Loading'
import Toast from './Toast'

export const Alert = () => {
  const { alertReducer } = useSelector(state => state)

  return (
    <div>
      {alertReducer.loading && <Loading />}

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

export const showErrMsg = (msg) => {
  return <div className="errMsg">{msg}</div>
}

export const showSuccessMsg = (msg) => {
  return <div className="successMsg">{msg}</div>
}

