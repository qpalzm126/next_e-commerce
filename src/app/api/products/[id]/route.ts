import { NextRequest, NextResponse } from "next/server"
import { Product } from "../../../models/Products"
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const json = {}
  if (id) {
    const res = await Product.findOne({ _id: id })
    return NextResponse.json(res)
  }

  return NextResponse.json(json)
}
