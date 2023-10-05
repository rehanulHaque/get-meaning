import { useState } from "react";
import MeanningComp from './Components/MeaningComp'
import ErrorComp from "./Components/ErrorComp";


function App() {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [definition, setDefinition] = useState([]);

  const getMeaning = async (text) => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
    );
    const data = await response.json();
    if (response.ok) {
      setError('')
      setDefinition(data[0].meanings[0].definitions);
    } else {
      setDefinition([])
      setError(data.message);
    }
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    getMeaning(word);
  };
  return (
    <>
      <div className="p-4">
        <div>
          <h1 className="text-2xl mb-3 font-bold">Get Meanings of word</h1>
          <form onSubmit={handelSubmit}>
            <input
              type="text"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="border border-black rounded-md px-3 py-1"
            />
            <button className="px-4 py-1 font-bold rounded-md bg-slate-500 ml-3 text-white">Get</button>
          </form>
        </div>
        <div>
          <h2 className="font-semibold text-lg mb-3">Meanings: </h2>
          {definition &&
            definition.map((text, id) => {
              return <MeanningComp key={id} {...text}/>;
            })}
          {error && <ErrorComp error={error}/>}
        </div>
      </div>
    </>
  );
}

export default App;
