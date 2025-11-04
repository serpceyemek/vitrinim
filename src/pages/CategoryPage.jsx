// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTaxonomy } from "../data/fetchTaxonomy";
import { ChevronRight } from "lucide-react";

export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [taxonomy, setTaxonomy] = useState({});
  const [children, setChildren] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchTaxonomy();
      setTaxonomy(data);
      if (data[slug]) setChildren(data[slug].children || []);
    }
    load();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <h2 className="text-lg font-semibold mb-4 capitalize">
        {taxonomy[slug]?.title || slug}
      </h2>

      {children.length === 0 ? (
        <p className="text-gray-500 text-sm">Bu kategoride alt başlık bulunmuyor.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {children.map((item) => (
            <li
              key={item.slug}
              onClick={() => navigate(`/kategori/${item.slug.split("/").pop()}`)}
              className="flex justify-between items-center p-3 bg-white border rounded-xl shadow hover:shadow-md transition cursor-pointer"
            >
              <span className="text-gray-800 font-medium capitalize">{item.title}</span>
              <ChevronRight size={18} className="text-gray-400" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
