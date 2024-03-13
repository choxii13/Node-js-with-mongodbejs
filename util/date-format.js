function dateFormat(blog) {
  blog.newDate = blog.date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  blog.date = blog.date.toISOString();
}

module.exports = dateFormat;
