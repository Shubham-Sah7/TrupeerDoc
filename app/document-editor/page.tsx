"use client"

import { DocumentEditor } from "@/components/document-editor"
import { useRouter } from "next/navigation"

export default function DocumentEditorPage() {
  const router = useRouter()

  return <DocumentEditor onBack={() => router.push("/documents")} />
}
