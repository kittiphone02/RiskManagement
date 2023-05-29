import axios from "axios";
import { API_URI } from "../constants/config";

export const get1stLineReport = async (body) =>
  await axios
    .post(`${API_URI}/api/reports/1st`, body)
    .then((res) => res.data.data)
    .catch((_) => []);

export const get1stLineReportByYear = async (year) =>
  await axios
    .get(`${API_URI}/api/reports/1st/year/${year}`)
    .then((res) => res.data.data)
    .catch((_) => []);

export const get1stLineReportByDivision = async (year, division) =>
  await axios
    .get(`${API_URI}/api/reports/1st/division/${year}/${division}`)
    .then((res) => res.data.data)
    .catch((_) => []);
