import classes from "./Section.module.css";

const Section = ({ children, id }: any) => {
  return (
    <section id={id} className={classes.section}>
      {children}
    </section>
  );
};

export default Section;
