import React from "react";
import PretextBalancedText from "./PretextBalancedText";
import { buildLeadSummary, buildSpotlightItems } from "../lib/blogPresentation";

const BlogPostHero = ({ post }) => {
  const leadSummary = buildLeadSummary(post);
  const spotlightItems = buildSpotlightItems(post);

  return (
    <header className="blog-post-header blog-post-hero">
      <div className="blog-post-meta">
        <span className="blog-post-venue">{post.venue}</span>
        <time className="blog-post-date">{post.date}</time>
      </div>

      <PretextBalancedText
        as="h1"
        text={post.title}
        className="blog-post-title"
        lineClassName="blog-post-title-line"
        maxWidth={920}
        font='700 32px "SUIT"'
        lineHeight={44}
      />

      <p className="blog-post-author">Reviewed by {post.author}</p>

      {leadSummary && (
        <PretextBalancedText
          as="p"
          text={leadSummary}
          className="blog-post-lead"
          lineClassName="blog-post-lead-line"
          maxWidth={920}
          font='400 15px "SUIT"'
          lineHeight={24}
          data-testid="blog-lead-summary"
        />
      )}

      {spotlightItems.length > 0 && (
        <div className="blog-post-spotlight">
          {spotlightItems.map((item) => (
            <span key={item} className="blog-tag blog-spotlight-tag">
              {item}
            </span>
          ))}
        </div>
      )}

      <div className="blog-post-tags">
        {post.tags.map((tag, i) => (
          <span key={i} className="blog-tag">
            {tag}
          </span>
        ))}
      </div>
    </header>
  );
};

export default BlogPostHero;
