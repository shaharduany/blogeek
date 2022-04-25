import styles from "./Button.module.css";

function Button(props) {
  const clickHandler = props.onClick;

  if (clickHandler) {
    return (
      <div>
        <button onClick={clickHandler} className={styles.button}>
          {props.children}
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button type="submit" className={styles.button}>
          {props.children}
        </button>
      </div>
    );
  }
}

export default Button;
