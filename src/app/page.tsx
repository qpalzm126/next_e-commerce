"use client"
import Image from "next/image"
import { IconContext } from "react-icons"
import { FaRegUser } from "react-icons/fa6"
import { signIn, useSession } from "next-auth/react"
import Nav from "./components/Nav"
import Layout from "./components/Layout"

export default function Home() {
  const { data: session } = useSession()
  const name = session?.user?.name ?? ""
  const image = session?.user?.image ?? ""
  return (
    <Layout>
      <IconContext.Provider
        value={{
          color: "black",
          size: "20px",
          style: {
            marginTop: 4,
          },
        }}
      >
        <div className='text-sky-900 flex justify-between'>
          <h2>
            Hello, <strong> {name}</strong>
          </h2>
          <div className='flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden'>
            {image ? (
              <img src={image} alt='' className='w-6 h-6' />
            ) : (
              <FaRegUser />
            )}
            <span className='px-2 '>{name}</span>
          </div>
        </div>
      </IconContext.Provider>
    </Layout>
  )
}
