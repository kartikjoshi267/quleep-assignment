import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const { login } = useAppContext();
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const loginHandler = async () => {
        const success = await login(credentials);
        if (success) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-gray-900 text-center">
                    Login
                </h1>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={onChangeHandler}
                        name="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={onChangeHandler}
                        name="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="pt-4">
                    <button
                        onClick={loginHandler}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </div>
                <div className="pt-4">
                    <div className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        Don't have an account?{" "}
                        <span
                            className="underline cursor-pointer"
                            onClick={() => navigate("/register")}
                        >
                            Sign up
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
