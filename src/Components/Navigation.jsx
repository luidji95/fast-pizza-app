import "../Nav.css";

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="pizza">FAST REACT PIZZA CO.</div>
      <div className="pizza-search">
        <input
          type="search"
          className="search-order"
          placeholder="Search order #"
        />
      </div>
      {/* <div className="pizza-user"></div> */}
    </div>
  );
};

export default Navigation;
