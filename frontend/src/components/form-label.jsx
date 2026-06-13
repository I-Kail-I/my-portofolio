export default function FormLabel({ children, required }) {
  return (
    <label className="font-mono text-xs font-medium text-amber-600 dark:text-amber-400">
      {children}
      {required && " *"}
    </label>
  )
}
