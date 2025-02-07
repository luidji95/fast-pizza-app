import { useState } from "react";
import "../Welcome.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserConfirmed, setUsername } from "../Redux/Slices/userSlice";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const [name, setName] = useState("");
  const [isButtonVisible, setIsButtonVisible] = useState(!!username);

  const handleInputChange = (e) => {
    setName(e.target.value);
    setIsButtonVisible(e.target.value.trim().length > 0);
  };

  const handleStartOrdering = () => {
    dispatch(setUsername(name));
    dispatch(setUserConfirmed());
    navigate("/menu");
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">The best pizza.</h1>
      <h2 className="welcome-subtitle">
        <span>Straight out of the oven,</span> <span>straight to you.</span>
      </h2>

      {!username ? (
        <>
          <p className="welcome-message">
            👋 Welcome! Please start by telling us your name:
          </p>
          <input
            type="text"
            className="welcome-input"
            placeholder="Your full name"
            value={name}
            onChange={handleInputChange}
          />
        </>
      ) : (
        <p className="welcome-message">👋 Welcome back, {username}!</p>
      )}

      {isButtonVisible && (
        <button className="start-ordering-btn" onClick={handleStartOrdering}>
          {username ? `Continue Ordering ${username}` : "Start Ordering"}
        </button>
      )}
    </div>
  );
};

export default Welcome;
