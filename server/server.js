import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend-search-location")));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

