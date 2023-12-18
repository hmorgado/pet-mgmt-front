import "./App.css";
import { useState, useEffect } from "react";


function getPets(){
  return fetch(
      `http://localhost:8080/rest/pets`
    ).then((response) => response.json())
}

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    getPets().then(setData);
  }, []);
  

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/rest/pets/${id}`, { method: 'DELETE', mode: 'cors' })
    const data = await getPets()
    setData(data)
  }

  if (data) {
    return(
      <div className="Pet">
      {data.map((pet) => (
        <h1 key={pet.id}>{pet.id} {pet.name} 
          <button onClick={() => handleDelete(pet.id)}>
          delete
          </button>
        </h1>
      ))}
    </div>
    )
  }
  return <h1>Kitties</h1>;
}

export default App;
