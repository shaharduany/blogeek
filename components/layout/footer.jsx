import style from "./footer.module.css";

function Footer(props) {
  return (
    <div className={style.footer_div}>
      <footer>
       &copy; Credits: <b>Shahar Duany</b>
        <br />
        <span> Contact: <address>shahar.duany@gmail.com</address> </span>
      </footer>
    </div>
  );
}

export default Footer;
