import { useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { CommunityBoard } from "./CommunityBoard";
import { ConnectView } from "./ConnectView";
import { ConversationsView } from "./ConversationsView";

type Demo = "board" | "connect" | "conversations";
const demos: { id: Demo; label: string }[] = [
  { id: "board", label: "Find everyday help" },
  { id: "connect", label: "Meet someone" },
  { id: "conversations", label: "Join a conversation" },
];

export function LandingPage() {
  const [demo, setDemo] = useState<Demo>("board");

  return (
    <div className="wt-home">
      <section className="wt-hero" aria-labelledby="welcome-title">
        <div className="wt-hero-copy">
          <p className="wt-eyebrow">For international college students</p>
          <h1 id="welcome-title">Your network.<br /><span>Beyond campus.</span></h1>
          <p className="wt-lead">Meet people at other colleges. Find a room, share a ride, or make a plan.</p>
          <a className="wt-link" href="#prototype">Explore the prototype <ArrowRight aria-hidden="true" size={19} /></a>
        </div>
        <img className="wt-hero-logo" src="/worlds-together-logo.png" alt="Worlds Together globe linking people across the world" width="480" height="480" />
      </section>

      <section className="wt-problem" aria-labelledby="problem-title">
        <div className="wt-section-inner">
          <p className="wt-eyebrow">The problem</p>
          <h2 id="problem-title">Your life crosses campuses.<br /><span>Your group chats don’t.</span></h2>
          <div className="wt-problem-bottom">
            <p>Housing leads. A ride home. People who get it.</p>
            <p>The right person might be one campus away.</p>
          </div>
        </div>
      </section>

      <section className="wt-solution" aria-labelledby="solution-title">
        <div>
          <p className="wt-eyebrow">The solution</p>
          <h2 id="solution-title">One community.<br /><span>Across colleges.</span></h2>
        </div>
        <div className="wt-solution-copy">
          <p>A shared place for everyday help. Introductions that fit your interests and your time.</p>
          <p className="wt-privacy"><LockKeyhole aria-hidden="true" size={19} /> You choose when to appear.</p>
          <a className="wt-link" href="#prototype">See how it works <ArrowRight aria-hidden="true" size={19} /></a>
        </div>
      </section>

      <section id="prototype" className="wt-demo" aria-labelledby="demo-title">
        <div className="wt-demo-heading">
          <h2 id="demo-title">Try it.</h2>
          <div className="wt-demo-tabs" role="tablist" aria-label="Explore the prototype">
            {demos.map((item) => (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                role="tab"
                aria-selected={demo === item.id}
                aria-controls="prototype-panel"
                tabIndex={demo === item.id ? 0 : -1}
                onClick={() => setDemo(item.id)}
                onKeyDown={(event) => {
                  const offset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
                  if (!offset && event.key !== "Home" && event.key !== "End") return;
                  event.preventDefault();
                  const index = event.key === "Home" ? 0 : event.key === "End" ? demos.length - 1 : (demos.findIndex((tab) => tab.id === demo) + offset + demos.length) % demos.length;
                  const next = demos[index]!;
                  setDemo(next.id);
                  document.getElementById(`tab-${next.id}`)?.focus();
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div id="prototype-panel" role="tabpanel" aria-labelledby={`tab-${demo}`}>
          {demo === "board" && <CommunityBoard />}
          {demo === "connect" && <ConnectView />}
          {demo === "conversations" && <ConversationsView />}
        </div>
      </section>
    </div>
  );
}
