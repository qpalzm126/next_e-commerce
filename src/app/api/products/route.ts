import { MongoClient } from "mongodb"
import { mongooseConnect } from "../../lib/mongoose"
import { Product } from "../../models/products"
import mongoose from "mongoose"
import { NextApiRequest, NextApiResponse } from "next"

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  console.log("mm", method)
  await mongooseConnect()
  // try {
  //   await mongoose.connect(process.env.MONGODB_URI ?? "", {
  //     dbName: "products",
  //   })
  // } catch (error) {
  //   console.log(error)
  // }

  if (method === "GET") {
    console.log("GET daze!")
  }
  if (method === "POST") {
    const { title, description, price } = req.body
    const productDoc = await Product.create({
      title,
      description,
      price,
    })

    res.json(productDoc)
  }
}
