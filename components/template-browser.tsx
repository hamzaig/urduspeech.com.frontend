"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  TemplatePicker,
  templateLabel,
  type CaptionTemplate,
} from "@/components/caption-template";

/**
 * Style step: search and category filters over the template catalog, most
 * used looks first. The chosen template stays listed even when filtered out.
 */
export function TemplateBrowser({
  templates,
  value,
  onChange,
  name,
}: {
  templates: readonly CaptionTemplate[];
  value: string | null;
  onChange: (id: string | null) => void;
  name: string;
}) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("All");
  const categories = useMemo(() => {
    const seen = new Set<string>();
    for (const t of templates) if (t.category) seen.add(t.category);
    return ["All", ...seen];
  }, [templates]);
  const needle = query.trim().toLowerCase();
  const shown = templates.filter(
    (t) =>
      t.id === value ||
      ((category === "All" || t.category === category) &&
        (!needle ||
          templateLabel(t).toLowerCase().includes(needle) ||
          (t.category ?? "").toLowerCase().includes(needle))),
  );
  return (
    <div className="template-browser">
      <div className="font-tools">
        <label className="font-search">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={query}
            placeholder={`Search ${templates.length} styles`}
            aria-label="Search styles"
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="font-chips" role="group" aria-label="Style type">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className="font-chip"
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <TemplatePicker
        templates={shown}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
}
