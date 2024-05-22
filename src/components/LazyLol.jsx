import { useEffect, useRef, useState } from "react";

const LazyLol = () => {
  const [inputValue, setInputValue] = useState("");
  const [sampleData, setSampleData] = useState();
  const [userData, setUserData] = useState();
  const inputRef = useRef();

  const API_URL = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;

  useEffect(() => {
    const SAMPLE_URL = `https://pokeapi.co/api/v2/pokemon/`;
    fetch(SAMPLE_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const pokiData = data.results;
        pokiData.splice(0, 8);
        setSampleData(pokiData);
      })
      .catch((err) => console.log(err));
    //for InputRef
    inputRef.current.focus();
  }, []);

  const getData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setUserData(data);
    console.log(data);
  };

  return (
    <>
      <section>
        <h1>FETCH</h1>
        <h3>Sample Data:</h3>
        {sampleData && (
          <div id="data-holder">
            {sampleData.map((data, index) => (
              <span key={index}>{data.name}</span>
            ))}
          </div>
        )}
        <div>
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={getData} disabled={!inputValue}>
            Get Data
          </button>
        </div>
        <div>
          <h3>Your Data:</h3>
          {userData && (
            <div className="card">
              <h2>{userData.name.toUpperCase()}</h2>
              <img
                src={userData.sprites.front_default}
                alt={userData.name}
                width={150}
                height={110}
              />
              <div>
                <span>
                  <b>Ability:</b> {userData?.abilities[0].ability.name}
                </span>
              </div>
              <div>
                <span>
                  <b>Experience:</b> {userData.base_experience}
                </span>
              </div>
              <div>
                <span>
                  <b>Weight:</b> {userData.weight}
                </span>
              </div>
              <div>
                <span>
                  <b>Type:</b> {userData.types[0].type.name}
                </span>
              </div>
              <div>
                <span>
                  <b>Moves:</b>
                </span>
                {userData.moves.slice(0, 3).map((item, index) => (
                  <div key={index}>{item.move.name},</div>
                ))}
              </div>
            </div>
          )}
          <br />
          {!userData && <p>No Pokemon Data yet</p>}
        </div>
      </section>
    </>
  );
};

export default LazyLol;

// fetch => used for making HTTP requests
//step 1: fetch("http//.com")
//step 2: attach .then & .catch for response result
//2:=> fetch("")  .then(res=> con.log(Res))  .catch(err=>con.log(err))
//in step 2: gives {Response {type, body,ok ....}}
//step 3: to get proper data => JSON() like this
// =>   fetch(API_URL)    .then((res) => res.json())    .then((data) => console.log(data))    .catch((err) => console.log(err));
