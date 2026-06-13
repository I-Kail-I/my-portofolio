"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import {
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react"

export default function DataTable({
  columns = [],
  data = [],
  onCreate,
  onEdit,
  onDelete,
  onRowClick,
  searchFields = [],
  pageSize = 5,
  title = "",
  serverSide = false,
  searchTerm: externalSearch,
  sortField: externalSortField,
  sortOrder: externalSortOrder,
  currentPage: externalPage,
  totalPages: externalTotalPages,
  onSearchChange,
  onSortChange,
  onSortOrderChange,
  onPageChange,
  loading,
}) {
  const [localSearch, setLocalSearch] = useState("")
  const [localSortField, setLocalSortField] = useState("")
  const [localSortOrder, setLocalSortOrder] = useState("desc")
  const [localPage, setLocalPage] = useState(1)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const searchTerm = serverSide ? (externalSearch ?? "") : localSearch
  const sortField = serverSide ? (externalSortField ?? "") : localSortField
  const sortOrder = serverSide ? (externalSortOrder ?? "desc") : localSortOrder
  const currentPage = serverSide ? (externalPage ?? 1) : localPage

  const filteredData = useMemo(() => {
    if (serverSide) return data
    if (!searchTerm.trim()) return data
    const term = searchTerm.toLowerCase()
    return data.filter((row) =>
      searchFields.some((field) => {
        const val = row[field]
        return val ? String(val).toLowerCase().includes(term) : false
      }),
    )
  }, [data, searchTerm, searchFields, serverSide])

  const sortedData = useMemo(() => {
    if (serverSide) return filteredData
    if (!sortField) return filteredData
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortField] ?? ""
      const bVal = b[sortField] ?? ""
      const cmp = String(aVal).localeCompare(String(bVal))
      return sortOrder === "asc" ? cmp : -cmp
    })
  }, [filteredData, sortField, sortOrder, serverSide])

  const totalPages = serverSide
    ? (externalTotalPages ?? 1)
    : Math.max(1, Math.ceil(sortedData.length / pageSize))

  const safePage = Math.min(currentPage, totalPages)

  const displayData = serverSide
    ? sortedData
    : sortedData.slice((safePage - 1) * pageSize, safePage * pageSize)

  function handleSearch(value) {
    if (serverSide) {
      onSearchChange?.(value)
    } else {
      setLocalSearch(value)
      setLocalPage(1)
    }
  }

  function handleSortField(value) {
    if (serverSide) {
      onSortChange?.(value)
    } else {
      setLocalSortField(value)
      setLocalPage(1)
    }
  }

  function handleSortOrder() {
    const next = sortOrder === "asc" ? "desc" : "asc"
    if (serverSide) {
      onSortOrderChange?.(next)
    } else {
      setLocalSortOrder(next)
    }
  }

  function handlePage(page) {
    if (serverSide) {
      onPageChange?.(page)
    } else {
      setLocalPage(page)
    }
  }

  const sortableColumns = columns.filter((c) => c.sortable !== false)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-mono text-xl font-semibold tracking-tight">
            <span className="text-amber-500 dark:text-amber-400">// </span>
            {title || "DATA"}
          </h1>
          <div className="mt-1 h-px w-full bg-amber-500/20 dark:bg-amber-400/20" />
        </div>
        {onCreate && (
          <Button
            onClick={onCreate}
            className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600"
          >
            <Plus className="h-4 w-4" />
            Create
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {searchFields.length > 0 && (
          <Input
            placeholder={`Search by ${searchFields.join(", ")}...`}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-xs border-white/10 bg-transparent font-mono text-sm"
          />
        )}
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
          <span>Sort:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-transparent px-2.5 py-1 text-sm font-mono outline-none transition-colors hover:border-amber-500/50 focus:border-amber-500/50">
                <ArrowUpDown className="h-3.5 w-3.5" />
                {sortField
                  ? columns.find((c) => c.key === sortField)?.label || "Default"
                  : "Default"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[8rem] border-white/10 bg-background font-mono">
              <DropdownMenuRadioGroup
                value={sortField}
                onValueChange={handleSortField}
              >
                <DropdownMenuRadioItem value="">Default</DropdownMenuRadioItem>
                {sortableColumns.map((col) => (
                  <DropdownMenuRadioItem key={col.key} value={col.key}>
                    {col.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {sortField && (
            <button
              onClick={handleSortOrder}
              className="rounded-lg border border-white/10 px-2 py-1 text-xs transition-colors hover:border-amber-500/50"
            >
              {sortOrder === "asc" ? "↑ ASC" : "↓ DESC"}
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-left font-mono text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 font-semibold text-amber-600 dark:text-amber-400"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-3 font-semibold text-amber-600 dark:text-amber-400">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Loading...
                </td>
              </tr>
            ) : displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              displayData.map((row, idx) => (
                <tr
                  key={row.id || idx}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-white/5 transition-colors last:border-0 hover:bg-white/5 ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render
                        ? col.render(row[col.key], row)
                        : (row[col.key] ?? "—")}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {onEdit && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              onEdit(row)
                            }}
                            className="rounded-lg border border-white/10 p-1.5 transition-colors hover:border-amber-500/50 hover:text-amber-500"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {onDelete && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setDeleteTarget(row)
                                }}
                                className="rounded-lg border border-white/10 p-1.5 transition-colors hover:border-red-500/50 hover:text-red-500"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Delete {title.slice(0, -1) || "Item"}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete{" "}
                                  <span className="text-amber-500">
                                    {row.title}
                                  </span>
                                  ? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => onDelete(row)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between font-mono text-sm text-muted-foreground">
          <span>
            Page {safePage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePage(Math.max(1, safePage - 1))}
              disabled={safePage <= 1}
              className="rounded-lg border border-white/10 p-1.5 transition-colors hover:border-amber-500/50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePage(page)}
                className={`min-w-[2rem] rounded-lg border px-2 py-1 text-xs transition-colors ${
                  safePage === page
                    ? "border-amber-500 bg-amber-500/10 text-amber-500"
                    : "border-white/10 hover:border-amber-500/50"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePage(Math.min(totalPages, safePage + 1))}
              disabled={safePage >= totalPages}
              className="rounded-lg border border-white/10 p-1.5 transition-colors hover:border-amber-500/50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
