import { writeFile } from "fs/promises"
import multiparty from "multiparty"
import { NextRequest, NextResponse } from "next/server"
import path from "path"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file")
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 })
  }
  // const form = new multiparty.Form()
  // const { fields, files } = await new Promise((resolve, reject) => {
  //   form.parse(req, (err, fields, files) => {
  //     if (err) reject(err)
  //     resolve({ fields, files })
  //   })
  // })

  // console.log("length:" + files.file.length)
  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = Date.now() + file.name.replaceAll(" ", "_")
  console.log(filename)
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    )
    return NextResponse.json({ Message: "Success", status: 201 })
  } catch (error) {
    console.log("Error occured ", error)
    return NextResponse.json({ Message: "Failed", status: 500 })
  }
}

export const config = {
  api: { bodyParser: false },
}
