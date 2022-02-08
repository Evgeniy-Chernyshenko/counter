import { NavLink } from "react-router-dom";
import { PATH } from "../../App";
import styles from "./Navigation.module.css";

const setIsActive = (props: { isActive: boolean }) =>
  props.isActive ? styles.active : "";

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        <li>
          <NavLink className={setIsActive} to={PATH.V1.link}>
            {PATH.V1.name}
          </NavLink>
        </li>
        <li>
          <NavLink className={setIsActive} to={PATH.V2.link}>
            {PATH.V2.name}
          </NavLink>
        </li>
        <li>
          <NavLink className={setIsActive} to={PATH.V3.link}>
            {PATH.V3.name}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
