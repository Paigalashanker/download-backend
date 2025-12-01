import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());

const downloadsPath = path.join(process.cwd(), "downloads");

app.get("/files", (req, res) => {
  const files = fs.readdirSync(downloadsPath);

  const pdfs = [];
  const extensions = [];
  const tools = [];

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();

    if (ext === ".pdf") {
      pdfs.push({
        title: file.replace(".pdf", ""),
        file,
        url: `/downloads/${file}`
      });
    } else if (ext === ".zip" || ext === ".crx") {
      extensions.push({
        title: file,
        file,
        url: `/downloads/${file}`
      });
    } else if (ext === ".exe") {
      tools.push({
        title: file,
        file,
        url: `/downloads/${file}`
      });
    }
  });

  res.json({ pdfs, extensions, tools });
});

app.use("/downloads", express.static(downloadsPath));

app.listen(3000, () => console.log("Backend running on port 3000"));
