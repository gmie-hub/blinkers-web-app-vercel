const express = require('express');
const path = require('path');
const prerender = require('prerender-node');

const app = express();

// 👇 Set your prerender token from your Prerender.io account
prerender.set('prerenderToken', 'YOUR_PRERENDER_TOKEN');

// Use prerender middleware
app.use(prerender);

// Serve static files from Vite's build output
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA fallback (for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
