import Link from "next/link";
export default function Header() {
  return (
    <section className="my-8 mx-auto text-center">
      <Link className="text-3xl" href="/">
        Quizz de couleur
      </Link>
      <div className="flex justify-evenly my-32 max-md:flex max-md:flex-col max-md:mx-4 max-">
        <Link
          className="text-xl border-2 border-black p-4 rounded-2xl max-md:text-base max-md:my-4"
          href="/name"
        >
          Devinez le nom de la couleur
        </Link>
        <Link
          className="text-xl border-2 border-black p-4 rounded-2xl max-md:text-base max-md:my-4"
          href="/color"
        >
          Devinez la couleur à partir du nom
        </Link>
      </div>
    </section>
  );
}
