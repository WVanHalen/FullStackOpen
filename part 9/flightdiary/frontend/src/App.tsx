import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getDiaryEntries, createEntry } from "./services/diaryService";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    getDiaryEntries().then((entries) => {
      console.log(entries);
      setDiaryEntries(entries);
    });
  }, []);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({ date, visibility, weather, comment }).then((data) => {
      setDiaryEntries(diaryEntries.concat(data));
    });

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ display: "inline-block", width: "65px" }}>Date</label>
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          <label style={{ display: "inline-block", width: "65px" }}>
            Visibility
          </label>
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          <label style={{ display: "inline-block", width: "65px" }}>
            Weather
          </label>
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
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
