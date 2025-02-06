import "../Welcome.css";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">The best pizza.</h1>
      <h2 className="welcome-subtitle">
        <span>Straight out of the oven,</span> <span>straight to you.</span>
      </h2>
      <p className="welcome-message">
        🍕 Welcome! Please start by telling us your name:
      </p>
      <input
        type="text"
        className="welcome-input"
        placeholder="Your full name"
      />
    </div>
  );
};

export default Welcome;
