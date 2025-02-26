import patientData from "../../data/patients";
import { NewPatient, NonSensitivePatient, Patient } from "../types";
import { v1 as uuid } from "uuid";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };

  patientData.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patientData.find((patient) => patient.id === id);
};

export default { getNonSensitivePatients, addPatient, getPatient };
