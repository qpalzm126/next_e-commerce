"use client"
import { FormEvent, useState } from "react"
import Layout from "../../components/Layout"
import axios from "axios"
import { useRouter } from "next/navigation"
import ProductForm from "@/app/components/ProductForm"

export default function NewProduct() {
  return (
    <Layout>
      <h1>New Products </h1>
      <ProductForm />
    </Layout>
  )
}
