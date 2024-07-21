import { useRouter } from "next/navigation";
import classes from "./MealCard.module.css";
import { MealCardProps } from "@/types/edamamDataType";

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/foodLog");
  };
  return (
    <div onClick={handleClick} className={classes.mealCard}>
      <div className={classes.mealHeader}>
        <h2>{meal.title}</h2>
        <p>
          <strong>{meal.calories.toFixed(1)}</strong> calories
        </p>
      </div>
      <div className={classes.mealItems}>
        {meal.items.map((item, idx) => (
          <div key={idx} className={classes.mealItem}>
            <span>{item.name}</span>
            <span>{item.calories.toFixed(1)} cal</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealCard;
