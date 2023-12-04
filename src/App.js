import "./App.css";
import { useState } from "react";


function App() {

  const [data, setData] = useState(null);

  useState(() => {
    getData();
  }, data);

  function getData(){
    fetch(
      `http://localhost:8080/rest/pets`
    )
    .then((response) => response.json())
    .then(setData);
  }
  

  const handleDelete = (id) => () => {
    fetch(`http://localhost:8080/rest/pets/${id}`, { method: 'DELETE', mode: 'cors' })
    .then(getData())
    .then(setData);
  }

  if (data) {
    return(
      <div className="Pet">
      {data.map((pet) => (
        <h1 key={pet.id}>{pet.id} {pet.name} 
          <button onClick={handleDelete(pet.id)}>
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
