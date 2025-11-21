"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { getPostBySlug } from "@/lib/posts";
import { EditorToolbar } from "./editor-toolbar";
import { ImageUploader } from "./image-uploader";
import { CodeInserter } from "./code-inserter";
import { PostPreview } from "./post-preview";
import { categories, Category } from "../../lib/categories";

interface PostEditorProps {
  editingPostId?: string | null;
  onBack: () => void;
}

export function PostEditor({ editingPostId, onBack }: PostEditorProps) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [categoryPostSelected, setCategoryPostSelected] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categoryList, setCategories] = useState<Category[]>(categories);

  const [author, setAuthor] = useState("Admin");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [readTime, setReadTime] = useState("5 min");
  const [showPreview, setShowPreview] = useState(false);
  const [showImageUploader, setShowImageUploader] = useState(false);
  const [showCodeInserter, setShowCodeInserter] = useState(false);

  // Cargar post para editar
  useEffect(() => {
    if (editingPostId) {
      const post = getPostBySlug(editingPostId);
      if (post) {
        setTitle(post.title);
        setExcerpt(post.excerpt);
        setContent(post.content.replace(/<[^>]*>/g, "")); // Remove HTML tags for editing
        setCategoryPostSelected(post.category);
        setAuthor(post.author);
        setTags(post.tags);
        setReadTime(post.readTime);
      }
    } else {
      // Reset form for new post
      setTitle("");
      setExcerpt("");
      setContent("");
      setCategoryPostSelected("");
      setAuthor("Admin");
      setTags([]);
      setReadTime("5 min");
    }
  }, [editingPostId]);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      const nexCategoryObject: Category = {
        slug: "slug",
        title: newCategory.trim(),
      };
      const newListCategory: Category[] = [...categories, nexCategoryObject];
      setCategories(newListCategory);
      setNewCategory("");
    }
  };

  const insertAtCursor = (textToInsert: string) => {
    const textarea = document.getElementById(
      "content-editor"
    ) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent =
        content.substring(0, start) + textToInsert + content.substring(end);
      setContent(newContent);

      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + textToInsert.length,
          start + textToInsert.length
        );
      }, 0);
    }
  };

  const insertCode = (code: string, language: string) => {
    const codeBlock = `\n\`\`\`${language}\n${code}\n\`\`\`\n`;
    insertAtCursor(codeBlock);
    setShowCodeInserter(false);
  };

  const insertImage = (imageUrl: string, altText: string) => {
    const imageMarkdown = `\n![${altText}](${imageUrl})\n`;
    insertAtCursor(imageMarkdown);
    setShowImageUploader(false);
  };

  const insertFormatting = (type: string) => {
    const textarea = document.getElementById(
      "content-editor"
    ) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = content.substring(start, end);

      let formattedText = "";
      switch (type) {
        case "bold":
          formattedText = `**${selectedText || "texto en negrita"}**`;
          break;
        case "italic":
          formattedText = `*${selectedText || "texto en cursiva"}*`;
          break;
        case "link":
          formattedText = `[${
            selectedText || "texto del enlace"
          }](https://ejemplo.com)`;
          break;
        case "list":
          formattedText = `\n- ${selectedText || "elemento de lista"}\n`;
          break;
        default:
          return;
      }

      const newContent =
        content.substring(0, start) + formattedText + content.substring(end);
      setContent(newContent);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + formattedText.length,
          start + formattedText.length
        );
      }, 0);
    }
  };

  const handleSave = () => {
    // Aquí implementarías la lógica para guardar el post
    console.log("Guardando post:", {
      title,
      excerpt,
      content,
      categoryPostSelected,
      author,
      tags,
      readTime,
      slug: title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
      date: new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    });
    alert("Post guardado exitosamente!");
  };

  if (showPreview) {
    return (
      <PostPreview
        title={title}
        excerpt={excerpt}
        content={content}
        category={categoryPostSelected}
        author={author}
        tags={tags}
        readTime={readTime}
        onBack={() => setShowPreview(false)}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Posts
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 bg-transparent"
          >
            <Eye className="w-4 h-4" />
            Vista previa
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            {editingPostId ? "Actualizar" : "Publicar"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Editor Principal */}
        <div className="lg:col-span-3 space-y-6">
          {/* Título */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Input
              placeholder="Título del artículo..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-bold border-none px-0 py-4 h-auto placeholder:text-gray-400 focus-visible:ring-0 bg-transparent"
            />
          </motion.div>

          {/* Excerpt */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Textarea
              placeholder="Escribe un resumen atractivo del artículo..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="text-lg text-gray-600 dark:text-gray-300 border-none px-0 py-2 resize-none placeholder:text-gray-400 focus-visible:ring-0 bg-transparent"
              rows={3}
            />
          </motion.div>

          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <EditorToolbar
              onInsertCode={() => setShowCodeInserter(true)}
              onInsertImage={() => setShowImageUploader(true)}
              onFormat={insertFormatting}
            />
          </motion.div>

          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Textarea
              id="content-editor"
              placeholder="Cuenta tu historia... 

Puedes usar Markdown:
- **negrita** o *cursiva*
- [enlaces](https://ejemplo.com)
- \`\`\`código\`\`\`
- ![imagen](url-de-imagen)
- # Títulos
- - Listas"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[600px] text-base leading-relaxed border-none px-0 py-4 resize-none placeholder:text-gray-400 focus-visible:ring-0 bg-transparent font-mono"
            />
          </motion.div>
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          {/* Configuración del Post */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Configuración</h3>

              {/* Categoría */}
              <>
                <div className="flex gap-2">
                  <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Agregar Categoria"
                    onKeyPress={(e) => e.key === "Enter" && addCategory()}
                  />
                  <Button size="sm" onClick={addCategory}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Categorías
                </label>

                <>
                  <Select
                    value={categoryPostSelected}
                    onValueChange={setCategoryPostSelected}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryList.map((category) => {
                        return (
                          <SelectItem
                            key={category.slug}
                            value={category.title}
                          >
                            {category.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </>
              </>

              {/* Autor */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Autor
                </label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Nombre del autor"
                />
              </div>

              {/* Tiempo de lectura */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                  Tiempo de lectura
                </label>
                <Input
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="ej: 5 min"
                />
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg">Tags</h3>

              {/* Agregar tag */}
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Agregar tag"
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button size="sm" onClick={addTag}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Lista de tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas */}
          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="font-semibold text-lg">Estadísticas</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>
                  Palabras:{" "}
                  {content.split(" ").filter((word) => word.length > 0).length}
                </p>
                <p>Caracteres: {content.length}</p>
                <p>
                  Párrafos:{" "}
                  {
                    content.split("\n\n").filter((p) => p.trim().length > 0)
                      .length
                  }
                </p>
                <p>
                  Bloques de código: {(content.match(/```/g) || []).length / 2}
                </p>
                <p>
                  Imágenes: {(content.match(/!\[.*?\]$$.*?$$/g) || []).length}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Guía de Markdown */}
          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="font-semibold text-lg">Guía Rápida</h3>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <p>
                  <code>**negrita**</code> → <strong>negrita</strong>
                </p>
                <p>
                  <code>*cursiva*</code> → <em>cursiva</em>
                </p>
                <p>
                  <code>[enlace](url)</code> → enlace
                </p>
                <p>
                  <code># Título</code> → Título
                </p>
                <p>
                  <code>- Lista</code> → • Lista
                </p>
                <p>
                  <code>\`\`\`código\`\`\`</code> → código
                </p>
                <p>
                  <code>![alt](url)</code> → imagen
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Modales */}
      {showImageUploader && (
        <ImageUploader
          onInsert={insertImage}
          onClose={() => setShowImageUploader(false)}
        />
      )}

      {showCodeInserter && (
        <CodeInserter
          onInsert={insertCode}
          onClose={() => setShowCodeInserter(false)}
        />
      )}
    </div>
  );
}
