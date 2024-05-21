import { githubLink } from "@/config/WebSite"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mt-auto flex justify-between px-8 pb-2 pt-2 text-sm text-zinc-500 dark:text-zinc-400">
      <div className="flex items-center gap-2">
        © {new Date().getFullYear()}{" "}
        <a target="_blank" href={githubLink} className="underline hover:text-[#4493F8]">
          Post - It
        </a>
        . All Rights Reserved.
      </div>
      <nav className="flex items-center gap-2">
        <Link href="/rules" className="hover:text-[#4493F8]">Rules</Link>
        <span className="border h-full border-l-neutral-200" />
        <Link href="/global" className="hover:text-[#4493F8]">Chat</Link>
        <span className="border h-full border-l-neutral-200" />
        <Link href={githubLink} target="_blank" className="hover:text-[#4493F8]">Github</Link>
      </nav>
    </footer>
  )
}
