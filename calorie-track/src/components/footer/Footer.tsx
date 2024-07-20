import React from "react";
import { FaHome, FaChartBar, FaPlus } from "react-icons/fa";
import classes from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <div className={classes.footerWrapper}>
      <div className={classes.footerCon}>
        <div className={classes.footerItem}>
          <FaHome />
          <span>Home</span>
        </div>
        <div className={classes.footerItem}>
          <div className={classes.addButton}>
            <FaPlus />
          </div>
        </div>
        <div className={classes.footerItem}>
          <FaChartBar />
          <span>Analytics</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
