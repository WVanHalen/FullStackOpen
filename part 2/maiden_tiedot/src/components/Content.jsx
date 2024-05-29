import Country from "./Country";

const Content = ({ countries, searchValue, setSearchValue }) => {
  let searched = [];

  if (searchValue.length > 0) {
    searched = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    );
    console.log(searched);
  }

  if (searched.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (
    (searched.length > 1 && searched.length < 11) ||
    searched.length === 0
  ) {
    return (
      <div>
        {searched.map((country) => (
          <p key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => setSearchValue(country.name.common)}>
              show
            </button>
          </p>
        ))}
      </div>
    );
  } else {
    return <Country country={searched[0]} />;
  }
};

export default Content;
