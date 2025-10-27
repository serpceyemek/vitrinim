import { useNavigate, useParams } from "react-router-dom";
import { postingTree } from "../data/postingTree";

function buildKey(...parts) {
  return parts.filter(Boolean).join("/");
}

export default function NewListingStep() {
  const navigate = useNavigate();
  const { slug1, slug2, slug3 } = useParams();
  const key = buildKey(slug1, slug2, slug3);

  const node = postingTree[key];
  if (!node) {
    // Burayı düzelttik: artık /ilan-ver yerine /magaza yönlendiriyor
    navigate("/magaza", { replace: true });
    return null;
  }

  const goDeeper = (childSlug) => {
    const nextKey = buildKey(slug1, slug2, slug3, childSlug);
    const hasMore = postingTree[nextKey];
    navigate(hasMore ? `/ilan-ver/${nextKey}` : `/ilan-ver/form?path=${nextKey}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">{node.title}</h1>
      <ul className="space-y-2">
        {node.children?.map((child) => (
          <li key={child.slug}>
            <button
              onClick={() => goDeeper(child.slug)}
              className="w-full text-left px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              {child.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
