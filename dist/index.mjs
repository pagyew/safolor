function safolor(color) {
  if (typeof color !== "string")
    throw new TypeError("Expected a string");
  const hex = color.match(
    /^#(?:([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?|([\da-f]{1})([\da-f]{1})([\da-f]{1})([\da-f]{1})?)$/i
  );
  if (hex === null)
    throw new SyntaxError("Expected a HEX format");
  const [_, rr, gg, bb, __, r, g, b, ___] = hex;
  const R = rr || r.padEnd(2, r);
  const G = gg || g.padEnd(2, g);
  const B = bb || b.padEnd(2, b);
  const nR = (Math.round(Number.parseInt(R, 16) / 51) * 51).toString(16);
  const nG = (Math.round(Number.parseInt(G, 16) / 51) * 51).toString(16);
  const nB = (Math.round(Number.parseInt(B, 16) / 51) * 51).toString(16);
  return `#${nR.padEnd(2, nR)}${nG.padEnd(2, nG)}${nB.padEnd(2, nB)}`;
}

export { safolor };
