import styles from "./styles.module.css";
import plug from "../../assets/img.png";
import cn from "clsx";
import { Link } from "react-router-dom";
import { PathsRoutes } from "@/shared/routes.ts";

export const Page404 = () => {
  return (
    <div className={styles.wrapper}>
      <p className={cn("text", "text_type_main-default")}>
        Кажется, вы потерялись. Вернуться{" "}
        <Link to={PathsRoutes.CONSTRUCTOR}>на главную</Link>
      </p>
      <img alt={"wrong hole"} src={plug} height={500} />
    </div>
  );
};
