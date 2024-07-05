"use client";
import Header from "./header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Name() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [randomColor, setRandomColor] = useState(null);
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

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * selectedColors.length);
    setRandomColor(selectedColors[randomIndex]);
    setMessage("");
    setMessageType("");
  }

  useEffect(() => {
    fetchColors();
  }, []);

  useEffect(() => {
    getRandomColor();
  }, [selectedColors]);

  function handleColorClick(color) {
    if (color.name === randomColor.name) {
      setMessage("Correcte! Vous avez trouvé la bonne couleur.");
      setMessageType("succes");
    } else {
      setMessage(`Faux, ce n'est pas la bonne couleur..`);
      setMessageType("erreur");
    }
  }

  return (
    <>
      <Header />
      <section className="flex m-auto w-1/2 flex-col">
        <div className="m-auto">
          <p>Quel est le nom de cette couleur :</p>
          {randomColor && (
            <div
              className="w-40 h-20 m-auto my-2 border-2 border-black"
              style={{ backgroundColor: randomColor.hue }}
            ></div>
          )}
        </div>
        <div className="grid grid-rows-2 grid-cols-2 mt-8 h-32">
          {selectedColors.map((color, index) => (
            <button
              className="border-2 border-black rounded-2xl w-4/5 m-auto h-4/5"
              key={index}
              onClick={() => handleColorClick(color)}
            >
              {color.name}
            </button>
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
