import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Book Management App. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://gitlab.com/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}