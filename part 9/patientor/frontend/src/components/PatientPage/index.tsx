import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { Patient } from "../../types";
import { Male, Female } from "@mui/icons-material";

const PatientPage = () => {
  const [waiting, setWaiting] = useState(true);
  const [patient, setPatient] = useState<Patient>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const patient = await patientService.getById(id);
        setPatient(patient);
        setWaiting(false);
      } catch (error) {
        console.log(error);
        setWaiting(false);
      }
    };
    fetchPatient();
  }, [id]);

  if (waiting) {
    return (
      <div>
        <h2>Loading patient data...</h2>
      </div>
    );
  }

  if (!patient) {
    return (
      <div>
        <h2>Patient not found</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === "male" && <Male />}
        {patient.gender === "female" && <Female />}
      </h2>
      <div>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    </div>
  );
};

export default PatientPage;
