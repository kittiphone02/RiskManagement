import axios from "axios";
import { API_URI } from "../constants/config";

export const getMeasureByCalculate = async (likelihood, impact) =>
  await axios
    .get(`${API_URI}/api/measures/calculate/${likelihood}/${impact}`)
    .then((res) => res.data)
    .catch((err) => err.data);

export const getRegisterId = async (year) =>
  await axios
    .get(`${API_URI}/api/register/generateId/${year}`)
    .then((res) => res.data)
    .catch((err) => err.data);
