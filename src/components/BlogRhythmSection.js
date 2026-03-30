import React from "react";

const BlogRhythmSection = ({
  id,
  sectionNumber,
  title,
  rhythmBlock,
  children,
}) => {
  return (
    <section id={id} className="blog-section">
      <div className="blog-section-head">
        <span className="blog-section-num">{sectionNumber}</span>
        <h3>{title}</h3>
      </div>

      {rhythmBlock ? (
        <div
          className={`blog-rhythm-block blog-rhythm-block-${rhythmBlock.type}`}
          data-testid="blog-rhythm-block"
        >
          {rhythmBlock.label && (
            <p className="blog-rhythm-label">{rhythmBlock.label}</p>
          )}

          {rhythmBlock.type === "quote" ? (
            <p className="blog-rhythm-quote">{rhythmBlock.content}</p>
          ) : null}

          {rhythmBlock.type === "spotlight" ? (
            <div className="blog-rhythm-items">
              {rhythmBlock.items.map((item) => (
                <span key={item} className="blog-tag blog-rhythm-tag">
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {children}
    </section>
  );
};

export default BlogRhythmSection;
