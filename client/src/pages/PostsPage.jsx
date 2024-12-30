import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";

const PostsPage = () => {
    const { posts, getAllPosts, user, logout } = useAppContext();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        getAllPosts();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">BlogsApp</h1>
                        </div>
                        <div className="flex items-center">
                            <div className="ml-4 relative">
                                {user?.profilePicture ? (
                                    <img
                                        className="h-10 w-10 rounded-full border object-cover border-gray-300 cursor-pointer"
                                        src={user.profilePicture}
                                        alt="User Avatar"
                                        onClick={() => setDropdownOpen(!dropdownOpen)} // Toggle dropdown
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-full bg-gray-200 border border-gray-300 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}></div>
                                )}
                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-300">
                                        <p className="block px-4 py-2 text-md text-gray-700">Welcome, <strong>{user.username}</strong></p>
                                        <hr />
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200 focus:outline-none bg-gray-50 rounded-md"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Posts</h1>
                <button
                    onClick={() => navigate("/create")}
                    className="mb-6 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    + New Post
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <BlogCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostsPage;
