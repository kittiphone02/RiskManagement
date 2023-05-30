import { toast } from "react-toastify";
import { hideLoading } from "react-redux-loading-bar";

export const errorHandler = (error, dispatch, type) => {
  if (error.message === "Network Error") {
    toast.error("Network error");
  }

  if (error.response) {
    toast.error(error.response.data.error);
  }

  if (type) {
    // Uncomment and modify this block if you have specific actions to dispatch
    // dispatch({
    //   type: type,
    //   payload: error.response ? error.response.data.error : error.message,
    // });
  }

  dispatch(hideLoading());
};
