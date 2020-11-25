import React, { useState, useEffect } from "react";
import "./styles.css";
import md5 from "js-md5";

const PUBLIC_KEY = "1d9cc5c33bc9407be8b1a7634edc3bac";
const PRIVATE_KEY = "d347c10eb32fb83f7a6cb41ffe5850bbf0e69961";

function Joke() {
  const [joke, setJoke] = useState("Chiste");

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("joke") === null) {
        setJoke("Loading...");
      } else {
        setJoke(localStorage.getItem("joke"));
      }
    } else {
      const ts = Number(new Date());
      const hash = md5.create();
      hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);
      const URL = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          var objetos = Object.keys(res.data.results);
          console.log(res.data.results[objetos[0]].name);
          setJoke(res.data.results[objetos[0]].name);
          localStorage.setItem("Avenger", res.data.results[objetos[0]].name);
        });
    }
  }, []);

  return (
    <div>
      <h1>First marvel hero alphabetically</h1>
      <h2>{joke}</h2>
    </div>
  );
}

export default Joke;
