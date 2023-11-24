"use client"
import { useRouter, useSearchParams } from "next/navigation"
import Layout from "../../../components/Layout"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductForm, { ProductType } from "@/app/components/ProductForm"

export default function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const [productInfo, setProductInfo] = useState<ProductType>(null)
  const id = params.id
  useEffect(() => {
    if (!id) return
    axios.get("/api/products?id=" + id).then((r) => setProductInfo(r.data))
  }, [id])

  return (
    <Layout>
      <h1>Edit Products{id} </h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  )
}
