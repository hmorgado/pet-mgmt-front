import "./App.css";
import { useState, useEffect } from "react";


function getPets() {
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
    await fetch(`http://localhost:8080/rest/pets/${id}`,
      { method: 'DELETE', mode: 'cors' }
    )
    const data = await getPets()
    setData(data)
  }

  if (data) {
    return (
      <div className="Pet">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((pet) => (
              <tr key={pet.id}>
                <td>{pet.id}</td>
                <td>{pet.name}</td>
                <td>{pet.petType.name}</td>
                <td>
                  <button onClick={() => handleDelete(pet.id)}>
                    {"<- Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  return <h1>no kitties came back</h1>;
}

export default App;
