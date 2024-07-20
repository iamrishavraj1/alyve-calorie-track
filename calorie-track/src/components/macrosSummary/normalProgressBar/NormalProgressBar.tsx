import classes from "./NormalProgressBar.module.css";

const NormalProgressBar = ({ items, percentage, quantity }) => {
  return (
    <div>
      {items}
      <div className={classes.normalProgress}>
        <div
          className={classes.normalProgressBar}
          style={{ "--percentage": percentage } as React.CSSProperties}></div>
      </div>
      {quantity}
    </div>
  );
};

export default NormalProgressBar;
