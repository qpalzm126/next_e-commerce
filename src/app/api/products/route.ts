import { MongoClient } from "mongodb"
import { mongooseConnect } from "../../lib/mongoose"
import { Product } from "../../models/Products"
import mongoose from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get("id") ?? ""

  if (id) {
    const res = await Product.findOne({ _id: id })
    return NextResponse.json(res)
  } else {
    const res = await Product.find()
    return NextResponse.json(res)
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  await mongooseConnect()
  await Product.create({
    ...body,
  })

  return NextResponse.json({ body })
}

export async function PUT(req: NextRequest) {
  const { title, description, price, images, category, _id } = await req.json()

  await mongooseConnect()
  await Product.updateOne(
    { _id },
    { title, description, price, category, images }
  )

  return NextResponse.json({ title, description, price, images, category, _id })
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get("id") ?? ""
  if (id) {
    await Product.deleteOne({ _id: id })
  }
  return NextResponse.json({ id })
}
