import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import Search from "./components/Search";
import Content from "./components/Content";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("Efekti");
    if (countries)
      countriesService.getAll().then((initialCountries) => {
        setCountries(initialCountries);
      });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Search search={search} handleSearch={handleSearch} />
      <Content countries={countries} searchValue={search} />
    </div>
  );
};

export default App;
