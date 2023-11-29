"use client"
import React, { useEffect } from "react"
import { FormEvent, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}: ProductType) {
  const router = useRouter()
  const [title, setTitle] = useState(existingTitle || "")
  const [description, setDescription] = useState(existingDescription || "")
  const [images, setImages] = useState(existingImages || [])
  const [price, setPrice] = useState(existingPrice || "")
  const [goToProducts, setGoToProducts] = useState(false)
  useEffect(() => {
    console.log(images)
  }, [images])

  async function saveProduct(e: FormEvent) {
    e.preventDefault()
    const data: ProductType = { title, description, price, images }
    if (_id) {
      await axios
        .put("/api/products", { ...data, _id })
        .catch((r) => console.error("Edit product wrong!"))
    } else {
      await axios
        .post("/api/products", { ...data })
        .catch((r) => console.error("Create product wrong!"))
    }
    setGoToProducts(true)
  }
  if (goToProducts) {
    router.push("/products")
    setGoToProducts(false)
  }

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ?? []
    if (files.length > 0) {
      const data = new FormData()
      for (const file of files) {
        data.append("file", file)
      }

      const res = await axios.post("/api/upload", data)
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links]
      })
    }
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
      <label>Photos</label>
      <div className='mb-2 flex flex-wrap gap-2'>
        {!!images?.length &&
          images.map((link) =>
            link ? (
              <div key={link} className='h-24'>
                <img
                  src={link}
                  alt='image'
                  // referrerPolicy='no-referrer'
                  className='rounded-md'
                />
              </div>
            ) : (
              false
            )
          )}
        <label className='w-24 h-24 border cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
            />
          </svg>
          <div> Upload</div>
          <input type='file' onChange={uploadImage} className='hidden' />
        </label>
        {!images?.length && <div>No photos</div>}
      </div>

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
  images: Array<string>
  price: string
}
