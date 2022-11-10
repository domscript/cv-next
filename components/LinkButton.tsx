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
  return (
    <>
      <a
        title={props.title}
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon
          viewBox="0 0 496 512"
          color={props.color}
          path={props.path}
          width={props.width}
          height={props.height}
        />
      </a>
    </>
  );
};

export default LinkButton;
