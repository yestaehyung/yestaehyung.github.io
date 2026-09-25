import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/ResearchGraph.css";
import { buildGraph, layoutGraph, topicNodeId } from "../lib/researchGraph";

const WIDE = { width: 860, height: 460, padding: 60 };
const NARROW = { width: 340, height: 620, padding: 56 };
const ROOT_LABEL = "Human-Centered AI";
const NARROW_QUERY = "(max-width: 600px)";
// Mouse/trackpad devices highlight on hover; touch devices pin on tap instead.
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const TOPIC_RADIUS = 11;
// Soft colour wash behind each topic cluster (radius in viewBox units).
const GLOW_RADIUS = { wide: 150, narrow: 90 };
const PAPER_RADIUS = 6;
const ROOT_RADIUS = 5;
const PAPER_LABEL_OFFSET = 14;
const LINE_HEIGHT = 14;

// Paper labels sit outside the ring, anchored away from the centre so they
// never run back across the links. On narrow screens there is no room beside
// the ring, so labels are always centred above or below the node instead.
function paperLabelProps(angle, isNarrow) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  if (isNarrow) {
    return { x: 0, y: sin < 0 ? -12 : 20, textAnchor: "middle", above: sin < 0 };
  }
  const anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle";
  return {
    x: cos * PAPER_LABEL_OFFSET,
    y: sin * PAPER_LABEL_OFFSET + (sin > 0.35 ? 10 : sin < -0.35 ? -2 : 4),
    textAnchor: anchor,
    above: sin < -0.35,
  };
}

