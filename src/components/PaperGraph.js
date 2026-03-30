import React, { useMemo, useCallback, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ForceGraph2D from "react-force-graph-2d";
import "../styles/PaperGraph.css";

const TAG_COLORS = [
  "#4a7ab5", "#e07b54", "#5bab7b", "#c75d8a",
  "#8b7ec8", "#d4a843", "#5fa8b8", "#cf6c6c",
];

const truncateTitle = (title, maxLen = 30) => {
  if (!title || title.length <= maxLen) return title || "";
  return `${title.slice(0, maxLen)}...`;
};

const buildGraphData = (posts) => {
  if (!posts || !posts.length) return { nodes: [], links: [] };

  const allTags = [...new Set(posts.flatMap((p) => p.tags || []))];
  const tagColorMap = {};
  allTags.forEach((tag, i) => {
    tagColorMap[tag] = TAG_COLORS[i % TAG_COLORS.length];
  });

  const nodes = posts.map((post) => ({
    id: post.id,
    label: truncateTitle(post.title),
    fullTitle: post.title,
    tags: post.tags || [],
    color: tagColorMap[post.tags?.[0]] || TAG_COLORS[0],
    date: post.date,
  }));

  const links = [];
  for (let i = 0; i < posts.length; i++) {
    for (let j = i + 1; j < posts.length; j++) {
      const tagsA = new Set(posts[i].tags || []);
      const tagsB = posts[j].tags || [];
      const shared = tagsB.filter((t) => tagsA.has(t));
      if (shared.length > 0) {
        links.push({
          source: posts[i].id,
          target: posts[j].id,
          sharedTags: shared,
          strength: shared.length,
        });
      }
    }
  }

  return { nodes, links };
};

const PaperGraph = ({ posts }) => {
  const navigate = useNavigate();
  const graphRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 360 });
  const [hoveredNode, setHoveredNode] = useState(null);

  const graphData = useMemo(() => buildGraphData(posts), [posts]);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: Math.min(400, Math.max(300, rect.width * 0.5)),
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force("charge").strength(-200);
      graphRef.current.d3Force("link").distance(80);
    }
  }, [graphData]);

  const handleNodeClick = useCallback(
    (node) => {
      navigate(`/blog/${node.id}`);
    },
    [navigate]
  );

  const paintNode = useCallback(
    (node, ctx, globalScale) => {
      const isHovered = hoveredNode === node.id;
      const radius = isHovered ? 7 : 5;

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = node.color;
      ctx.fill();

      if (isHovered) {
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Label
      const fontSize = isHovered ? 11 / globalScale : 9 / globalScale;
      ctx.font = `${isHovered ? "600" : "400"} ${fontSize}px SUIT, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = isHovered ? "#1a1a1a" : "#666";
      ctx.fillText(node.label, node.x, node.y + radius + 2);
    },
    [hoveredNode]
  );

  const paintLink = useCallback((link, ctx) => {
    const opacity = Math.min(0.15 + link.strength * 0.12, 0.5);
    ctx.strokeStyle = `rgba(150, 150, 150, ${opacity})`;
    ctx.lineWidth = Math.min(link.strength * 0.8, 3);
    ctx.beginPath();
    ctx.moveTo(link.source.x, link.source.y);
    ctx.lineTo(link.target.x, link.target.y);
    ctx.stroke();
  }, []);

  if (!posts || posts.length < 2) return null;

  return (
    <div className="paper-graph" ref={containerRef}>
      <div className="paper-graph-header">
        <h3>Paper Network</h3>
        <span className="paper-graph-hint">
          {posts.length} papers · click to read · drag to explore
        </span>
      </div>
      <div className="paper-graph-canvas">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeCanvasObject={paintNode}
          nodePointerAreaPaint={(node, color, ctx) => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
          }}
          linkCanvasObject={paintLink}
          onNodeClick={handleNodeClick}
          onNodeHover={(node) => setHoveredNode(node?.id || null)}
          cooldownTicks={60}
          enableZoomInteraction={false}
          backgroundColor="transparent"
        />
      </div>
      {hoveredNode && (
        <div className="paper-graph-tooltip">
          {graphData.nodes.find((n) => n.id === hoveredNode)?.fullTitle}
        </div>
      )}
    </div>
  );
};

export default PaperGraph;
