import "../Nav.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navigation = () => {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchId.trim() !== "") {
      e.preventDefault();
      navigate(`/order/${searchId}`);
    }
  };

  return (
    <div className="navigation">
      <div className="pizza" onClick={() => navigate("/")}>
        FAST REACT PIZZA CO.
      </div>
      <div className="pizza-search">
        <input
          type="search"
          className="search-order"
          placeholder="Search order #"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="pizza-user">{username && <span>{username}</span>}</div>
    </div>
  );
};

export default Navigation;
