import type { WebTemplate } from "@/lib/templates";

function FrameBody({ frame }: { frame: WebTemplate["frame"] }) {
  switch (frame) {
    case "hero3":
      return (
        <div className="browser-frame__body">
          <div className="wf-nav">
            <div className="wf-dot" />
            <div className="wf-line w-30" />
          </div>
          <div className="wf-hero-block" />
          <div className="wf-grid">
            <div className="wf-card" />
            <div className="wf-card" />
            <div className="wf-card" />
          </div>
        </div>
      );
    case "hero-btn":
      return (
        <div className="browser-frame__body">
          <div className="wf-nav">
            <div className="wf-dot" />
            <div className="wf-line w-30" style={{ marginLeft: "auto" }} />
          </div>
          <div className="wf-hero-block" style={{ height: 70 }} />
          <div className="wf-line w-60" />
          <div className="wf-btn" />
        </div>
      );
    case "shop":
      return (
        <div className="browser-frame__body wf-shop">
          <div className="wf-nav">
            <div className="wf-dot" />
            <div className="wf-line w-30" />
            <div className="wf-tag" style={{ marginLeft: "auto" }} />
          </div>
          <div className="wf-grid">
            <div className="wf-card" />
            <div className="wf-card" />
            <div className="wf-card" />
          </div>
          <div className="wf-line w-60" />
        </div>
      );
    case "portfolio2":
      return (
        <div className="browser-frame__body">
          <div className="wf-nav">
            <div className="wf-dot" />
            <div className="wf-line w-30" />
          </div>
          <div className="wf-grid cols-2">
            <div className="wf-card tall" />
            <div className="wf-card tall" />
          </div>
          <div className="wf-line w-40" />
        </div>
      );
    case "blog2":
      return (
        <div className="browser-frame__body">
          <div className="wf-nav">
            <div className="wf-dot" />
            <div className="wf-line w-30" />
          </div>
          <div className="wf-article">
            <div className="wf-thumb" />
            <div className="wf-lines">
              <div className="wf-line w-60" />
              <div className="wf-line w-30" />
            </div>
          </div>
          <div className="wf-article">
            <div className="wf-thumb" />
            <div className="wf-lines">
              <div className="wf-line w-full" />
              <div className="wf-line w-40" />
            </div>
          </div>
        </div>
      );
    case "grid2":
      return (
        <div className="browser-frame__body">
          <div className="wf-nav">
            <div className="wf-dot" />
            <div className="wf-line w-30" />
          </div>
          <div className="wf-hero-block" />
          <div className="wf-grid cols-2">
            <div className="wf-card" />
            <div className="wf-card" />
          </div>
        </div>
      );
  }
}

export default function BrowserFrame({
  url,
  frame,
  dark = false,
}: {
  url: string;
  frame: WebTemplate["frame"];
  dark?: boolean;
}) {
  return (
    <div className={`browser-frame${dark ? " dark" : ""}`}>
      <div className="browser-frame__bar">
        <div className="browser-frame__dots">
          <span />
          <span />
          <span />
        </div>
        <div className="browser-frame__url">{url}</div>
      </div>
      <FrameBody frame={frame} />
    </div>
  );
}
