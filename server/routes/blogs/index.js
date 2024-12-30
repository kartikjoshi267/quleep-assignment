import { Router } from "express";
import authenticate from "../../middlewares/authentication.js";
import Blogs from "../../models/Blogs.js";
import User from "../../models/User.js";

const router = Router();

// add Blog
router.post("/posts", authenticate, async (req, res) => {
  try {
    const blog = await Blogs.create({
      title: req.body.title,
      author: req.user.user.id,
      content: req.body.content,
      tag: req.body.tag,
      image: req.body.image
    });

    let blogsFetched = await User.findById(req.user.user.id).select("blogs");
    blogsFetched.blogs.push(blog._id);
    await User.updateOne(
      { _id: blogsFetched._id },
      {
        $set: {
          blogs: blogsFetched.blogs,
        },
      }
    );
    
    const allBlogs = await Blogs.find({ author: req.user.user.id }).populate("author");
    res.status(200).json(allBlogs);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all Blogs
router.get("/posts", async (req, res) => {
  try {
    const allBlogs = await Blogs.find().populate("author");
    res.status(200).json(allBlogs);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(e);
  }
});

// edit Blog
router.put("/posts/:id", authenticate, async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (blog.author != req.user.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    await Blogs.updateOne(
      { _id: req.params.id },
      {
        $set: {
          ...req.body.blog,
        },
      }
    );

    const updatedBlog = await Blogs.findById(req.params.id).populate("author");
    res.status(200).json(updatedBlog);
  } catch (e) {
    console.log(e);
    
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get Blog
router.get("/posts/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const blog = await Blogs.findById(_id).populate("author");
    res.status(200).json(blog);
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// delete Blog
router.delete("/posts/:id", authenticate, async (req, res) => {
  try {
    await Blogs.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (e) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
