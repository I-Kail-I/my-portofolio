"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import MarkdownPreview from "@/components/markdown-preview"
import DataTable from "@/components/data-table"
import { axiosInstance } from "@/lib/axios"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

export default function AdminBlogsPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("")
  const [sortOrder, setSortOrder] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    total: 0,
    totalPages: 1,
  })

  const fetchBlogs = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page: currentPage, pageSize: 5 }
      if (searchTerm) params.search = searchTerm
      if (sortField) params.sortField = sortField
      params.sortOrder = sortOrder

      const { data } = await axiosInstance.get("/blogs", { params })
      setBlogs(data.data)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Failed to fetch blogs:", error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, sortField, sortOrder, currentPage])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const columns = [
    {
      key: "coverImage",
      label: "Cover",
      sortable: false,
      render: (val) =>
        val ? (
          <img
            src={val}
            alt="Cover"
            className="h-10 w-16 object-cover border border-white/10"
          />
        ) : (
          <span className="text-muted-foreground text-xs">—</span>
        ),
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
    },
    {
      key: "tags",
      label: "Tags",
      sortable: false,
      render: (val) => (
        <div className="flex flex-wrap gap-1">
          {(val || []).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="rounded-none border-amber-500/40 font-mono text-[10px] text-amber-600 dark:border-amber-400/40 dark:text-amber-400"
            >
              {tag}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (val) => (
        <span className="text-muted-foreground text-xs">
          {val ? new Date(val).toLocaleDateString() : "—"}
        </span>
      ),
    },
  ]

  function handleCreate() {
    router.push("/admin/blogs/create")
  }

  function handleEdit(row) {
    router.push(`/admin/blogs/${row.id}/edit`)
  }

  async function handleDelete(row) {
    try {
      await axiosInstance.delete(`/blogs/${row.id}`)
      if (selected?.id === row.id) setSelected(null)
      fetchBlogs()
    } catch (error) {
      console.error("Failed to delete blog:", error)
    }
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={blogs}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowClick={(row) => setSelected(row)}
        searchFields={["title"]}
        pageSize={5}
        title="BLOGS"
        serverSide
        searchTerm={searchTerm}
        sortField={sortField}
        sortOrder={sortOrder}
        currentPage={currentPage}
        totalPages={pagination.totalPages}
        loading={loading}
        onSearchChange={(val) => {
          setSearchTerm(val)
          setCurrentPage(1)
        }}
        onSortChange={(val) => {
          setSortField(val)
          setCurrentPage(1)
        }}
        onSortOrderChange={(val) => {
          setSortOrder(val)
        }}
        onPageChange={(val) => setCurrentPage(val)}
      />

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full border-white/10 sm:max-w-lg">
          {selected && (
            <>
              <SheetHeader className="border-b border-white/10 pb-4">
                {selected.coverImage && (
                  <img
                    src={selected.coverImage}
                    alt={selected.title}
                    className="mb-2 h-40 w-full object-cover border border-white/10"
                  />
                )}
                <SheetTitle className="font-mono text-lg text-amber-500">
                  {selected.title}
                </SheetTitle>
                <SheetDescription className="font-mono text-xs text-muted-foreground">
                  {new Date(selected.createdAt).toLocaleDateString()}
                </SheetDescription>
                {selected.tags?.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selected.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-none border-amber-500/40 font-mono text-[10px] text-amber-600 dark:border-amber-400/40 dark:text-amber-400"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <MarkdownPreview content={selected.content} />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
