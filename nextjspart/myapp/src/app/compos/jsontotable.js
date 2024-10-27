import React from 'react';

export default function JsonTable({ jsonData }) {
  // Parse JSON string into an object if it's a string
  const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Category</th>
            <th className="px-4 py-2 border-b">Keyword</th>
            <th className="px-4 py-2 border-b">Intensity</th>
            <th className="px-4 py-2 border-b">Polarity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([category, entries]) =>
            entries.length > 0 ? (
              entries.map((entry, index) => (
                <tr key={`${category}-${index}`}>
                  <td className="border px-4 py-2">{index === 0 ? category : ''}</td>
                  <td className="border px-4 py-2">{entry.keyword}</td>
                  <td className="border px-4 py-2">{entry.intensity}</td>
                  <td className="border px-4 py-2">{entry.polarity}</td>
                </tr>
              ))
            ) : (
              <tr key={category}>
                <td className="border px-4 py-2">{category}</td>
                <td className="border px-4 py-2" colSpan="3">No data available</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
