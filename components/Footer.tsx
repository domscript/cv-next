import LinkButton from "./LinkButton";
import { contacts } from "../utils/contacts";

const Footer = (): JSX.Element => {
  return (
    <footer className="flex flex-col text-slate-700 text-center">
      <p>&copy; Copyright {new Date().getFullYear()}</p>
      <ul className="flex flex-row mx-auto">
        {contacts.map((el) => (
          <li key={el.title} className="px-2 m-2">
            <LinkButton
              title={el.title}
              path={el.path}
              href={el.href}
              viewBox={el.viewBox}
              color={el.color}
              width={30}
              height={30}
              className="px-2 m-2"
            />
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
