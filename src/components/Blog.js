import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import PaperGraph from "./PaperGraph";
import PretextBalancedText from "./PretextBalancedText";
import BlogPostHero from "./BlogPostHero";
import BlogRhythmSection from "./BlogRhythmSection";
import { buildLeadSummary } from "../lib/blogPresentation";
import "../styles/Blog.css";

const sectionLabels = {
  background: "1. 연구 배경 (Research Background)",
  motivation: "2. 연구 동기 (Research Motivation)",
  objectives: "3. 연구 목적 & 문제 정의 (Objectives & Problem Statement)",
  gap: "4. 선행연구 한계점 (Research Gap)",
  questions: "5. 연구 질문 (Research Questions)",
  methodology: "6. 제안하는 방법론 (Proposed Methodology)",
  experimentDesign: "7. 실험 디자인 (Experimental Design)",
  evaluationMetrics: "8. 평가 지표 (Evaluation Metrics)",
  results: "9. 실험 결과 (Results)",
  discussion: "10. 논의 및 시사점 (Discussion)",
  contributions: "11. 연구 기여 (Contributions)",
  limitations: "12. 한계점 (Limitations)",
  originality: "13. 독창성 (Originality)",
  significance: "14. 중요성 (Significance)",
};

const sectionTocLabels = {
  background: "연구 배경",
  motivation: "연구 동기",
  objectives: "연구 목적",
  gap: "한계점",
  questions: "연구 질문",
  methodology: "방법론",
  experimentDesign: "실험 설계",
  evaluationMetrics: "평가 지표",
  results: "결과",
  discussion: "논의",
  contributions: "기여",
  limitations: "한계",
  originality: "독창성",
  significance: "중요성",
};

const sectionOrder = Object.keys(sectionLabels);

const parseTaskItem = (text) => {
  const taskMatch = text.match(/^\[( |x|X)\]\s+(.*)$/);
  if (!taskMatch) {
    return {
      text,
      checked: null,
    };
  }

  return {
    text: taskMatch[2],
    checked: taskMatch[1].toLowerCase() === "x",
  };
};

const parseTableCells = (line) => {
  if (!line || !line.includes("|")) return null;

  let normalized = line.trim();
  if (!normalized) return null;

  if (normalized.startsWith("|")) normalized = normalized.slice(1);
  if (normalized.endsWith("|")) normalized = normalized.slice(0, -1);

  const cells = normalized.split("|").map((cell) => cell.trim());
  if (cells.length < 2) return null;

  return cells;
};

const parseTableAlignment = (line, expectedColumns) => {
  const alignmentCells = parseTableCells(line);
  if (!alignmentCells) return null;
  if (expectedColumns && alignmentCells.length !== expectedColumns) return null;

  const alignments = [];
  for (const cell of alignmentCells) {
    const normalized = cell.replace(/\s+/g, "");
    if (!/^:?-{3,}:?$/.test(normalized)) {
      return null;
    }

    const startsWithColon = normalized.startsWith(":");
    const endsWithColon = normalized.endsWith(":");
    if (startsWithColon && endsWithColon) {
      alignments.push("center");
    } else if (endsWithColon) {
      alignments.push("right");
    } else {
      alignments.push("left");
    }
  }

  return alignments;
};

const isTableStart = (lines, index) => {
  if (index + 1 >= lines.length) return false;

  const headerCells = parseTableCells(lines[index]);
  if (!headerCells) return false;

  const alignments = parseTableAlignment(lines[index + 1], headerCells.length);
  return Boolean(alignments);
};

