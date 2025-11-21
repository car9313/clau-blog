"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ImageIcon, Upload, Link2, Search } from "lucide-react"
import { motion } from "framer-motion"

interface ImageUploaderProps {
  onInsert: (imageUrl: string, altText: string) => void
  onClose: () => void
}

export function ImageUploader({ onInsert, onClose }: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [altText, setAltText] = useState("")
  const [uploadMethod, setUploadMethod] = useState<"url" | "upload">("url")

  // Imágenes de ejemplo para desarrollo
  const exampleImages = [
    {
      url: "/placeholder.svg?height=400&width=600",
      alt: "Imagen de ejemplo 1",
      title: "Desarrollo Web",
    },
    {
      url: "/placeholder.svg?height=300&width=500",
      alt: "Imagen de ejemplo 2",
      title: "Código JavaScript",
    },
    {
      url: "/placeholder.svg?height=350&width=550",
      alt: "Imagen de ejemplo 3",
      title: "Diseño UI/UX",
    },
  ]

  const handleInsert = () => {
    if (imageUrl.trim() && altText.trim()) {
      onInsert(imageUrl, altText)
    }
  }

  const selectExampleImage = (url: string, alt: string) => {
    setImageUrl(url)
    setAltText(alt)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // En un caso real, aquí subirías el archivo a tu servidor/CDN
      // Por ahora, simulamos con un placeholder
      const simulatedUrl = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(file.name)}`
      setImageUrl(simulatedUrl)
      setAltText(file.name.replace(/\.[^/.]+$/, "")) // Remove extension
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-4xl max-h-[90vh] overflow-auto"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Insertar Imagen
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Métodos de inserción */}
            <div className="flex gap-2">
              <Button
                variant={uploadMethod === "url" ? "default" : "outline"}
                onClick={() => setUploadMethod("url")}
                className="flex items-center gap-2"
              >
                <Link2 className="w-4 h-4" />
                URL de imagen
              </Button>
              <Button
                variant={uploadMethod === "upload" ? "default" : "outline"}
                onClick={() => setUploadMethod("upload")}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Subir archivo
              </Button>
            </div>

            {/* Inserción por URL */}
            {uploadMethod === "url" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">URL de la imagen</label>
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    type="url"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Texto alternativo</label>
                  <Input
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Descripción de la imagen para accesibilidad"
                  />
                </div>
              </div>
            )}

            {/* Subida de archivo */}
            {uploadMethod === "upload" && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Seleccionar archivo</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Arrastra una imagen aquí o haz clic para seleccionar
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                      Seleccionar archivo
                    </Button>
                  </div>
                </div>

                {imageUrl && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Texto alternativo</label>
                    <Input
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      placeholder="Descripción de la imagen"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Imágenes de ejemplo */}
            <div>
              <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                <Search className="w-4 h-4" />
                Imágenes de ejemplo
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {exampleImages.map((img, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => selectExampleImage(img.url, img.alt)}
                  >
                    <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded mb-2 flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium">{img.title}</p>
                    <p className="text-xs text-gray-500">{img.alt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vista previa */}
            {imageUrl && (
              <div>
                <label className="text-sm font-medium mb-2 block">Vista previa</label>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                    <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Imagen: {altText || "Sin descripción"}</p>
                    <p className="text-xs text-gray-500 mt-1 break-all">{imageUrl}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Acciones */}
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={handleInsert} disabled={!imageUrl.trim() || !altText.trim()}>
                Insertar Imagen
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
