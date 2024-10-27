'use client' 
import ComponentAnalysis from './graph.js'
import Navbar from '../compos/navbar.js'
import { useEffect, useState } from 'react';
import PolarityGraph from '../compos/polaritygraph.js';
export default function ProgressPage() {

    const [polarity, setPolarity] = useState([]);

    useEffect(() => {
        setPolarity([15, 20, -30 , -40, 50, 60]);
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
                    </div>
            </div>
        </div>
    );
}