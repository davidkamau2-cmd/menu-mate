import React from "react";

export default function Signup() {
  return (
    <section className="page auth-page">
      <h2>Sign up</h2>
      <form className="auth-form">
        <input name="displayName" placeholder="Full name" />
        <input name="email" placeholder="Email" />
        <input name="password" placeholder="Password" type="password" />
        <button className="btn">Create account</button>
      </form>
    </section>
  );
}
