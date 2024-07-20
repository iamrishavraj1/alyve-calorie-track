import Image from "next/image";
import classes from "./FoodLogCard.module.css";
import { FaFire } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FoodLogCardProps } from "@/types/edamamDataType";

const FoodLogCard: React.FC<FoodLogCardProps> = ({ meal, onRemove }) => {
  const getProgressBarStyle = (value: number | null) => {
    return {
      width: `${value || 0}%`,
    };
  };

  return (
    <div className={classes.mealCard}>
      <div className={classes.mealHeader}>
        <Image
          src={meal.image}
          height={100}
          width={100}
          alt={meal.name}
          className={classes.mealImage}
        />

        <div className={classes.mealDetails}>
          <span className={classes.mealName}>{meal.label}</span>
          <div>
            <span className={classes.mealCalories}>
              <FaFire className={classes.fireIcon} />{" "}
              {meal?.nutrients?.ENERC_KCAL} kcal - 100 G
            </span>
          </div>
        </div>
        <button className={classes.removeButton} onClick={onRemove}>
          <ImCross />
        </button>
      </div>
      <div className={classes.mealInfo}>
        <div className={classes.mealMacros}>
          <div className={classes.macro}>
            <div className={classes.progressBarContainer}>
              <div
                className={`${classes.progressBar} ${classes.proteinBar}`}
                style={getProgressBarStyle(meal?.nutrients?.PROCNT)}></div>
            </div>
            <span className={classes.macroValue}>
              {meal?.nutrients?.PROCNT} g
            </span>
            <span className={classes.macroLabel}>Protein</span>
          </div>
          <div className={classes.macro}>
            <div className={classes.progressBarContainer}>
              <div
                className={`${classes.progressBar} ${classes.carbsBar}`}
                style={getProgressBarStyle(meal?.nutrients?.CHOCDF)}></div>
            </div>
            <span className={classes.macroValue}>
              {meal?.nutrients?.CHOCDF} g
            </span>
            <span className={classes.macroLabel}>Carbs</span>
          </div>
          <div className={classes.macro}>
            <div className={classes.progressBarContainer}>
              <div
                className={`${classes.progressBar} ${classes.fatBar}`}
                style={getProgressBarStyle(meal?.nutrients?.FAT)}></div>
            </div>
            <span className={classes.macroValue}>{meal?.nutrients?.FAT} g</span>
            <span className={classes.macroLabel}>Fat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodLogCard;
