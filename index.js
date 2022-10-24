var express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(express.json());

app.use(cors({ origin: ["http://localhost:3000"] }));

app.get("/", function (req, res) {
  res.send("Hello!");
});

let articles = [
  {
    id: "fb20005e-7244-4573-b758-efa9225a5f17",
    title: "Title 1",
    content: "Content 1",
  },
  {
    id: "a6670985-77c6-4af8-8033-3fd77c53cd3c",
    title: "Title 2",
    content: "Content 2",
  },
  {
    id: "1ac3fc37-145b-4cda-a809-aaca7ee431c5",
    title: "Title 3",
    content: "Content 3",
  },
  {
    id: "2a8bb3f2-db39-4dc3-aa72-63e83ee02ff7",
    title: "Title 4",
    content: "Content 4",
  },
];

app.post("/articles", function (req, res) {
  const { title, content } = req.body || {};

  if (!title || !content) {
    return res.status(500).send("Invalid request!");
  }

  const article = {
    id: uuidv4(),
    title,
    content,
  };

  articles.push(article);

  res.json(article);
});

app.patch("/articles/:id", function (req, res) {
  const { id } = req.params;

  const { title, content } = req.body || {};

  if (!title || !content || !id) {
    return res.status(500).send("Invalid request!");
  }

  articles = articles.map((article) =>
    article.id === id ? { ...article, title, content } : article
  );

  res.json({ id, title, content });
});

app.get("/articles", function (req, res) {
  res.json(articles);
});

app.get("/articles/:id", function (req, res) {
  const { id } = req.params;

  const article = articles.find((article) => article.id === id);

  res.json(article);
});

app.delete("/articles/:id", function (req, res) {
  const { id } = req.params;

  articles = articles.filter((article) => article.id !== id);

  return res.status(200).sendStatus(200);
});

app.get("/articles-total", function (req, res) {
  res.json({ total: articles.length });
});

var server = app.listen(8081, function () {
  var port = server.address().port;

  console.log("App listening at http://localhost:%s", port);
});
