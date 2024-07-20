import React from "react";
import classes from "./Mainpage.module.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Section from "../shared/section/Section";
import MacrosSummary from "../macrosSummary/MacrosSummary";
import MealCards from "../mealCards/MealCards";

//Constants
const mainpageWrapperId = "mainpageWrapper";

const Mainpage = () => {
  return (
    <Section id={mainpageWrapperId}>
      <Header />
      <MacrosSummary />
      <MealCards />
      <Footer />
    </Section>
  );
};

export default Mainpage;
