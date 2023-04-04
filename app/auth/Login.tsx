"use client"

import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <li>
      <button 
      onClick={() => signIn()} className="text-sm bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/40 text-white py-2 px-6 rounded-xl disabled:opacity-25">
        Sign In
       </button>
    </li>
  )
}