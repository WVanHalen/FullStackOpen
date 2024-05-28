const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        <li>Tähän</li>
        <li>pitäis</li>
        <li>saaha</li>
        <li>jotenki</li>
        <li>kielet</li>
        <li>näkymään!</li>
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

export default Country;
