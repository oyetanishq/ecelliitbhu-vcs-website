import React, {useState} from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'

export default function NotFound(){
  return (
    <main className="h-[70vh] flex flex-col items-center justify-center text-center space-y-4">
      <h2 className="text-3xl font-bold">404 - Page Not Found</h2>
      <Link to="/" className="text-blue-600 hover:underline">Go back home</Link>
    </main>
  )
}