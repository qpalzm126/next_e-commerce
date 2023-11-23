"use client"
import { FormEvent, useState } from "react"
import Layout from "../../components/Layout"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function NewProduct() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [goToProducts, setGoToProducts] = useState(false)

  async function createProduct(e: FormEvent) {
    e.preventDefault()
    const data: ProductType = { title, description, price }
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => console.log("ok then"))
      .catch((r) => console.log(r))
    // await axios
    //   .post("/api/products", data)
    //   .then(() => console.log("okok"))
    //   .catch((r) => console.log(r))
    setGoToProducts(true)
  }
  if (goToProducts) {
    // router.push("/products")
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>New Products </h1>
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
    </Layout>
  )
}

interface ProductType {
  title: String
  description: String | null
  price: String
}
