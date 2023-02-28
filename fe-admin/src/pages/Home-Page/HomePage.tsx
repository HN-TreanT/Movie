import { Row, Col } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import React from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import MoviePage from "./Center/Movies/MoviePage";
import UserPage from "./Center/user_page/UserPage";
import { RouterLinks } from "../../const/router_links";
import "./HomePage.scss";
const HomePage: React.FC = () => {
  return (
    <div className="container">
      <Row>
        <Col  xl={4} sm={0}>
          <SideBar />
        </Col>
        <Col xl={20} sm={24}>
          <div className="content">
            <TopBar />

            <div className="ModelPage">
              <Routes>
                <Route path={RouterLinks.MOVIE_PAGE} element={<MoviePage />} />
                <Route path={RouterLinks.USER_PAGE} element={<UserPage />} />
              </Routes>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
