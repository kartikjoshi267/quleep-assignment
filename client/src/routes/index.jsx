import { BrowserRouter, Route, Routes } from "react-router-dom"
import ProtectedRoutes from "./ProtectedRoutes"
import Homepage from "../pages/Homepage"
import Login from "../pages/Login"
import DeProtectRoutes from "./DeProtectRoutes"
import PostsPage from "../pages/PostsPage"
import CreatePost from "../pages/CreatePost"
import SinglePostPage from "../pages/SinglePost"
import EditPost from "../pages/EditPost"
import Signup from "../pages/Signup"

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route element={<DeProtectRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/edit/:postId" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default MyRouter