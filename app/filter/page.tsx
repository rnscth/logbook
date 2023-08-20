import React from 'react'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Logbook',
  description: 'Filters',
}

export default function Filter() {
  return (<>
    <div>Filter Page</div>        
    <Image src='/workinprogress.png' height="160" width="160" alt="workinprogress" priority={true}/>
    </>)
}
