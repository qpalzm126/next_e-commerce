import { writeFile } from "fs/promises"
import multiparty from "multiparty"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs"
import mime from "mime-types"
const bucketName = "llecommerce"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const files = formData.getAll("file")
  if (!files) {
    return NextResponse.json({ error: "No files received." }, { status: 400 })
  }

  const client = new S3Client({
    region: "ap-southeast-2",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
    },
  })
  const links = []
  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = Date.now() + file.name.replaceAll(" ", "_")
    const filepath = path.join(process.cwd(), "public/uploads/" + filename)
    console.log(filename)
    try {
      await writeFile(filepath, buffer)
    } catch (error) {
      console.log("Error occured ", error)
    }
    client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filename,
        Body: fs.readFileSync(filepath),
        ACL: "public-read",
        // ContentType: mime.lookup(filepath),
      })
    )
    const link = `https://${bucketName}.s3.amazonaws.com/${filename}`
    links.push(link)
  }
  return NextResponse.json({ links })
}

export const config = {
  api: { bodyParser: false },
}
