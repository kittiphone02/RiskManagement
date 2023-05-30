// import { setAlert } from "../redux/actions/alert";
// import { hideLoading } from "react-redux-loading-bar";

// export const errorHandler = (error, dispatch, type) => {
//   //   console.log(JSON.stringify(error.response));
//   if (error.message === "Network Error") {
//     // console.log(error.message)
//     dispatch(setAlert("Error", error.message, "red", 15000));
//   }

//   if (error.response) {
//     // console.log(error.response.data);
//     dispatch(setAlert("Error", error.response.data.error, "red", 15000));
//   }

//   if (type) {
//     // dispatch({
//     //   type: type,
//     //   payload: error.response ? error.response.data.error : error.message,
//     // });
//   }

//   dispatch(hideLoading());
// };
