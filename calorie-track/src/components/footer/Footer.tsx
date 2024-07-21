"use client";
import React from "react";
import { FaHome, FaChartBar, FaPlus } from "react-icons/fa";
import classes from "./Footer.module.css";
import { useRouter } from "next/navigation";

const Footer: React.FC = () => {
  const router = useRouter();

  const handleAddClick = () => {
    router.push("/foodLog");
  };

  const handleAnalyticsClick = () => {
    router.push("/analytics");
  };
  return (
    <div className={classes.footerWrapper}>
      <div className={classes.footerCon}>
        <div className={classes.footerItem}>
          <FaHome />
          <span>Home</span>
        </div>
        <div className={classes.footerItem}>
          <div className={classes.addButton} onClick={handleAddClick}>
            <FaPlus />
          </div>
        </div>
        <div className={classes.footerItem} onClick={handleAnalyticsClick}>
          <FaChartBar />
          <span>Analytics</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
