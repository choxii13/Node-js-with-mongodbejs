const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog-controller");

router.get("/", blogController.getHome);

router.get("/posts", blogController.getAllBlogs);

router.get("/post/:id", blogController.getBlog);

router.get("/new-post", blogController.getAuthors);

router.post("/new-post", blogController.postBlog);

router.get("/post/:id/edit", blogController.getUpdatedBlog);

router.post("/post/:id/edit", blogController.updateBlog);

router.post("/post/:id/delete", blogController.deleteBlog);

router.get("*", function (req, res) {
  res.status(404).render("404");
});

module.exports = router;
