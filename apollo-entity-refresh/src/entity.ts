import {
  DocumentNode,
  FragmentDefinitionNode,
  Kind,
  OperationDefinitionNode,
  OperationTypeNode,
  SelectionSetNode,
} from "graphql";

export type Entity = {
  __typename: string;
  id: string | number;
};

export type UnregisterFunc = () => void;

export class EntitySelectionCache {
  private readonly cache = new Map<any, Set<SelectionSetNode>>();

  /**
   * Registers selections for all entities in {@link data}.
   *
   * Time complexity is O(N) where N is the size of {@link data}.
   * @param query
   * @param data
   * @returns
   */
  registerEntitySelections(query: DocumentNode, data: any): UnregisterFunc {
    const unregister = () => {};

    if (data !== null && data !== undefined) {
      const { queryOperation, fragmentsByName } =
        getQueryOperationAndFragments(query);
    }
    // recurse over `data`
    // if it's an object, check if an id exists.
    // if an id exists, register the selections
    // keep walking

    return unregister;
  }

  /**
   * Returns all selections which are currently registered for {@link entity}.
   *
   * Time complexity is O(N) where N is the number of registered selections.
   * @param entity
   * @returns
   */
  resolveEntitySelections(entity: Entity): SelectionSetNode[] {
    if (this.cache.has(entity)) {
      return Array.from(this.cache.get(entity)!);
    }
    return [];
  }
}

/**
 * Locates the query operation and fragments.
 *
 * Throws an error if more than one query operation is defined.
 * @param query
 */
function getQueryOperationAndFragments(query: DocumentNode): {
  queryOperation: OperationDefinitionNode | undefined;
  fragmentsByName: Map<string, FragmentDefinitionNode>;
} {
  const fragmentsByName = new Map<string, FragmentDefinitionNode>();
  let queryOperation: OperationDefinitionNode | undefined;

  for (const def of query.definitions) {
    switch (def.kind) {
      case Kind.FRAGMENT_DEFINITION:
        fragmentsByName.set(def.name.value, def);
        break;

      case Kind.OPERATION_DEFINITION:
        switch (def.operation) {
          case OperationTypeNode.QUERY:
            if (queryOperation !== undefined) {
              throw new Error("Multiple query operations are not supported");
            }
            queryOperation = def;
            break;
        }
        break;
    }
  }

  return { queryOperation, fragmentsByName };
}
