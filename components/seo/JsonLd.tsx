type JsonLdData = Record<string, unknown> | null | undefined;

/**
 * Renders one or more JSON-LD blocks. `<` is escaped so data can never close
 * the script tag early (per the Next.js JSON-LD guide). Null entries are
 * skipped, which lets builders like videoObjectSchema opt out.
 */
export default function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const items = (Array.isArray(data) ? data : [data]).filter((item): item is Record<string, unknown> => Boolean(item));
  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
