import React from "react";
import PretextBalancedText from "./PretextBalancedText";

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
        <PretextBalancedText
          as="h3"
          text={title}
          className="blog-section-title"
          lineClassName="blog-section-title-line"
          maxWidth={720}
          font='600 17px "SUIT"'
          lineHeight={24}
        />
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
            <PretextBalancedText
              as="p"
              text={rhythmBlock.content}
              className="blog-rhythm-quote"
              lineClassName="blog-rhythm-quote-line"
              maxWidth={920}
              font='400 15px "SUIT"'
              lineHeight={24}
            />
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
