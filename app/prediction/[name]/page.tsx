import type { NextApiRequest, NextApiResponse } from 'next';

interface Person {
  age: number;
  gender: string;
  country: string;
}

interface PageProps {
  params: { name: string };
}

const getPersonData = async (name: string): Promise<Person> => {
  // Using relative URL for the fetch request
  const res = await fetch(`/api/person?name=${name}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch person data: ${res.statusText}`);
  }
  return await res.json();
};

export default async function page({ params }: PageProps) {
  try {
    // Make sure params.name is available before using it
    const person = await getPersonData(params.name);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Personal Info</h1>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          <p className="text-lg font-semibold text-gray-800">
            <span className="text-blue-500">Name:</span> {params.name || "N/A"}
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-4">
            <span className="text-blue-500">Age:</span> {person.age || "N/A"}
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-4">
            <span className="text-blue-500">Gender:</span> {person.gender || "N/A"}
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-4">
            <span className="text-blue-500">Country:</span> {person.country || "N/A"}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops!</h2>
          <p className="text-lg text-gray-700 bg-white shadow-lg rounded-lg p-4 border border-red-300">
            Failed to load data. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
