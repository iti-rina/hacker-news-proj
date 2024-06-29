import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { fetchPosts, getStatus} from "../features/news/newsSlice";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import { GoSync } from "react-icons/go";
import SortBy from "./SortBy";

const Header:FC = ({ onSort }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = useLocation();

  const status  = useSelector(getStatus);

  const spinner =  status === "loading" ? <LoadingSpinner /> : null;

  return (
    <header>
      <div className="header-container">
        <div className="header-button" title="Reload this page">
          <button className="header__reload" onClick={() => dispatch(fetchPosts())}>
            <GoSync className="reload__icon"/>
          </button>
        </div>
        <div className="header-title" onClick={() => navigate("/")} >
          <h1>Hacker News</h1>
        </div>
        {spinner}
        {url.pathname === "/" 
        ? <SortBy onSort={onSort} />
        : <button onClick={() => navigate("/")} className="back-to-main__btn">Back to main page</button>}
      </div>
    </header>
  );
}

export default Header;