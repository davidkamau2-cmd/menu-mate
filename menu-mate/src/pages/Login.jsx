import React from "react";

export default function Login() {
  return (
    <section className="page auth-page">
      <h2>Login</h2>
      <p>Use Google to sign in (Firebase required)</p>
      <button className="btn" id="google-login">
        Sign in with Google
      </button>

      <hr />

      <h3>Or sign in with email</h3>
      <form className="auth-form">
        <input name="email" placeholder="Email" />
        <input name="password" placeholder="Password" type="password" />
        <button className="btn">Login</button>
      </form>
    </section>
  );
}
