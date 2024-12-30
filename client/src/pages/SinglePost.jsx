import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const SinglePostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({
        title: "",
        content: "",
        image: "",
        author: {
            username: "",
        },
    });
    const { getPostById, deletePostById, user } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const post = await getPostById(postId);
            if (post) {
                setPost(post);
            }
        };
        fetchPost();
    }, [postId]);

    const deletePostHandler = async () => {
        const shouldDelete = confirm(
            "Are you sure you want to delete this post?"
        );
        if (!shouldDelete) return;

        const success = await deletePostById(postId);
        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full bg-white p-8 shadow-lg rounded-lg">
                <div
                    onClick={() => navigate(-1)}
                    className="mb-4 text-gray-600 font-bold hover:text-gray-900 cursor-pointer"
                >
                    ← Go Back
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {post.title}
                </h1>
                <div className="flex items-center space-x-2 mb-3">
                    {post.author.profilePicture && (
                        <img
                            src={post.author.profilePicture}
                            alt={post.author.username}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    )}
                    <p className="text-sm font-semibold text-gray-500">
                        {post.author.username}
                    </p>
                </div>
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full max-h-96 object-cover rounded-md shadow-md mb-6"
                />
                <p className="text-gray-800 text-lg leading-relaxed mb-6">
                    {post.content}
                </p>
                {post.author._id === user._id && (
                    <div className="flex space-x-4">
                        <button
                            onClick={() => navigate(`/edit/${post._id}`)}
                            className="px-6 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deletePostHandler()}
                            className="px-6 py-2 text-white bg-red-600 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SinglePostPage;
