import "./db";   // connects to MongoDB
import app from "./app";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
