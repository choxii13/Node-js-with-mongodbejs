const mongodb = require("mongodb");
const db = require("../data/database");
const { ObjectId } = mongodb;

class Blogs {
  constructor(id) {
    if (id) {
      this.id = new ObjectId(id);
    }
  }

  static async fetchAllPosts() {
    const posts = await db.getDb().collection("posts").find().toArray();
    return posts;
  }

  static async fetchAuthors() {
    const posts = await db.getDb().collection("authors").find().toArray();
    return posts;
  }

  async findOne() {
    const blog = await db.getDb().collection("posts").findOne({ _id: this.id });
    return blog;
  }

  async postBlog(data) {
    if (!data) {
      const author = await db
        .getDb()
        .collection("authors")
        .findOne({ _id: this.id });
      return author;
    }
    const postBlog = await db.getDb().collection("posts").insertOne(data);
    return postBlog;
  }

  async updateOne(data) {
    const updatedData = await db.getDb().collection("posts").updateOne(
      { _id: this.id },
      {
        $set: data,
      }
    );
    return updatedData;
  }

  async deleteOne() {
    const deletedBlog = await db
      .getDb()
      .collection("posts")
      .deleteOne({ _id: this.id });
    return deletedBlog;
  }
}

module.exports = Blogs;
