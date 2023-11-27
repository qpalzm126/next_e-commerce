"use client"
import { useState } from "react"
import Layout from "../../../components/Layout"
import { useRouter } from "next/navigation"

export default function DeleteProductPage({
  params,
}: {
  params: { id: string }
}) {
  const [productInfo, setProductInfo] = useState("")
  const router = useRouter()

  function goBack() {
    router.push("/products")
  }

  return (
    <Layout>
      <h1>Do you really want to delete product X?</h1>
      <div>
        <button>Yes</button>
        <button className='btn-default' onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  )
}
