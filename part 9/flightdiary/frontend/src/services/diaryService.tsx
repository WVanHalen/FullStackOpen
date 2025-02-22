import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

export const getDiaryEntries = () => {
  return axios
    .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
    .then((response) => response.data);
};

export const createEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>("http://localhost:3000/api/diaries", object)
    .then((response) => response.data);
};