function useMediaQuery(queryString, fallback) {
  const query = useMemo(
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia(queryString)
        : null,
    [queryString],
  );
  const [matches, setMatches] = useState(query ? query.matches : fallback);

  useEffect(() => {
    if (!query) return undefined;
    const onChange = (e) => setMatches(e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

// Node ids connected to the active node, including itself. null = no focus.
function connectedIds(activeId, links) {
  if (!activeId) return null;
  const ids = new Set([activeId]);
  links.forEach(({ source, target }) => {
    if (source === activeId) ids.add(target);
    if (target === activeId) ids.add(source);
  });
  return ids;
}

function Caption({ node, publications, topics }) {
  if (!node) return null;
  if (node.kind === "topic") {
    const topic = topics.find((t) => topicNodeId(t.id) === node.id);
    const count = publications.filter((p) =>
      p.topics.includes(topic.id),
    ).length;
    return (
      <span>
        <strong style={{ color: topic.color }}>{topic.label}</strong>
        <span className="rg-caption-meta">
          {" "}
          · {count} {count === 1 ? "paper" : "papers"}
        </span>
      </span>
    );
  }
  const pub = publications.find((p) => p.id === node.paperId);
  return (
    <span>
      <span className="rg-caption-title">{pub.title}</span>
      <span className="rg-caption-meta"> · {pub.venue}</span>
    </span>
  );
}

// Two lines when the paper has a name: framework name, then venue. Labels
// that sit above their node are lifted a line so the pair stays clear of it.
function PaperLabel({ node, isNarrow }) {
  const { above, ...props } = paperLabelProps(node.angle, isNarrow);
  const lines = node.name ? [node.name, node.label] : [node.label];
  const lift = above ? (lines.length - 1) * LINE_HEIGHT : 0;
  return (
    <text className="rg-label" {...props} y={props.y - lift}>
      {lines.map((line, i) => (
        <tspan
          key={line}
          x={props.x}
          dy={i === 0 ? 0 : LINE_HEIGHT}
          className={i === 0 && node.name ? "rg-label-name" : undefined}
        >
          {line}
        </tspan>
      ))}
    </text>
  );
}

const ResearchGraph = ({ publications, topics, onSelectPaper }) => {
  const isNarrow = useMediaQuery(NARROW_QUERY, false);
  const canHover = useMediaQuery(HOVER_QUERY, true);
  const size = isNarrow ? NARROW : WIDE;
  const [hoverId, setHoverId] = useState(null);
  const [pinnedId, setPinnedId] = useState(null);
  const sectionRef = useRef(null);

  // A pinned topic is released by Escape or by a tap anywhere outside the
  // graph section (taps on empty graph space are handled on the <svg>).
  useEffect(() => {
    if (pinnedId === null) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setPinnedId(null);
    };
    const onPointerDown = (e) => {
      if (!sectionRef.current?.contains(e.target)) setPinnedId(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [pinnedId]);

  // Touch browsers emulate mouseenter/focus on tap and never undo them, which
  // would leave a highlight stuck on. Only real hover/keyboard focus counts.
  const hoverHandlers = (node) =>
    canHover
      ? {
          onMouseEnter: () => setHoverId(node.id),
          onMouseLeave: () => setHoverId(null),
          onFocus: () => setHoverId(node.id),
          onBlur: () => setHoverId(null),
        }
      : {};

  const topicColor = useMemo(
    () => new Map(topics.map((t) => [t.id, t.color])),
    [topics],
  );
  const layout = useMemo(
    () =>
      layoutGraph(
        buildGraph(publications, topics, { rootLabel: ROOT_LABEL }),
        size,
      ),
    [publications, topics, size],
  );
  const nodeById = useMemo(
    () => new Map(layout.nodes.map((n) => [n.id, n])),
    [layout],
  );

  const activeId = hoverId || pinnedId;
  const active = connectedIds(activeId, layout.links);
  const isDimmed = (id) => active !== null && !active.has(id);

  const activate = (node) => {
    if (node.kind === "paper") {
      onSelectPaper(node.paperId);
      return;
    }
    // Hover already highlights topics on mouse devices; touch screens have no
    // hover, so there a tap toggles a pinned highlight instead.
    if (canHover) return;
    setPinnedId((current) => (current === node.id ? null : node.id));
  };

  const onKeyDown = (node) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate(node);
    }
  };

  const nodeLabel = (node) => {
    if (node.kind === "topic") return `${node.label} topic`;
    const name = node.name ? `${node.name}, ` : "";
    return `${name}${node.label}: ${node.title}. Jump to paper.`;
  };

  return (
    <section
      ref={sectionRef}
      className="research-graph"
      aria-labelledby="research-graph-title"
    >
      <h2 id="research-graph-title">Research Map</h2>

      <svg
        className="rg-canvas"
        viewBox={`0 0 ${size.width} ${size.height}`}
        onMouseLeave={() => setHoverId(null)}
        onClick={(e) => {
          if (!e.target.closest(".rg-node")) setPinnedId(null);
        }}
      >
        <defs>
          {topics.map((t) => (
            <radialGradient key={t.id} id={`rg-glow-${t.id}`}>
              <stop offset="0%" stopColor={t.color} stopOpacity="0.16" />
              <stop offset="100%" stopColor={t.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        <g className="rg-glows" aria-hidden="true">
          {layout.nodes
            .filter((n) => n.kind === "topic")
            .map((node) => (
              <circle
                key={node.id}
                className={`rg-glow ${activeId === node.id ? "is-active" : ""} ${
                  isDimmed(node.id) ? "is-dimmed" : ""
                }`}
                cx={node.x}
                cy={node.y}
                r={isNarrow ? GLOW_RADIUS.narrow : GLOW_RADIUS.wide}
                fill={`url(#rg-glow-${node.id.slice("topic:".length)})`}
              />
            ))}
        </g>

        <g className="rg-links">
          {layout.links.map(({ source, target }) => {
            const s = nodeById.get(source);
            const t = nodeById.get(target);
            const highlighted =
              active !== null && active.has(source) && active.has(target);
            return (
              <line
                key={`${source}-${target}`}
                className={`rg-link ${highlighted ? "is-active" : ""} ${
                  isDimmed(source) || isDimmed(target) ? "is-dimmed" : ""
                }`}
                x1={s.x}
                y1={s.y}
                x2={t.x}
                y2={t.y}
                stroke={s.color || t.color}
              />
            );
          })}
        </g>

        <g className="rg-nodes">
          {layout.nodes.map((node) => {
            if (node.kind === "root") {
              return (
                <g
                  key={node.id}
                  className={`rg-root ${isDimmed(node.id) ? "is-dimmed" : ""}`}
                  transform={`translate(${node.x} ${node.y})`}
                  aria-hidden="true"
                >
                  <circle r={ROOT_RADIUS} />
                  <text y={ROOT_RADIUS + 16} textAnchor="middle">
                    {node.label}
                  </text>
                </g>
              );
            }
            const isTopic = node.kind === "topic";
            const color = isTopic ? node.color : topicColor.get(node.topics[0]);
            const radius = isTopic ? TOPIC_RADIUS : PAPER_RADIUS;
            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={nodeLabel(node)}
                aria-pressed={isTopic && !canHover ? pinnedId === node.id : undefined}
                className={`rg-node rg-${node.kind} ${
                  activeId === node.id ? "is-active" : ""
                } ${isDimmed(node.id) ? "is-dimmed" : ""}`}
                transform={`translate(${node.x} ${node.y})`}
                style={{ "--node-color": color }}
                {...hoverHandlers(node)}
                onClick={() => activate(node)}
                onKeyDown={onKeyDown(node)}
              >
                <circle className="rg-hit" r={radius + 12} />
                {isTopic && <circle className="rg-halo" r={radius + 7} />}
                <circle className="rg-dot" r={radius} />
                {isTopic && !isNarrow && (
                  <text
                    className="rg-label"
                    y={radius + 17}
                    textAnchor="middle"
                  >
                    {node.label}
                  </text>
                )}
                {!isTopic && (
                  <PaperLabel node={node} isNarrow={isNarrow} />
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {isNarrow && (
        // Phones: topic labels inside the graph collide, so topics are named
        // here instead. Tapping a chip pins the topic like tapping its node.
        <div className="rg-legend">
          {layout.nodes
            .filter((n) => n.kind === "topic")
            .map((node) => (
              <button
                key={node.id}
                type="button"
                className={`rg-legend-chip ${
                  pinnedId === node.id ? "is-active" : ""
                }`}
                style={{ "--node-color": node.color }}
                aria-pressed={pinnedId === node.id}
                onClick={() => activate(node)}
              >
                {node.label}
              </button>
            ))}
        </div>
      )}

      <p className="rg-caption" aria-live="polite">
        <Caption
          node={activeId ? nodeById.get(activeId) : null}
          publications={publications}
          topics={topics}
        />
      </p>
    </section>
  );
};

export default ResearchGraph;
