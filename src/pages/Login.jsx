import { useState } from "react";
import InputField from "../components/InputField";
import "../css/auth.css";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { useAuth } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import SocialLoginButton from "../components/SocialLoginButton";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { login } = useSupabaseAuth();
  const { updateUser } = useAuth();
  const navigate = useNavigate();


  const validate = () => {
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (form.password.length < 8) {
      newErrors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // 입력 중 에러 초기화
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = await login({
      email: form.email,
      password: form.password,
    });

    if (result.user) {
      updateUser(result.user);
      //navigate("/");
    } else if (result.error) {
      setErrors({ server: result.error.message });
    }
  };

  return (
    <div className="auth-container">
      <div className="login-container">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          {errors.server && <p className="error-msg">{errors.server}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
            Don't have an account? <a href="/signup">Sign Up</a>
        </p>
        <SocialLoginButton />
      </div>
    </div>
  );
};

export default Login;
