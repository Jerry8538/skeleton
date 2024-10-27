'use client' 

import PolarityGraph from '../compos/polaritygraph.js';
import ComponentAnalysis from './graph.js'
import Navbar from '../compos/navbar.js'
import { useEffect, useState } from 'react';
import { getAvgPolarities, getFinalSummary } from '../accessFirebase.js';

const polarities = await getAvgPolarities()
console.log(polarities)

const summary = await getFinalSummary()

export default function ProgressPage() {

    const [polarity, setPolarity] = useState([]);

    useEffect(() => {
        setPolarity(polarities);
    }, [])
    return (
        <div style={{ backgroundColor: 'black', color: 'white', height: '1000vh' }}>
            <Navbar style={{ position: 'absolute', top: 0, left: 0 }} />
            <div style={{ padding: '10px' }}>
            <h1 style={{ color: 'cyan', fontSize: '2em' }}><center>Your Progress</center></h1>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    <PolarityGraph polarity={polarity}/>
                </div>
                <div style={{ flex: 1, padding: '20px', color: 'white' }}>
                    <h2>Summary</h2>
                    </div>
                    {summary}
                    </div>
            </div>
        </div>
    );
}