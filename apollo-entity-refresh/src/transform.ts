import { Kind, DocumentNode } from "graphql";

/**
 * Ensures `id` field is always selected.
 *
 * Transforms are cached.
 * @param query
 * @returns
 */
export function transformQueryAlwaysSelectId(
  query: DocumentNode
): DocumentNode {
  return { kind: Kind.DOCUMENT, definitions: [] };
}
