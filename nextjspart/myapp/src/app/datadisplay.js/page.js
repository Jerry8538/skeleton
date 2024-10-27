'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import {getJSONById} from '@/app/accessFirebase'
//import MyChart from './compos/overall'

export default function Home() {
    var string = getJSONById
    useEffect(() =>{

    })
  return (
    <p>{string}</p>
  )
}