import classes from "./CircularProgressBar.module.css";

const CircularProgressBar = ({ percentage }: any) => {
  return (
    <div
      className={classes.arcProgress}
      style={{ "--percentage": percentage } as React.CSSProperties}>
      <div className={classes.arcBackground}></div>
      <div className={classes.arcForeground}></div>
      <div className={classes.arcInnerCircle}>
        <div className={classes.arcProgressText}>{percentage}%</div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
