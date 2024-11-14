import { ICharacteristic } from "../../../../../../../interfaces/characteristic";

export const Characteristic = (props: ICharacteristic) => {
  return (
    <div className="flex flex-row items-center">
      <p className="py-2 px-3 bg-dark-outer text-xs rounded-md mr-1">
        {props.title}
      </p>
      <p>{props.value}</p>
    </div>
  );
};
