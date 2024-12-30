import { useState } from "react";
import CloudinaryUpload from "../components/CloudinaryUpload";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        image: "",
    });
    const { createPost } = useAppContext();
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const createPostHandler = async (e) => {
        e.preventDefault();
        console.log(post);
        const success = await createPost(post);
        if (success) {
            setPost({
                title: "",
                content: "",
                image: "",
            });
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg space-y-8 bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-900 text-center">
                    Create Post
                </h1>
                <form className="space-y-4" onSubmit={createPostHandler}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={post.title}
                        onChange={onChangeHandler}
                        name="title"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <textarea
                        placeholder="Content"
                        value={post.content}
                        onChange={onChangeHandler}
                        name="content"
                        rows="4"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <CloudinaryUpload onUploadSuccess={onUploadSuccess} />
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

export default CreatePost;
