const Blogs = require("../model/blog-model");
const dateFormat = require("../util/date-format");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

function getHome(req, res) {
  res.redirect("/posts");
}

async function getAllBlogs(req, res) {
  const blogs = await Blogs.fetchAllPosts();
  res.render("posts-list", { blogs });
}

async function getBlog(req, res) {
  const data = new Blogs(req.params.id);
  const blog = await data.findOne();
  dateFormat(blog);
  res.render("post-detail", { blog });
}

async function getAuthors(req, res) {
  const authors = await Blogs.fetchAuthors();
  res.render("create-post", { authors });
}

async function postBlog(req, res) {
  const blog = new Blogs(req.body.author);
  const author = await blog.postBlog();
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
  await blog.postBlog(blogData);
  res.redirect("/posts");
}

async function getUpdatedBlog(req, res) {
  const data = new Blogs(req.params.id);
  const blog = await data.findOne();
  res.render("update-post", { blog });
}

async function updateBlog(req, res) {
  const blog = new Blogs(req.params.id);
  const data = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
  };

  await blog.updateOne(data);
  res.redirect("/posts");
}

async function deleteBlog(req, res) {
  const data = new Blogs(req.params.id);
  await data.deleteOne();
  res.redirect("/posts");
}

module.exports = {
  getHome,
  getAllBlogs,
  getBlog,
  getAuthors,
  postBlog,
  getUpdatedBlog,
  updateBlog,
  deleteBlog,
};
