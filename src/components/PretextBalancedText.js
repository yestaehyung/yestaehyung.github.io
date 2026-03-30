import React, { useMemo } from "react";
import { getBalancedLines } from "../lib/pretextLayout";

const PretextBalancedText = ({
  text,
  as: Tag = "div",
  className = "",
  lineClassName = "",
  maxWidth = 320,
  maxLines,
  font,
  lineHeight,
  prepareOptions,
  ...rest
}) => {
  const lines = useMemo(() => {
    const balanced = getBalancedLines(text, {
      maxWidth,
      font,
      lineHeight,
      prepareOptions,
    });
    return maxLines ? balanced.slice(0, maxLines) : balanced;
  }, [font, lineHeight, maxLines, maxWidth, prepareOptions, text]);

  return (
    <Tag className={className} {...rest}>
      {lines.map((line, index) => (
        <span
          key={`${line}-${index}`}
          className={lineClassName}
          data-testid="balanced-text-line"
        >
          {line}
        </span>
      ))}
    </Tag>
  );
};

export default PretextBalancedText;
