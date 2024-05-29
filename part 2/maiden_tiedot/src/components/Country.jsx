import Weather from "./Weather";

const Country = ({ country }) => {
  let kielet = Object.keys(country.languages);

  console.log(kielet);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        {kielet.map((kieli) => (
          <li key={country.languages[kieli]}>{country.languages[kieli]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital}</h2>
      <Weather
        lat={country.capitalInfo.latlng[0]}
        lon={country.capitalInfo.latlng[1]}
      />
    </div>
  );
};

export default Country;
