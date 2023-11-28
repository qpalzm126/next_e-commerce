"use client"
import { useEffect, useState } from "react"
import Layout from "../../../components/Layout"
import { useRouter } from "next/navigation"
import axios from "axios"
import { ProductType } from "@/app/components/ProductForm"

export default function DeleteProductPage({
  params,
}: {
  params: { id: string }
}) {
  const [productInfo, setProductInfo] = useState<ProductType | null>(null)
  const router = useRouter()
  const id = params.id
  useEffect(() => {
    if (!id) return
    axios.get("/api/products?id=" + id).then((res) => {
      setProductInfo(res.data)
    })
  }, [id])

  function goBack() {
    router.push("/products")
  }
  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id)
    goBack()
  }

  return (
    <Layout>
      <h1 className='text-center'>
        Do you really want to delete &nbsp;"{productInfo?.title}"&nbsp; ?
      </h1>
      <div className='flex gap-2 justify-center'>
        <button className='btn-red' onClick={deleteProduct}>
          Yes
        </button>
        <button className='btn-default' onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  )
}
