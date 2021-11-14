import React from 'react';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  handleNameChange,
  username,
  password,
  name,
}) => {
  return (
    <div>
      <h2>Rekisteröinti</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Nimi:
          <input id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          Sisäänkirjautuminen:
          <input
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Salasana:
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="register-button" type="submit">
          Rekisteröidy
        </button>
      </form>
    </div>
  );
};

export default LoginForm;