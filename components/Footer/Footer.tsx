import css from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Stanislav Rakitianskyi</p>
          <p>
            Contact us:
            <a href="mailto:reaketaswig@gmail.com"> reaketaswig@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
