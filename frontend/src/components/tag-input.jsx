import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function TagInput({
  tags,
  onAdd,
  onRemove,
  tagInput,
  setTagInput,
}) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault()
      onAdd()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Add a tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-white/10 bg-transparent font-mono text-sm"
        />
        <Button type="button" onClick={onAdd} variant="outline" size="sm">
          Add
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded border border-amber-500/40 px-2 py-0.5 font-mono text-[10px] text-amber-600 dark:text-amber-400"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemove(tag)}
                className="hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
