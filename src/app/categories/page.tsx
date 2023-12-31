"use client"
import { FormEvent, useEffect, useState } from "react"
import Layout from "../components/Layout"
import axios from "axios"
import { withSwal } from "react-sweetalert2"

export function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null)
  const [name, setName] = useState("")
  const [parentCategory, setParentCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [properties, setProperties] = useState([])
  useEffect(() => {
    fetchCategories()
  }, [])

  async function saveCategory(e: FormEvent) {
    e.preventDefault()
    const data = { name, parentCategory }

    if (editedCategory) {
      data._id = editCategory._id
      await axios.put("/api/categories", { ...data })
      setEditedCategory(null)
    } else {
      await axios.post("/api/categories", { ...data })
    }

    setName("")
    fetchCategories()
  }
  function fetchCategories() {
    axios.get("/api/categories").then((r) => {
      console.log(r.data)
      setCategories(r.data)
    })
  }

  function editCategory(category) {
    setEditedCategory(category)
    setName(category.name)
    setParentCategory(category.parent?._id)
    setProperties(
      category.properties.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    )
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: false,
      })
      .then(async (res: any) => {
        if (res.isConfirmed) {
          const { _id } = category
          await axios.delete("/api/categories?_id=" + _id)
          fetchCategories()
        }
      })
  }
  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form className='flex gap-1' onSubmit={saveCategory}>
        <input
          className='mb-0'
          type='text'
          placeholder='Category name'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <select
          className='mb-0'
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value={0}>No parent category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
        <button type='submit' className='btn-primary py-1'>
          Save
        </button>
      </form>
      <table className='basic mt-4'>
        <thead>
          <tr>
            <td>Categories names</td>
            <td>Parent category</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className='btn-default mr-1'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className='btn-red'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  )
}
export default withSwal(({ swal }, ref) => <Categories swal={swal} />)
export interface CategoryType {
  name: { type: String; require: true }
  parent: { name: String; parent: String }
}
