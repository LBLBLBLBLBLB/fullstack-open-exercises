const CountryDetailed = ({
  selectedCountry,
  setSelectedCountry,
  showBackButton = true,
}) => {
  const backToList = () => {
    setSelectedCountry(null);
  };

  return (
    <div>
      <h2>{selectedCountry.name.common}</h2>
      <p>capital: {selectedCountry.capital}</p>
      <p>area: {selectedCountry.area}</p>
      <h4>languages</h4>
      <ul>
        {Object.values(selectedCountry.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} />
      {showBackButton && <button onClick={backToList}>Back</button>}
    </div>
  );
};

export default CountryDetailed;
