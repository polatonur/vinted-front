/* eslint-disable jsx-a11y/alt-text */
import "./pagination.css";
import chevronLeft from "../assets/icons/chevron-left.svg";
import chevronsLeft from "../assets/icons/chevrons-left.svg";
import chevronRight from "../assets/icons/chevron-right.svg";
import chevronsRight from "../assets/icons/chevrons-right.svg";
const Pagination = ({ count, activePage, setActivePage, perPage }) => {
  let pages = [];
  // console.log("pagination count avant====>", count);
  count = Math.ceil(count / perPage);
  // console.log(perPage);
  // console.log("pagination count apres====>", count);

  console.log();
  if (count === 1) {
    pages = [1];
  } else if (count === 2) {
    pages = [1, 2];
  } else if (activePage === 1) {
    pages = [1, 2, 3];
  } else if (activePage === 2) {
    pages = [1, 2, 3];
  } else if (activePage === count) {
    pages = [count - 2, count - 1, count];
  } else if (activePage === count - 1) {
    pages = [count - 2, count - 1, count];
  } else {
    pages = [activePage - 1, activePage, activePage + 1];
  }
  return (
    <div className="pagination">
      <div className="pages">
        <img
          src={chevronsLeft}
          onClick={() => setActivePage(1)}
          className="icon"
        />
        <img
          src={chevronLeft}
          onClick={() => {
            if (activePage > 1) {
              setActivePage(activePage - 1);
            }
          }}
          className="icon"
        />
        {!(activePage === 1 || activePage === 2) && <span>. . .</span>}
        {pages.map((elem) => {
          return (
            <span
              key={elem}
              className={`page-number-square ${
                elem === activePage && "active"
              }`}
            >
              <span
                className={`page-number `}
                onClick={() => setActivePage(elem)}
              >
                {elem}
              </span>
            </span>
          );
        })}
        {!(activePage === count || activePage === count - 1) && (
          <span>. . .</span>
        )}
        <img
          src={chevronRight}
          onClick={() => {
            if (activePage < count) {
              setActivePage(activePage + 1);
            }
          }}
          className="icon"
        />
        <img
          src={chevronsRight}
          onClick={() => setActivePage(count)}
          className="icon"
        />
      </div>
    </div>
  );
};
export default Pagination;
