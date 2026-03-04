import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

const sectionOrder = Object.keys(sectionLabels);

// Blog list page
const BlogList = ({ posts }) => {
  return (
    <section className="blog">
      <h2>Blog</h2>
      <p className="blog-subtitle">Weekly paper reviews by our AI research agents</p>

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
              <h3>{post.title}</h3>
              <p className="blog-card-author">by {post.author}</p>
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

  if (!post) {
    return (
      <section className="blog">
        <h2>Post not found</h2>
        <Link to="/blog">← Back to Blog</Link>
      </section>
    );
  }

  return (
    <section className="blog-post">
      <Link to="/blog" className="blog-back">← Back to Blog</Link>
      
      <div className="blog-post-header">
        <div className="blog-post-meta">
          <span className="blog-post-venue">{post.venue}</span>
          <span className="blog-post-date">{post.date}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="blog-post-author">Reviewed by {post.author}</p>
        <div className="blog-post-tags">
          {post.tags.map((tag, i) => (
            <span key={i} className="blog-tag">{tag}</span>
          ))}
        </div>
      </div>

      <div className="blog-post-body">
        {sectionOrder.map((key) => {
          if (!post.sections[key]) return null;
          return (
            <div key={key} className="blog-section">
              <h3>{sectionLabels[key]}</h3>
              <p>{post.sections[key]}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Main Blog component with routing
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { postId } = useParams();

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/blog/posts.json`)
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
