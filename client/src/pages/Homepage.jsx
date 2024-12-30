import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  useEffect(() => {
    if (user) {
      navigate('/posts');
      return;
    }
    navigate('/login');
  }, []);

  return null;
}

export default Homepage;