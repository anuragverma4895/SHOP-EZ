// Fallback entry for Render default `node index.js`
import("./backend/server.js").catch((err) => {
    console.error("Failed to start server from root index.js:", err);
    process.exit(1);
});
