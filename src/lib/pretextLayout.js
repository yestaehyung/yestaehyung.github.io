export function getBalancedLines(text, options = {}) {
  const value = typeof text === "string" ? text : "";
  const trimmed = value.trim();

  if (!trimmed) {
    return [value];
  }

  const maxWidth = Number(options.maxWidth) || 320;
  const lineHeight = Number(options.lineHeight) || 28;
  const font = options.font || '600 32px "Google Sans Flex"';

  try {
    const { prepareWithSegments, layoutWithLines } = require("@chenglou/pretext");
    const prepared = prepareWithSegments(trimmed, font, options.prepareOptions);
    const result = layoutWithLines(prepared, maxWidth, lineHeight);
    const lines = (result?.lines || [])
      .map((line) => line?.text || "")
      .filter(Boolean);

    return lines.length ? lines : [trimmed];
  } catch (error) {
    return [trimmed];
  }
}
