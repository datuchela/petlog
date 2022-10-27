const Pet = ({ pet }) => {
  const {
    id,
    petID,
    name,
    gender,
    birthday,
    weight,
    lastVaccinated,
    nextVaccination,
  } = pet;
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-4">
        <p className="font-medium">🐶petID:</p>
        <p className="font-medium">🎂birthday:</p>
        <p className="font-medium">♂️♀gender:</p>
        <p className="font-medium">⚖weight:</p>
        <p className="font-medium">💉last vaccinated:</p>
        <p className="font-medium">💉next vaccination:</p>
      </div>
      <div className="flex flex-col gap-4">
        <p>{petID}</p>
        <p>{birthday}</p>
        <p>{gender}</p>
        <p>{weight}kg</p>
        <p>{lastVaccinated}</p>
        <p>{nextVaccination}</p>
      </div>
    </div>
  );
};

export default Pet;
