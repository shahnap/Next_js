import type { NextApiRequest, NextApiResponse } from 'next';

interface Person {
  name: string;
  age: number;
  gender: string;
  country: string;
}

const peopleData: Person[] = [
  { name: "John", age: 30, gender: "male", country: "US" },
  { name: "Alice", age: 25, gender: "female", country: "UK" },
  { name: "Raj", age: 35, gender: "male", country: "IN" },
  { name: "Sophia", age: 28, gender: "female", country: "FR" },
  { name: "Ahmed", age: 40, gender: "male", country: "AE" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  const { name } = req.query;

  // Ensure name is a string
  if (typeof name !== 'string') {
    res.status(400).json({ error: "Invalid name parameter" });
    return;
  }

  // Search for the person by name (case-insensitive)
  const person = peopleData.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );

  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json({ error: "Person not found" });
  }
}
