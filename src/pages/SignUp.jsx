import { useState } from "react";
import "../css/auth.css";
import InputField from "../components/InputField";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import { useAuth } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { signUp } = useSupabaseAuth();
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        if (!/^[a-zA-Z가-힣0-9]{2,8}$/.test(value)) {
          error = "이름은 2~8자 사이, 숫자, 한글, 영어만 사용 가능합니다.";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "올바른 이메일 형식을 입력해주세요.";
        }
        break;
      case "password":
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
          error = "비밀번호는 8자 이상, 영어 대/소문자와 숫자를 포함해야 합니다.";
        }
        break;
      case "confirmPassword":
        if (value !== form.password) {
          error = "비밀번호가 일치하지 않습니다.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // 해당 필드만 실시간 검증
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 모든 필드를 검증
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const fieldError = validateField(key, form[key]);
      if (fieldError) {
        newErrors[key] = fieldError;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 서버 요청
    const result = await signUp({
      email: form.email,
      password: form.password,
      userName: form.username,
    });

    if (result.user) {
      updateUser(result.user);
      navigate("/");
    } else if (result.error) {
      setErrors({ server: result.error.message });
    }
  };

  return (
    <div className="auth-container">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            error={errors.username}
          />
          <InputField
            label="Email"
            type="email"
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
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          {errors.server && <p className="error-message">{errors.server}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
