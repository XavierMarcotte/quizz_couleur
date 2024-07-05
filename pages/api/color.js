import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const colors = [
    "Bleu",
    "Noir",
    "Rouge",
    "Blanc",
    "Marron",
    "Vert",
    "Gris",
    "Rose",
    "Jaune",
    "Orange",
    "Violet",
  ];
  function randomNumber(n) {
    return Math.floor(Math.random() * n);
  }
  const getRandomNumber = randomNumber(colors.length);
  const colorName = colors[getRandomNumber];

  try {
    const user = await prisma.color.findMany({
      where: {
        main: colorName,
      },
    });
    const selectedColors = [];
    const usedIndices = new Set();
    while (selectedColors.length < 4) {
      const randomColorIndex = randomNumber(user.length);
      if (!usedIndices.has(randomColorIndex)) {
        usedIndices.add(randomColorIndex);
        selectedColors.push(user[randomColorIndex]);
      }
    }
    res.status(200).json(selectedColors);
    console.log("Envoie ressi depuis la bdd");
  } catch (error) {
    console.error("Erreur d'accès à la base de données.", error);
    res.status(500).json({
      error: "Erreur d'accès à la base de données.",
    });
  } finally {
    await prisma.$disconnect();
  }
}
