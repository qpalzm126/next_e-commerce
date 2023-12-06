import { mongooseConnect } from "@/app/lib/mongoose"
import { Category } from "@/app/models/Categories"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  await mongooseConnect()
  const res = await Category.find().populate("parent")

  return NextResponse.json(res)
}

export async function POST(req: NextRequest) {
  const { name, parentCategory } = await req.json()
  await mongooseConnect()
  const res = await Category.create({
    name,
    parent: parentCategory,
  })

  return NextResponse.json(res)
}

export async function PUT(req: NextRequest) {
  const { name, parentCategory, _id } = await req.json()
  await mongooseConnect()
  const res = await Category.updateOne(
    { _id },
    {
      name,
      parent: parentCategory,
    }
  )

  return NextResponse.json(res)
}
export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const _id = searchParams.get("_id") ?? ""
  // const _id = params._id
  if (_id) {
    await Category.deleteOne({ _id })
  }
  return NextResponse.json({ _id })
}
