"use client"

import { useState } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { PostEditor } from "@/components/admin/post-editor"
import { PostsList } from "@/components/admin/posts-list"
import { motion } from "framer-motion"

export default function AdminPage() {
  const [activeView, setActiveView] = useState<"editor" | "posts">("posts")
  const [editingPost, setEditingPost] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <AdminHeader activeView={activeView} onViewChange={setActiveView} />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeView === "editor" ? (
            <PostEditor editingPostId={editingPost} onBack={() => setActiveView("posts")} />
          ) : (
            <PostsList
              onEditPost={(id) => {
                setEditingPost(id)
                setActiveView("editor")
              }}
              onNewPost={() => {
                setEditingPost(null)
                setActiveView("editor")
              }}
            />
          )}
        </motion.div>
      </main>
    </div>
  )
}
