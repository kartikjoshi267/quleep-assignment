import { useEffect, useState } from "react";
import CloudinaryUpload from "../components/CloudinaryUpload";
import { useAppContext } from "../context/appContext";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: "",
  });
  const { postId } = useParams();
  const { editPostById, getPostById } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostById(postId);
      if (post) {
        setPost({
          title: post.title,
          content: post.content,
          image: post.image
        });
      }
    };
    fetchPost();
  }, [postId]);

  const onChangeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const editPostHandler = async (e) => {
    e.preventDefault();
    const success = await editPostById(postId, post);
    if (success) {
      navigate("/");
    }
  };

  const onUploadSuccess = (imageUrl) => {
    setPost({
      ...post,
      image: imageUrl,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Post</h1>
        <form onSubmit={editPostHandler} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={post.title}
              onChange={onChangeHandler}
              placeholder="Post Title"
              className="mt-1 block w-full rounded-md border-gray-300 border-2 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={onChangeHandler}
              placeholder="Post Content"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 border-2 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <CloudinaryUpload initialImageUrl={post.image} onUploadSuccess={onUploadSuccess} />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
