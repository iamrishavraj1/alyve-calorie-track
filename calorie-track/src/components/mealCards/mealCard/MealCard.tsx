import { useRouter } from "next/navigation";
import classes from "./MealCard.module.css";

const MealCard = ({ meal }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/foodLog");
  };
  return (
    <div onClick={handleClick} className={classes.mealCard}>
      <div className={classes.mealHeader}>
        <h2>{meal.title}</h2>
        <p>
          <strong>{meal.calories}</strong> calories
        </p>
      </div>
      <div className={classes.mealItems}>
        {meal.items.map((item, idx) => (
          <div key={idx} className={classes.mealItem}>
            <span>{item.name}</span>
            <span>{item.calories} cal</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealCard;
