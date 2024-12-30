import { useNavigate } from "react-router-dom";

const BlogCard = ({ post }) => {
    const navigate = useNavigate();

    if (!post) return null;

    return (
        <div
            key={post._id}
            onClick={() => navigate(`/posts/${post._id}`)}
            className="border border-gray-300 bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between"
        >
            <div>
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
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3 break-words">
                    {post.content}
                </p>
            </div>
            {post.image && (
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-fill rounded-md mb-4"
                />
            )}
        </div>
    );
};

export default BlogCard;
