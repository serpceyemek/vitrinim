import { useParams } from "react-router-dom";

export default function CategoryPage() {
  const { name } = useParams();

  return (
    <section className="p-6 text-center">
      <h1 className="text-3xl font-bold text-gray-800 capitalize mb-4">
        {name.replace("-", " ")}
      </h1>
      <p className="text-gray-600">
        {name.replace("-", " ")} kategorisindeki ilanlar burada görüntülenecek.
      </p>
    </section>
  );
}
