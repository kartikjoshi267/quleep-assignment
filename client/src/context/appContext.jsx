import axios from "axios";
import axiosRetry from "axios-retry";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const axiosInstance = axios.create({
        baseURL: `${import.meta.env.VITE_APP_BACKEND_URL}/api`,
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    // toast for loading when request is initiated
    axiosInstance.interceptors.request.use((config) => {
        toast.loading("Loading...");
        return config;
    }, (error) => {
        toast.dismiss();
        return Promise.reject(error);
    });

    // toast for loading when request is completed
    axiosInstance.interceptors.response.use((response) => {
        toast.dismiss();
        return response;
    }, (error) => {
        toast.dismiss();
        return Promise.reject(error);
    });

    axiosRetry(axiosInstance, { retries: 3 });

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUser();
        }
    }, []);

    useEffect(() => {
        if (user) {
            getAllPosts();
        }
    }, [user]);

    const login = async ({ email, password }) => {
        try {
            const { data } = await axiosInstance.post("/login", {
                email,
                password,
            });
            const { authtoken } = data;
            localStorage.setItem("token", authtoken);
            getUser();
            toast.success("Login successful");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const signup = async ({ email, password, username, profilePicture }) => {
        try {
            const { data } = await axiosInstance.post("/register", {
                email,
                password,
                username,
                profilePicture,
            });
            toast.success("Signup successful");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getUser = async () => {
        try {
            const { data } = await axiosInstance.post(
                "/",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setUser(data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const getAllPosts = async () => {
        try {
            const { data } = await axiosInstance.get("/posts");
            setPosts(data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const createPost = async ({ title, content, image }) => {
        try {
            const { data } = await axiosInstance.post(
                "/posts",
                {
                    title,
                    content,
                    image,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            toast.success("Post created successfully");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getPostById = async (postId) => {
        try {
            const { data } = await axiosInstance.get(`/posts/${postId}`);
            return data;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const editPostById = async (postId, { title, content, image }) => {
        try {
            await axiosInstance.put(
                `/posts/${postId}`,
                { blog: { title, content, image } },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            toast.success("Post updated successfully");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const deletePostById = async (postId) => {
        try {
            await axiosInstance.delete(`/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("Post deleted successfully");
            return true;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <AppContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                posts,
                getAllPosts,
                createPost,
                getPostById,
                deletePostById,
                editPostById,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
