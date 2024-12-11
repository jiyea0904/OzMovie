import '../css/auth.css';
const Login = () => {

    return (
        <div className="auth-container">
        <div className="login-container">
            <h1>LOGIN</h1>
            <form>
                <input
                type="text"
                name="username"
                placeholder="Username"
                required
                />
                <input
                type="password"
                name="password"
                placeholder="Password"
                required
                />
                <button type="submit">Login</button>
            </form>
        </div>
        </div>
    )
}

export default Login