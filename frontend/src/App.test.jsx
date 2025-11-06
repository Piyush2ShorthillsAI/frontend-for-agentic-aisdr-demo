// Simple test version - rename this to App.jsx to test if React works
import React from 'react';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🎉 React is Working!</h1>
      <p>If you see this, React is mounted successfully.</p>
      <p>Server: Running</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

export default App;


