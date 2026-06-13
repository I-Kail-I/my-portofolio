import Image from "next/image";

export default function CertificateCard({ date, title, description, imageUrl, imageAlt }) {
  return (
    <div className="retro-card border border-white/10 p-4 transition-all duration-200 hover:border-amber-500/50 dark:border-white/5 dark:hover:border-amber-400/50">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-amber-600/70 dark:text-amber-400/70">&gt;</span>
        <time className="text-muted-foreground font-mono text-sm font-medium tracking-widest">
          DATE: {date}
        </time>
      </div>

      <div>
        <h2 className="font-mono text-lg font-semibold text-amber-600 dark:text-amber-400">
          {title}
        </h2>
        <p className="text-muted-foreground mt-1 font-mono text-sm tracking-wide">
          {description}
        </p>

        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className="mt-4 w-full rounded-lg"
            width={453}
            height={353}
          />
        )}
      </div>
    </div>
  )
}
