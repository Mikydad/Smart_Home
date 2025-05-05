import React, { useState } from 'react';
import './settings-content.css'; // Assuming you have a CSS file for styling
const Setting_content = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleSignup = () => {
    if (username && password) {
      // Simulate user creation (store in backend or memory)
      console.log('User registered:', username);
      setRegistered(true);
    } else {
      alert('Fill in username and password');
    }
  };

  const handleFingerprintRegistration = () => {
    // Simulate fingerprint registration
    console.log('Fingerprint registered');
    alert('Fingerprint registered (mock)');
  };

  const handleAuthenticate = () => {
    // Simulate authentication
    if (registered) {
      console.log('User authenticated');
      setAuthenticated(true);
    } else {
      alert('Register first');
    }
  };

  return (
    <div className="settings-panel">
      <h2>User Settings</h2>

      {/* Signup section */}
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button onClick={handleSignup}>Sign Up</button>
      </div>

      {/* Fingerprint registration */}
      {(
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleFingerprintRegistration}>Register Fingerprint</button>
        </div>
      )}

      {/* Authentication */}
    

      {/* Auth status */}
      {authenticated && <p style={{ color: 'green' }}>✅ Authenticated</p>}
    </div>
  );
};

export default Setting_content;
