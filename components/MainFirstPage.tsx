import WheelComponent from "./WheelComponent";
import SortComponent from "./SortComponent";
import RoomComponent from "./RoomComponent";

export default function MainFirstPage({
  className,
}: {
  className: string;
}): JSX.Element {
  return (
    <main className={className}>
      <RoomComponent />
      <SortComponent />
      <WheelComponent />
    </main>
  );
}
