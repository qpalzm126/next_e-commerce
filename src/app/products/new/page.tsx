"use client"
import { useState } from "react"
import Layout from "../../components/Layout"

export default function NewProduct() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  function createProduct() {
    axios.post("/")
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
