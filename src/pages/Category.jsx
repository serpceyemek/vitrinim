import { SEED_LISTINGS, normalizeListing } from "../data/listings.js";
import { categories, findCategoryByPath, getBreadcrumbByPath } from "../data/categories.js";
import { getLocalListings } from "../services/localListings.js";



export default function Category() {
  const { slug } = useParams();
  const location = useLocation();

  const match = useMemo(() => {
    const fromState = location.state?.categoryPath ?? null;
    if (fromState) return findCategoryByPath(fromState);
    if (!slug) return null;
    return findCategoryByPath(slug);
  }, [slug, location.state]);

  const breadcrumb = useMemo(() => {
    return match ? getBreadcrumbByPath(match.path ?? match.slug ?? match.id) : [];
  }, [match]);

  const items = useMemo(() => {
    if (!match) return [];
    const path = String(match.path ?? match.slug ?? match.id);
    const pool = [...SEED_LISTINGS, ...getLocalListings()];
    return pool
      .filter((l) => {
        if (String(l.categoryId) === path) return true;
        return Array.isArray(l.categoryPath) && l.categoryPath.map(String).includes(path);
      })
      .map(normalizeListing);
  }, [match]);

  if (!match) {
    return <div className="container" style={{ padding: "24px 0" }}>Kategori bulunamadı.</div>;
  }

  return (
    <div className="container" style={{ padding: "24px 0" }}>
      <div style={{ margin: "0 0 16px" }}>
        <Link to="/categories">Kategoriler</Link>
        {breadcrumb.length > 0 && " > "}
        {breadcrumb.map((c, i) => (
          <span key={c.id}>
            {i > 0 && " > "}
            {c.name}
          </span>
        ))}
      </div>

      <h2 style={{ margin: "0 0 16px" }}>{match.name}</h2>

      {items.length === 0 ? (
        <div>Bu kategoriye ait ilan bulunamadı.</div>
      ) : (
        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {items.map((it) => (
            <ListingCard key={it.id} {...it} />
          ))}
        </div>
      )}
    </div>
  );
}
