const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();
const db = require("../data/database");
const {
  findOne,
  find,
  insertOne,
  updateOne,
  deleteOne,
} = require("../util/mongoQuery");
const ObjectId = mongodb.ObjectId;

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const blogs = await find("posts");
  if (!blogs) {
    return res.status(404).render(404);
  }
  res.render("posts-list", { blogs });
});

router.get("/post/:id", async function (req, res) {
  const blog = await findOne("posts", req.params.id, {
    title: 1,
    summary: 1,
    "author.name": 1,
  });

  blog.newDate = blog.date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  blog.date = blog.date.toISOString();
  if (!blog) {
    return res.status(404).render(404);
  }
  res.render("post-detail", { blog });
});

router.get("/new-post", async function (req, res) {
  const authors = await find("authors");
  res.render("create-post", { authors });
});

router.post("/new-post", async function (req, res) {
  const author = await findOne("authors", req.body.author);

  const blogData = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: new ObjectId(req.body.author),
      name: author.name,
      email: author.email,
    },
  };
  await insertOne("posts", blogData);
  res.redirect("/posts");
});

router.get("/post/:id/edit", async function (req, res) {
  const blog = await findOne("posts", req.params.id, {
    title: 1,
    summary: 1,
    "author.name": 1,
  });
  if (!blog) {
    return res.status(404).render(404);
  }
  res.render("update-post", { blog });
});

router.post("/post/:id/edit", async function (req, res) {
  const data = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
  };
  await updateOne(req.params.id, data);
  res.redirect("/posts");
});

router.post("/post/:id/delete", async function (req, res) {
  await deleteOne("posts", req.params.id);
  res.redirect("/posts");
});

module.exports = router;
