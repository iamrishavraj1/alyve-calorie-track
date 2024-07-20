import React from "react";
import classes from "./MacrosSummary.module.css";
import CircularProgressBar from "./circularProgressBar/CircularProgressBar";
import NormalProgressBar from "./normalProgressBar/NormalProgressBar";

const MacrosSummary: React.FC = () => {
  const normalProgressBarsData = [
    { item: "Protein", percentage: 50, quantity: "100/200 g" },
    { item: "Carbs", percentage: 60, quantity: "150/250 g" },
    { item: "Fats", percentage: 40, quantity: "80/200 g" },
  ];

  return (
    <div className={classes.macrosSummaryPadding}>
      <div className={classes.macrosSummaryWrapper}>
        <div className={classes.macrosSummaryCon}>
          <div className={classes.circularProgressCon}>
            <CircularProgressBar />
          </div>
          <div className={classes.normalProgressCon}>
            {normalProgressBarsData.map((data, index) => (
              <NormalProgressBar
                key={index}
                items={data.item}
                percentage={data.percentage}
                quantity={data.quantity}
              />
            ))}
          </div>
        </div>
        <div className={classes.caloriesInfo}>
          <p>1250/2500 Kcal</p>
        </div>
      </div>
    </div>
  );
};

export default MacrosSummary;
