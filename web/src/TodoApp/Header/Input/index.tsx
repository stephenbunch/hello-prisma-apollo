import { KeyboardEvent, useCallback, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Key } from "ts-key-enum";
import { EntityCacheKey } from "../../../entity-cache";
import { useGraphQLClient } from "../../../graphql-client";

export function Input() {
  const queryClient = useQueryClient();
  const { CreateTodo } = useGraphQLClient();
  const { mutateAsync: createTodo } = useMutation(CreateTodo);

  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown = useCallback(
    async (e: KeyboardEvent) => {
      if (e.key === Key.Enter && value !== "") {
        setLoading(true);
        try {
          await createTodo({ input: { description: value } });
          await queryClient.invalidateQueries(EntityCacheKey.Todos);
          setValue("");
        } finally {
          setLoading(false);
          inputRef.current?.focus();
        }
      }
    },
    [value, createTodo, queryClient]
  );

  return (
    <input
      ref={inputRef}
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyDown={onKeyDown}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={loading}
      autoFocus
    />
  );
}
