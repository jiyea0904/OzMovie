import '../css/auth.css';

const SignUp = () => {

    return (
        <div className="auth-container">
            <div className="signup-container">
            <h1>Sign Up</h1>
            <form>
                <input
                type="text"
                name="username"
                placeholder="Username"
                required
                />
                <input
                type="email"
                name="email"
                placeholder="Email"
                required
                />
                <input
                type="password"
                name="password"
                placeholder="Password"
                required
                />
                <button type="submit">Sign Up</button>
            </form>
            </div>
        </div>
      );
}

export default SignUp;