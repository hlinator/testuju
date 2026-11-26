export function whoIs(k) {
  if (!k) return null;
  if (process.env.TOKEN_ON && k === process.env.TOKEN_ON) return "on";
  if (process.env.TOKEN_ONA && k === process.env.TOKEN_ONA) return "ona";
  return null;
}
