import { v4 as uuidv4 } from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "../types/types";

export const setAlert =
  (title, msg, color, timeout = 5000) =>
  (dispatch) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { title, msg, color, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

export const closeAlert = (id) => (dispatch) =>
  dispatch({ type: REMOVE_ALERT, payload: id });
