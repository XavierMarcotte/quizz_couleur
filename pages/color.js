"use client";
import Header from "./header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Name() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [randomColorName, setRandomColorName] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  async function fetchColors() {
    try {
      const response = await axios.get("/api/color");
      setSelectedColors(response.data);
    } catch (error) {
      console.error("Erreur pour charger les couleurs:", error);
    }
  }

  function getRandomColorName() {
    const randomIndex = Math.floor(Math.random() * selectedColors.length);
    setRandomColorName(selectedColors[randomIndex].name);
    setMessage("");
    setMessageType("");
  }

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    if (selectedColors.length > 0) {
      getRandomColorName();
    }
  }, [selectedColors]);

  function handleColorClick(color) {
    if (color.name === randomColorName) {
      setMessage("Correcte! Vous avez trouvé la bonne couleur.");
      setMessageType("succes");
    } else {
      setMessage(`Faux. Vous avez sélectionné : ${color.name}.`);
      setMessageType("erreur");
    }
  }

  return (
    <>
      <Header />
      <section className="flex m-auto w-1/2 flex-col max-md:w-2/3">
        <div className="m-auto">
          <p>Quelle est la couleur associée à ce nom:</p>
          {randomColorName && (
            <p className="text-xl font-bold text-center">{randomColorName}</p>
          )}
        </div>
        <div className="grid grid-rows-2 grid-cols-2 mt-8 h-32">
          {selectedColors.map((color, index) => (
            <button
              className="border-2 border-black rounded-2xl w-4/5 m-auto h-4/5"
              key={index}
              onClick={() => handleColorClick(color)}
              style={{ backgroundColor: color.hue }}
            ></button>
          ))}
        </div>
        {message && (
          <p
            className={`mt-4 text-center ${
              messageType === "succes" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <button
          className="my-12"
          type="button"
          onClick={() => window.location.reload()}
        >
          Une autre ?
        </button>
      </section>
    </>
  );
}
