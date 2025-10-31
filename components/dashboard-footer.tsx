export default function DashboardFooter() {
  const currentDate = new Date()
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(currentDate)

  return (
    <footer className="border-t bg-background">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <div className="text-sm text-muted-foreground">Last Sync: {formattedDate}</div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:underline">
            Help & Support
          </a>
          <div>v1.0.3</div>
        </div>
      </div>
    </footer>
  )
}
