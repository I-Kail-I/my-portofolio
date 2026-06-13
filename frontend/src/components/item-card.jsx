import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ItemCard({ href, date, title, description, tags = [] }) {
  return (
    <Link href={href} passHref>
      <Card className="retro-card bg-background hover:bg-muted-foreground/5 rounded-none border border-white/10 outline-none duration-200 hover:border-amber-500/50 dark:border-white/5 dark:hover:border-amber-400/50">
        <CardHeader className="pb-2">
          <time className="text-muted-foreground font-mono text-xs font-medium tracking-widest">
            &gt; DATE: {date}
          </time>
        </CardHeader>
        <CardContent>
          <CardTitle>
            <h2 className="font-mono text-base font-medium text-amber-600 dark:text-amber-400">
              {title}
            </h2>
          </CardTitle>
          <CardDescription>
            <p className="text-muted-foreground mt-1 font-mono text-sm">
              {description}
            </p>
          </CardDescription>
          {tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="mx-1 rounded-none border-amber-500/40 font-mono text-xs text-amber-600 dark:border-amber-400/40 dark:text-amber-400"
                  variant="outline"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
