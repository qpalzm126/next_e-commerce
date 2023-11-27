"use client"
import { FormEvent, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}: ProductType) {
  const router = useRouter()
  const [title, setTitle] = useState(existingTitle || "")
  const [description, setDescription] = useState(existingDescription || "")
  const [price, setPrice] = useState(existingPrice || "")
  const [goToProducts, setGoToProducts] = useState(false)

  async function saveProduct(e: FormEvent) {
    e.preventDefault()
    const data: ProductType = { title, description, price }
    if (_id) {
      await axios
        .put("/api/products", { ...data, _id })
        .catch((r) => console.error("something wrong!"))
    } else {
      await axios
        .post("/api/products", data)
        .catch((r) => console.error("something wrong!"))
    }
    setGoToProducts(true)
  }
  if (goToProducts) {
    router.push("/products")
    setGoToProducts(false)
  }
  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type='text'
        placeholder='product name'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Description</label>
      <textarea
        placeholder='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        type='number'
        placeholder='price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className='btn-primary' type='submit'>
        Save
      </button>
    </form>
  )
}

export interface ProductType {
  _id?: string
  title: string
  description: string | null
  price: string
}
