import styles from "./PageNotFound.module.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const PageNotFound = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.subtitle}>page not found</h2>
    <Button
      style={{ padding: "10px 50px" }}
      component={Link}
      to="/"
      variant="contained"
    >
      ВЕРНУТЬСЯ НА ГЛАВНУЮ
    </Button>
  </div>
);
