"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import DataTable from "@/components/data-table"
import { axiosInstance } from "@/lib/axios"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"

export default function AdminExperiencePage() {
  const router = useRouter()
  const [experiences, setExperiences] = useState([])
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

  const fetchExperiences = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page: currentPage, pageSize: 5 }
      if (searchTerm) params.search = searchTerm
      if (sortField) params.sortField = sortField
      params.sortOrder = sortOrder

      const { data } = await axiosInstance.get("/experiences", { params })
      setExperiences(data.data)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Failed to fetch experiences:", error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, sortField, sortOrder, currentPage])

  useEffect(() => {
    fetchExperiences()
  }, [fetchExperiences])

  const columns = [
    {
      key: "title",
      label: "Title",
      sortable: true,
    },
    {
      key: "subheading",
      label: "Subheading",
      sortable: true,
    },
    {
      key: "startDate",
      label: "Period",
      sortable: true,
      render: (val, row) => (
        <span className="text-muted-foreground text-xs">
          {row.startDate} — {row.endDate || "Present"}
        </span>
      ),
    },
  ]

  function handleCreate() {
    router.push("/admin/experience/create")
  }

  function handleEdit(row) {
    router.push(`/admin/experience/${row.id}/edit`)
  }

  async function handleDelete(row) {
    try {
      await axiosInstance.delete(`/experiences/${row.id}`)
      if (selected?.id === row.id) setSelected(null)
      fetchExperiences()
    } catch (error) {
      console.error("Failed to delete experience:", error)
    }
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={experiences}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowClick={(row) => setSelected(row)}
        searchFields={["title", "subheading"]}
        pageSize={5}
        title="EXPERIENCES"
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
                <SheetTitle className="font-mono text-lg text-amber-500">
                  {selected.title}
                </SheetTitle>
                <SheetDescription className="font-mono text-xs text-muted-foreground">
                  {selected.subheading}
                </SheetDescription>
                <span className="font-mono text-xs text-muted-foreground">
                  {selected.startDate} — {selected.endDate || "Present"}
                </span>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="mb-2 mt-4 font-mono text-lg font-semibold text-amber-500 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-2 mt-4 font-mono text-base font-semibold text-amber-500 first:mt-0">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-2 mt-3 font-mono text-sm font-semibold text-amber-500 first:mt-0">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="mb-3 font-mono text-sm leading-relaxed last:mb-0">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-amber-500">
                        {children}
                      </strong>
                    ),
                    code: ({ children, className }) => {
                      if (!className) {
                        return (
                          <code className="rounded bg-amber-500/10 px-1.5 py-0.5 font-mono text-sm text-amber-500">
                            {children}
                          </code>
                        )
                      }
                      return <code className="block">{children}</code>
                    },
                    pre: ({ children }) => (
                      <pre className="mb-3 overflow-x-auto rounded-lg border border-white/10 bg-black/20 p-3 font-mono text-sm last:mb-0">
                        {children}
                      </pre>
                    ),
                    ul: ({ children }) => (
                      <ul className="mb-3 list-disc space-y-1 pl-5 font-mono text-sm last:mb-0">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="mb-3 list-decimal space-y-1 pl-5 font-mono text-sm last:mb-0">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li>{children}</li>,
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        className="text-amber-500 underline underline-offset-2 hover:text-amber-400"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="mb-3 border-l-2 border-amber-500/50 pl-4 text-muted-foreground last:mb-0">
                        {children}
                      </blockquote>
                    ),
                    hr: () => <hr className="my-4 border-amber-500/20" />,
                  }}
                >
                  {selected.description}
                </ReactMarkdown>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
