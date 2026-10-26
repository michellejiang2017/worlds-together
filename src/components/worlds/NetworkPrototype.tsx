import { useState } from "react";
import {
  Building2,
  MessageCircle,
  UsersRound,
} from "lucide-react";
import { LandingPage } from "./LandingPage";
import { CommunityBoard } from "./CommunityBoard";
import { ConnectView } from "./ConnectView";
import { ConversationsView } from "./ConversationsView";

type Section = "home" | "connect" | "board" | "conversations";

const navItems: {
  id: Exclude<Section, "home">;
  label: string;
  icon: typeof UsersRound;
}[] = [
  { id: "connect", label: "Connect", icon: UsersRound },
  { id: "board", label: "Community board", icon: Building2 },
  { id: "conversations", label: "Conversations", icon: MessageCircle },
];

export function NetworkPrototype() {
  const [section, setSection] = useState<Section>("home");

  return (
    <main className="min-h-screen bg-background wt-app">
      <header className="sticky top-0 z-20 border-b border-border/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <button
            className="flex items-center gap-3 text-left"
            onClick={() => setSection("home")}
            aria-label="Worlds Together home"
          >
            <img className="size-11 object-contain" src="/worlds-together-logo.png" alt="" width="44" height="44" />
            <span>
              <span className="block text-sm font-semibold tracking-tight">Worlds Together</span>
              <span className="hidden text-[11px] text-muted-foreground sm:block">
                International student network
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setSection(item.id); window.scrollTo({ top: 0, behavior: "instant" }); }}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  }`}
                >
                  <Icon className="size-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <details className="wt-disclosure">
            <summary>Demo · sample data</summary>
            <p>All students and posts are fictional. Interactions stay in this browser and do not contact real people.</p>
          </details>
        </div>

        <nav className="flex border-t border-border/70 px-3 py-2 md:hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setSection(item.id); window.scrollTo({ top: 0, behavior: "instant" }); }}
                  aria-current={active ? "page" : undefined}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium ${
                  active ? "bg-secondary" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-3.5" />
                {item.label === "Community board" ? "Board" : item.label}
              </button>
            );
          })}
        </nav>
      </header>

      <div className={section === "home" ? "" : "mx-auto w-full max-w-6xl px-5 py-8 sm:py-10"}>
        {section === "home" && <LandingPage />}
        {section === "connect" && <ConnectView />}
        {section === "board" && <CommunityBoard />}
        {section === "conversations" && <ConversationsView />}


      </div>
    </main>
  );
}
