import { getTopic } from "@/lib/catalog-metadata";

export function TopicTags({ ids }: { ids: readonly string[] }) {
  return (
    <ul className="topic-tags">
      {ids.map((id) => {
        const topic = getTopic(id);
        return (
          <li key={id} data-color={topic.colorToken}>
            {topic.label}
          </li>
        );
      })}
    </ul>
  );
}
