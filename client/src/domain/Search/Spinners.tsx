import { ReactElement } from "react";
import styles from "./Spinner.module.css";

interface Props {}

function Spinners({}: Props): ReactElement {
  return <div className={styles.hexdots}></div>;
}

export default Spinners;
