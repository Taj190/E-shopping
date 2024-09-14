import React from "react";
import { FaShopify } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer container-fluid">
      <div className="row">
        <div className="col-md-2 footer-brand">
          <Link to="" className="navbar-brand open-sans">
            <FaShopify /> T-Rendify
          </Link>
        </div>
        <div className="col-md-10">
          <h4 className="text-center">All Right Reserved &copy; T-rendify</h4>
          <p className="text-center mt-3 links">
            <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> |{" "}
            <Link to="/policy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
