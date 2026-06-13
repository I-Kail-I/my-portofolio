"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import MarkdownPreview from "@/components/markdown-preview"
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
                <MarkdownPreview content={selected.description} />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
