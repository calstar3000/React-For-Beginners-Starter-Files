import React from "react";
import PropTypes from "prop-types";

const Login = props => {
  return (
    <nav className="login">
      <h2>Inventory Login</h2>
      <p>Sign in to manage your store's inventory.</p>
      <button className="github" onClick={() => props.authenticate("Github")}>
        Log in with GitHub
      </button>
      <button className="twitter" onClick={() => props.authenticate("Twitter")}>
        Log in with Twitter
      </button>
      <button
        className="facebook"
        onClick={() => props.authenticate("Facebook")}
      >
        Log in with Facebook
      </button>
    </nav>
  );
};

Login.proptypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
