import "./App.css";
import { useState, useEffect } from "react";

function Pet({name}){
  return(
    <div>
      <h1>{name}</h1>
    </div>
  )
}

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(
      `http://localh.ost:8080/rest/pets`
    )
    .then((response) => {
      console.log(response)
    })
  });

 
  return(
    <div> heitor </div>
  );
}

export default App;
