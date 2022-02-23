import { useSelector } from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";

const Alert = () => {
  const alert = useSelector((state) => state.alertReducer);

  return (
    <div className="loading">
      {alert.loading && <Loading />}
      {alert.errors && <Toast body={alert?.errors} title="Error" />}
      {alert.success && <Toast body={alert?.success} />}
    </div>
  );
};

export default Alert;
