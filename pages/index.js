import Header from "./header";
export default function Home() {
  return (
    <>
      <Header />
      <p className="text-center text-xl max-md:mx-6">
        Bienvenu sur le jeu pour retrouver les couleurs. Veuillez selectionner
        un des deux bouttons ci-dessus pour jouer.
      </p>
    </>
  );
}
