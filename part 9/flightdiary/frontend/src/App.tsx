import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getDiaryEntries, createEntry } from "./services/diaryService";
import axios from "axios";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const visibilities = ["great", "good", "ok", "poor"];
  const weathers = ["sunny", "rainy", "cloudy", "stormy", "windy"];

  useEffect(() => {
    getDiaryEntries().then((entries) => {
      setDiaryEntries(entries);
    });
  }, []);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      createEntry({ date, visibility, weather, comment }).then((data) => {
        setDiaryEntries(diaryEntries.concat(data));
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data);
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        setError("Unknown error");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <>
      <h2>Add new entry</h2>
      {error && (
        <p
          style={{ color: "red", fontSize: 20, padding: 10, marginBottom: 10 }}
        >
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ display: "inline-block", width: "65px" }}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <label style={{ display: "inline-block", width: "65px" }}>
            Visibility
          </label>
          {visibilities.map((option) => (
            <span key={option}>
              <label>{option}</label>
              <input
                type="radio"
                id={option}
                name={option}
                value={option}
                checked={option === visibility}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setVisibility(event.target.value)
                }
              />
            </span>
          ))}
        </div>
        <div>
          <label style={{ display: "inline-block", width: "65px" }}>
            Weather
          </label>
          {weathers.map((option) => (
            <span key={option}>
              <label>{option}</label>
              <input
                type="radio"
                id={option}
                name={option}
                value={option}
                checked={option === weather}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setWeather(event.target.value)
                }
              />
            </span>
          ))}
        </div>
        <div>
          <label style={{ display: "inline-block", width: "65px" }}>
            Comment
          </label>
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
      <h2>Diary entries</h2>
      {diaryEntries.map((entry) => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
        </div>
      ))}
    </>
  );
}

export default App;