const parseInlineMarkdown = (text, keyPrefix) => {
  const inlinePattern = /(\*\*[^*]+?\*\*|`[^`]+`|\*[^*\n]+?\*|\[[^\]]+\]\([^)]+\))/g;
  const nodes = [];
  let lastIndex = 0;
  let match;
  let tokenIndex = 0;

  while ((match = inlinePattern.exec(text)) !== null) {
    const token = match[0];

    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={`${keyPrefix}-strong-${tokenIndex}`}>{token.slice(2, -2)}</strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      nodes.push(<em key={`${keyPrefix}-em-${tokenIndex}`}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("`") && token.endsWith("`")) {
      nodes.push(<code key={`${keyPrefix}-code-${tokenIndex}`}>{token.slice(1, -1)}</code>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (!linkMatch) {
        nodes.push(token);
      } else {
        const [, label, href] = linkMatch;
        const isExternal = /^(https?:)?\/\//.test(href);
        nodes.push(
          <a
            key={`${keyPrefix}-link-${tokenIndex}`}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
          >
            {label}
          </a>
        );
      }
    }

    lastIndex = inlinePattern.lastIndex;
    tokenIndex += 1;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

const renderInlineWithLineBreaks = (text, keyPrefix) => {
  const lines = text.split("\n");
  return lines.flatMap((line, lineIndex) => {
    const fragments = parseInlineMarkdown(line, `${keyPrefix}-line-${lineIndex}`);
    if (lineIndex === lines.length - 1) {
      return fragments;
    }
    return [...fragments, <br key={`${keyPrefix}-br-${lineIndex}`} />];
  });
};

const buildSectionRhythmBlock = () => null;

const parseMarkdownBlocks = (rawContent) => {
  const content = (rawContent || "").replace(/\r\n/g, "\n");
  const lines = content.split("\n");
  const blocks = [];
  let lineIndex = 0;

  while (lineIndex < lines.length) {
    const line = lines[lineIndex];
    const trimmed = line.trim();

    if (!trimmed) {
      lineIndex += 1;
      continue;
    }

    const codeFenceMatch = trimmed.match(/^```(\w+)?$/);
    if (codeFenceMatch) {
      const language = codeFenceMatch[1] || "";
      const codeLines = [];
      lineIndex += 1;

      while (lineIndex < lines.length && !lines[lineIndex].trim().startsWith("```")) {
        codeLines.push(lines[lineIndex]);
        lineIndex += 1;
      }

      if (lineIndex < lines.length) {
        lineIndex += 1;
      }

      blocks.push({
        type: "code",
        language,
        content: codeLines.join("\n"),
      });
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      lineIndex += 1;
      continue;
    }

    if (isTableStart(lines, lineIndex)) {
      const headerCells = parseTableCells(lines[lineIndex]);
      const alignments = parseTableAlignment(lines[lineIndex + 1], headerCells.length);
      const rows = [];
      lineIndex += 2;

      while (lineIndex < lines.length) {
        const rowLine = lines[lineIndex];
        if (!rowLine.trim()) break;

        const rowCells = parseTableCells(rowLine);
        if (!rowCells || rowCells.length !== headerCells.length) {
          break;
        }

        rows.push(rowCells);
        lineIndex += 1;
      }

      blocks.push({
        type: "table",
        header: headerCells,
        alignments,
        rows,
      });
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quoteLines = [];
      while (lineIndex < lines.length && /^\s*>\s?/.test(lines[lineIndex])) {
        quoteLines.push(lines[lineIndex].replace(/^\s*>\s?/, "").trimEnd());
        lineIndex += 1;
      }
      blocks.push({
        type: "blockquote",
        text: quoteLines.join("\n").trim(),
      });
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const items = [];
      while (lineIndex < lines.length && /^\s*[-*+]\s+/.test(lines[lineIndex])) {
        const itemText = lines[lineIndex].replace(/^\s*[-*+]\s+/, "").trim();
        items.push(parseTaskItem(itemText));
        lineIndex += 1;
      }
      blocks.push({
        type: "unordered-list",
        items,
      });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (lineIndex < lines.length && /^\s*\d+\.\s+/.test(lines[lineIndex])) {
        const itemText = lines[lineIndex].replace(/^\s*\d+\.\s+/, "").trim();
        items.push(parseTaskItem(itemText));
        lineIndex += 1;
      }
      blocks.push({
        type: "ordered-list",
        items,
      });
      continue;
    }

    const paragraphLines = [line.trimEnd()];
    lineIndex += 1;
    while (lineIndex < lines.length) {
      const nextLine = lines[lineIndex];
      const nextTrimmed = nextLine.trim();

      if (!nextTrimmed) {
        break;
      }

      if (
        nextTrimmed.startsWith("```") ||
        /^(#{1,6})\s+/.test(nextTrimmed) ||
        isTableStart(lines, lineIndex) ||
        /^\s*>\s?/.test(nextLine) ||
        /^\s*[-*+]\s+/.test(nextLine) ||
        /^\s*\d+\.\s+/.test(nextLine)
      ) {
        break;
      }

      paragraphLines.push(nextLine.trimEnd());
      lineIndex += 1;
    }

    blocks.push({
      type: "paragraph",
      text: paragraphLines.join("\n").trim(),
    });
  }

  return blocks;
};

