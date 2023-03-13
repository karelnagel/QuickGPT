import { useEffect, useState } from "react";
import { z } from "zod";
import { getServerUrl } from "../helpers";

const Person = z.object({
  id: z.string(),
  name: z.string(),
  prompt: z.string().optional(),
  image: z.string().url().optional(),
  type: z.string(),
});
type Person = z.infer<typeof Person>;
export const usePeople = () => {
  const [people, setPeople] = useState<{ [type: string]: Person[] }>();
  useEffect(
    () =>
      void fetch(`${getServerUrl()}/people`)
        .then((res) => res.json())
        .then((data: Person[]) => {
          const grouped = data.reduce((acc, person) => {
            acc[person.type] = acc[person.type] || [];
            acc[person.type].push(person);
            return acc;
          }, {} as Record<string, Person[]>);
          setPeople(grouped);
        }),
    []
  );
  return people;
};
