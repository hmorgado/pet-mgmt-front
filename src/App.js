import "./App.css";
import { useState, useEffect } from "react";
import MyForm from "./MyForm";


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

  async function getAndUpdatePetData() {
    const data = await getPets()
    setData(data)
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/rest/pets/${id}`,
      { method: 'DELETE', mode: 'cors' }
    )
    getAndUpdatePetData();
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
        <MyForm onFormSubmit={getAndUpdatePetData} />
      </div>
    )
  }
  return <h1>loading...</h1>;
}

export default App;
