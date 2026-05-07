import React from "react";
import PretextBalancedText from "./PretextBalancedText";
import { buildLeadSummary, buildSpotlightItems } from "../lib/blogPresentation";

const youtubeEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

const BlogPostHero = ({ post }) => {
  const leadSummary = buildLeadSummary(post);
  const spotlightItems = buildSpotlightItems(post);
  const isEssay = post?.type === "essay";
  const authorPrefix = isEssay ? "by" : "Reviewed by";
  const videos = Array.isArray(post?.videos) ? post.videos : [];

  return (
    <header className="blog-post-header blog-post-hero">
      <div className="blog-post-meta">
        {post.venue ? (
          <span className="blog-post-venue">{post.venue}</span>
        ) : (
          isEssay && <span className="blog-post-venue">Essay</span>
        )}
        <time className="blog-post-date">{post.date}</time>
      </div>

      <PretextBalancedText
        as="h1"
        text={post.title}
        className="blog-post-title"
        lineClassName="blog-post-title-line"
        maxWidth={920}
        font='700 32px "Google Sans Flex"'
        lineHeight={44}
      />

      <p className="blog-post-author">
        {authorPrefix} {post.author}
      </p>

      {leadSummary && (
        <p className="blog-post-lead" data-testid="blog-lead-summary">
          {leadSummary}
        </p>
      )}

      {videos.length > 0 && (
        <div className="blog-post-videos">
          {videos.map((video, i) => {
            const embed = youtubeEmbedUrl(video.url);
            if (!embed) return null;
            return (
              <figure key={i} className="blog-post-video">
                <div className="blog-post-video-frame">
                  <iframe
                    src={embed}
                    title={video.title || `Video ${i + 1}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {video.title && (
                  <figcaption className="blog-post-video-caption">{video.title}</figcaption>
                )}
              </figure>
            );
          })}
        </div>
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
