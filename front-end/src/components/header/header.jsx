import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import { HeaderLinks } from '.';
import { DashboardRoutes } from '../../routes';

const Header = (props) => {
  const {
    location,
  } = props;
  const makeBrand = () => {
    let name = null;
    DashboardRoutes.map((prop) => {
      if (prop.collapse) {
        prop.views.map((innerProp) => {
          if (innerProp.path === location.pathname) {
            name = innerProp.name;
          }
          return null;
        });
      } else if (prop.redirect) {
        if (prop.path === location.pathname) {
          name = prop.name;
        }
      } else if (prop.path === location.pathname) {
        name = prop.name;
      }
      return null;
    });
    return name;
  };

  // function that makes the sidebar from normal to mini and vice-versa
  const handleMinimizeSidebar = () => {
    document.body.classList.toggle('sidebar-mini');
  };

  // function for responsive that hides/shows the sidebar
  const mobileSidebarToggle = () => {
    document.documentElement.classList.toggle('nav-open');
  };

  return (
    <Navbar fluid>
      <div className="navbar-minimize">
        <button
          id="minimizeSidebar"
          type="button"
          className="btn btn-default btn-lg btn-icon navbar-minimize-btn"
          onClick={handleMinimizeSidebar}
        >
          <i className="fa fa-ellipsis-h visible-on-sidebar-regular" />
          <i className="fa fa-bars visible-on-sidebar-mini" />
        </button>
      </div>
      <HeaderLinks />
      <Navbar.Header>
        <Navbar.Brand>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {makeBrand()}
          </a>
        </Navbar.Brand>
        <Navbar.Toggle onClick={mobileSidebarToggle} />
      </Navbar.Header>
    </Navbar>
  );
};

Header.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Header;
