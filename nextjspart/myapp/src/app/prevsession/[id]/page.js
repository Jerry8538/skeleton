'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PolarityGraph from '@/app/compos/polaritygraph';
import { getJSONById, getPolarityById, getSummaryById } from '@/app/accessFirebase';


export default function Dashboard() {
  const { id } = useParams();
  const idint = Number(id);
      console.log(id);

  const [polarity, setPolarity] = useState([]);
  const [summary, setSummary] = useState("")
  const [json, setJsonData] = useState("");

  async function fetchData(id) {
    try {
      const jsonData = await getJSONById(idint);
      const polarityData = await getPolarityById(idint);
      const summaryData = await getSummaryById(idint);
      setPolarity(polarityData || []);
      setSummary(summaryData || "No summary available");
      setJsonData(jsonData || "No JSON data available");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


    useEffect(() => {
      if(idint){
        fetchData(idint);}
        
    }, [idint])

  /*useEffect(() => {
    // Fetch Firebase data asynchronously
    const fetchData = async () => {
      const json = await getJSONById(id);
      const polarityData = await getPolarityById(id);
      const summary = await getSummaryById(id);

      setJsonData(json);
      setPolarity(polarityData);
      setSummary(summary);
    };*/

     // Dependency array includes `id` to refetch when `id` changes

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-gray-800 text-white py-4 text-center">
        <h1 className="text-2xl font-bold">Session Dashboard</h1>
      </header>

      <div className="flex mt-4">
        <div className="bg-gray-800 flex-1 m-2 p-4 rounded-lg shadow-lg">
          <h2 className="font-semibold">Polarity</h2>
          <p>See how the sentiment of the user changes over the whole interaction</p>
          <div className="mt-4">
            <div className="flex justify-center space-x-4">
              <PolarityGraph polarity={polarity} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 mt-4 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">Summary of Session {id}</h3>
        <p>{summary}</p>
      </div>

      <div className="bg-gray-700 mt-4 p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">Raw JSON Data of Session {id}:</h3>
        <p>{json}</p>
      </div>
    </div>
  );
}
