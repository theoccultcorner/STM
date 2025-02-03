const express = require("express");
const cors_proxy = require("cors-anywhere");

const app = express();
const PORT = process.env.PORT || 8080;

// Create a CORS Anywhere proxy server
cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [],
  removeHeaders: ["cookie", "cookie2"] // Prevent cookies from being forwarded
}).listen(PORT, () => {
  console.log(`CORS Proxy running on http://localhost:${PORT}`);
});
