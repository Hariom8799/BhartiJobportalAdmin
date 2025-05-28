// lib/cors.js
export function handleCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Or your frontend origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).end(); // No content
    return true; // Signal to skip further handling
  }

  return false; // Continue with main logic
}
