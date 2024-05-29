import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Content from "./components/Content";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Efekti");
    if (countries) {
      axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
          setCountries(response.data);
          console.log(response.data);
        });
    }
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Content
        countries={countries}
        searchValue={search}
        setSearchValue={setSearch}
      />
    </div>
  );
};

export default App;
