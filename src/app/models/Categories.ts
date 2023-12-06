import mongoose from "mongoose"
import { Schema, model, models } from "mongoose"

const CategorySchema = new Schema({
  name: { type: String, require: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category" },
  // parent: { type: mongoose.Types.ObjectId },
})

export const Category = models.Category || model("Category", CategorySchema)
