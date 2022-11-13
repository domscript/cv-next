import { useState } from "react";
import Icon from "./Icon";

interface LinkButtonProps {
  children?: React.ReactNode;
  className: string;
  href: string;
  width: number;
  height: number;
  title: string;
  path: string;
  viewBox: string;
  color: string;
}

const LinkButton = (props: LinkButtonProps): JSX.Element => {
  const [LinkButtonColor, setLinkButtonColor] = useState(false);

  const linkButtonsEnterHandler = () => {
    setLinkButtonColor((prevState) => !prevState);
  };
  const linkButtonsLeaveHandler = () => {
    setLinkButtonColor((prevState) => !prevState);
  };
  return (
    <li
      className={props.className}
      onPointerEnter={linkButtonsEnterHandler}
      onPointerLeave={linkButtonsLeaveHandler}
    >
      <a
        title={props.title}
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon
          viewBox="0 0 496 512"
          color={LinkButtonColor ? props.color : "#374151"}
          path={props.path}
          width={props.width}
          height={props.height}
        />
      </a>
    </li>
  );
};

export default LinkButton;
