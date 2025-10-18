// src/components/BreadcrumbPath.jsx
import React from "react";

export default function BreadcrumbPath({
  rootLabel = "İlan Ver",
  category,
  subCategory,
  onRoot,
  onCategory,
}) {
  const catLabel = category?.title || category?.name;
  const subLabel = subCategory?.title || subCategory?.name;

  return (
    <nav className="mx-auto mb-3 flex max-w-2xl items-center gap-2 text-sm text-gray-600">
      <button
        onClick={onRoot}
        className="rounded-md px-2 py-1 hover:bg-gray-100 font-medium"
      >
        {rootLabel}
      </button>
      {catLabel && <span>›</span>}
      {catLabel && (
        <button
          onClick={onCategory}
          className="rounded-md px-2 py-1 hover:bg-gray-100"
        >
          {catLabel}
        </button>
      )}
      {subLabel && <span>›</span>}
      {subLabel && (
        <span className="rounded-md px-2 py-1 bg-gray-100 text-gray-700">
          {subLabel}
        </span>
      )}
    </nav>
  );
}
