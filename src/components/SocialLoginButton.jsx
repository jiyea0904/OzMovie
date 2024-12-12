import "../css/auth.css";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { useAuth } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const SocialLoginButton = () => {
  const { signInWithKakao, signInWithGoogle } = useSupabaseAuth();
  const { updateUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLoginWithKakao = async () => {
    try {
      const data = await signInWithKakao();
      //console.log(data.accessToken);
      return data;
    } catch (error) {
      console.error("Kakao login failed:", error);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const data = await signInWithGoogle();
      console.log(data.user);
      return data;
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="social-login">
      <button className="kakao" onClick={handleLoginWithKakao}>
        Kakao Login
      </button>
      <button className="google" onClick={handleLoginWithGoogle}>
        Google Login
      </button>
    </div>
  );
};

export default SocialLoginButton;
