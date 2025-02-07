import "../Nav.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();

  return (
    <div className="navigation">
      <div className="pizza" onClick={() => navigate("/")}>
        FAST REACT PIZZA CO
      </div>
      <div className="pizza-search">
        <input
          type="search"
          className="search-order"
          placeholder="Search order #"
        />
      </div>
      <div className="pizza-user">{username && <span>{username}</span>}</div>
    </div>
  );
};

export default Navigation;
