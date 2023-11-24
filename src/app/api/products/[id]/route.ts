import { NextRequest, NextResponse } from "next/server"
import { Product } from "../../../models/products"
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const json = {}
  if (id) {
    const res = await Product.findOne({ _id: id })
    console.log(res)
    return NextResponse.json(res)
  }

  return NextResponse.json(json)
}