const MarkdownRenderer = ({ content }) => {
  const blocks = parseMarkdownBlocks(content);

  return (
    <div className="blog-markdown">
      {blocks.map((block, blockIndex) => {
        if (block.type === "heading") {
          const headingLevel = Math.min(6, block.level + 3);
          const HeadingTag = `h${headingLevel}`;
          return (
            <HeadingTag key={`block-${blockIndex}`}>
              {renderInlineWithLineBreaks(block.text, `heading-${blockIndex}`)}
            </HeadingTag>
          );
        }

        if (block.type === "unordered-list") {
          const hasTaskItems = block.items.some((item) => item.checked !== null);
          return (
            <ul key={`block-${blockIndex}`} className={hasTaskItems ? "task-list" : undefined}>
              {block.items.map((item, itemIndex) => (
                <li
                  key={`block-${blockIndex}-item-${itemIndex}`}
                  className={item.checked !== null ? "task-list-item" : undefined}
                >
                  {item.checked === null ? (
                    renderInlineWithLineBreaks(item.text, `ul-${blockIndex}-${itemIndex}`)
                  ) : (
                    <label className="task-list-control">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        readOnly
                        aria-label={item.checked ? "checked" : "unchecked"}
                      />
                      <span className="task-list-text">
                        {renderInlineWithLineBreaks(item.text, `ul-${blockIndex}-${itemIndex}`)}
                      </span>
                    </label>
                  )}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol key={`block-${blockIndex}`}>
              {block.items.map((item, itemIndex) => (
                <li
                  key={`block-${blockIndex}-item-${itemIndex}`}
                  className={item.checked !== null ? "task-list-item" : undefined}
                >
                  {item.checked === null ? (
                    renderInlineWithLineBreaks(item.text, `ol-${blockIndex}-${itemIndex}`)
                  ) : (
                    <label className="task-list-control">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        readOnly
                        aria-label={item.checked ? "checked" : "unchecked"}
                      />
                      <span className="task-list-text">
                        {renderInlineWithLineBreaks(item.text, `ol-${blockIndex}-${itemIndex}`)}
                      </span>
                    </label>
                  )}
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "table") {
          return (
            <div key={`block-${blockIndex}`} className="blog-table-wrap">
              <table>
                <thead>
                  <tr>
                    {block.header.map((cell, cellIndex) => (
                      <th
                        key={`block-${blockIndex}-head-${cellIndex}`}
                        className={`table-align-${block.alignments[cellIndex] || "left"}`}
                      >
                        {renderInlineWithLineBreaks(cell, `table-head-${blockIndex}-${cellIndex}`)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`block-${blockIndex}-row-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`block-${blockIndex}-row-${rowIndex}-cell-${cellIndex}`}
                          className={`table-align-${block.alignments[cellIndex] || "left"}`}
                        >
                          {renderInlineWithLineBreaks(
                            cell,
                            `table-cell-${blockIndex}-${rowIndex}-${cellIndex}`
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote key={`block-${blockIndex}`}>
              {renderInlineWithLineBreaks(block.text, `quote-${blockIndex}`)}
            </blockquote>
          );
        }

        if (block.type === "code") {
          return (
            <pre key={`block-${blockIndex}`} data-language={block.language || undefined}>
              <code>{block.content}</code>
            </pre>
          );
        }

        return (
          <p key={`block-${blockIndex}`}>
            {renderInlineWithLineBreaks(block.text, `paragraph-${blockIndex}`)}
          </p>
        );
      })}
    </div>
  );
};

// Blog list page
const BlogList = ({ posts }) => {
  return (
    <section className="blog">
      <h2>Blog</h2>
      <p className="blog-subtitle">Weekly paper reviews by our AI research agents</p>

      <PaperGraph posts={posts} />

      <div className="blog-list">
        {posts.map((post) => (
          <Link key={post.id} to={`/blog/${post.id}`} className="blog-card">
            {post.thumbnail && (
              <div className="blog-card-image">
                <img src={`${process.env.PUBLIC_URL}${post.thumbnail}`} alt={post.title} />
              </div>
            )}
            <div className="blog-card-content">
              <div className="blog-card-meta">
                <span className="blog-card-date">{post.date}</span>
                <span className="blog-card-venue">{post.venue}</span>
              </div>
              <PretextBalancedText
                as="h3"
                text={post.title}
                className="blog-card-title"
                lineClassName="blog-card-title-line"
                maxWidth={720}
                font='600 16px "SUIT"'
                lineHeight={22}
              />
              <p className="blog-card-author">by {post.author}</p>
              {buildLeadSummary(post) ? (
                <p className="blog-card-preview">{buildLeadSummary(post)}</p>
              ) : null}
              <div className="blog-card-tags">
                {post.tags.map((tag, i) => (
                  <span key={i} className="blog-tag">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

// Single post page
const BlogPost = ({ posts }) => {
  const { postId } = useParams();
  const post = posts.find((p) => p.id === postId);
  const [activeSection, setActiveSection] = useState(null);

  const availableSections = useMemo(
    () => (post ? sectionOrder.filter((key) => post.sections[key]) : []),
    [post]
  );

  useEffect(() => {
    if (!post) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    availableSections.forEach((key) => {
      const el = document.getElementById(`section-${key}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [post, availableSections]);

  if (!post) {
    return (
      <section className="blog">
        <h2>Post not found</h2>
        <Link to="/blog">Back to Blog</Link>
      </section>
    );
  }

  const sectionNumber = (key) => {
    const label = sectionLabels[key] || "";
    const match = label.match(/^(\d+)\./);
    return match ? match[1] : "";
  };

  const sectionTitle = (key) => {
    const label = sectionLabels[key] || "";
    return label.replace(/^\d+\.\s*/, "");
  };

  const sectionTocTitle = (key) => sectionTocLabels[key] || sectionTitle(key);

  return (
    <article className="blog-post">
      <Link to="/blog" className="blog-back">Back to Blog</Link>

      <BlogPostHero post={post} />

      <div className="blog-post-layout">
        <nav className="blog-toc" aria-label="Table of contents">
          <p className="blog-toc-title">Contents</p>
          <ol className="blog-toc-list">
            {availableSections.map((key) => (
              <li
                key={key}
                className={activeSection === `section-${key}` ? "active" : ""}
              >
                <a
                  href={`#section-${key}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`section-${key}`)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="toc-num">{sectionNumber(key)}</span>
                  <span className="toc-text">{sectionTocTitle(key)}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="blog-post-body">
          {availableSections.map((key) => (
            <BlogRhythmSection
              key={key}
              id={`section-${key}`}
              sectionNumber={sectionNumber(key)}
              title={sectionTitle(key)}
              rhythmBlock={buildSectionRhythmBlock(post, key)}
            >
              <MarkdownRenderer content={post.sections[key]} />
            </BlogRhythmSection>
          ))}
        </div>
      </div>
    </article>
  );
};

// Main Blog component with routing
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/blog/posts.json?v=${Date.now()}`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load posts:", err));
  }, []);

  if (postId) {
    return <BlogPost posts={posts} />;
  }
  return <BlogList posts={posts} />;
};

export default Blog;
