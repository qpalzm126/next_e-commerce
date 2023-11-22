"use client"
import Image from "next/image"
import { signIn, useSession } from "next-auth/react"
import Nav from "./Nav"

export default function Layout({ children }: { children: any }) {
  const { data: session, status } = useSession()
  if (!session) {
    return (
      <div className='bg-sky-900 h-screen w-screen flex items-center'>
        <div className='text-center w-full'>
          <button
            onClick={() => signIn("google")}
            className='bg-white p-2 px-4 rounded-lg'
          >
            Login with Google
          </button>
          <div>{"status:" + status}</div>
          <div>{"session:" + session}</div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-sky-900 min-h-screen flex'>
      <Nav />
      <div className='bg-white flex-grow m-2 ml-0 rounded-lg p-4'>
        {children}
      </div>
    </div>
  )
}
