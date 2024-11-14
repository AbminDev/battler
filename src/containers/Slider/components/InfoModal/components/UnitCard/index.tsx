import { ICharacteristic } from "../../../../../../interfaces/characteristic";
import { characteristics } from "../../mock";
import { Characteristic } from "./components/Characteristic";

interface UnitCardProps {
  characteristics: ICharacteristic[];
}

export const UnitCard = (props: UnitCardProps) => {
  const { characteristics } = props;

  const items1 = characteristics.slice(0, 3);
  const items2 = characteristics.slice(3, 6);

  return (
    <div className="bg-dark-gray flex-1 rounded-lg flex flex-col mt-2 py-1 px-1 mb-4">
      <div className="flex flex-row">
        <div className="w-1/3 bg-white mr-1 rounded-md border-dark-outer border-2">
          <img
            src={require("../../../../../../assets/images/placeholder.png")}
          />
        </div>
        <div className="flex flex-col w-8/12">
          <div className="flex-row flex items-center w-full bg-dark-outer pl-1 py-3 pr-2 rounded-md">
            <div className="absolute w-6 h-6 bg-light-gray rounded-full text-center content-center z-20">
              <p className="text-xs">7</p>
            </div>
            <div className="flex-1 h-3 z-10 bg-progress-bar rounded-2xl text-center">
              <p className="absolute justify-center w-1/2 text-xs leading-3 z-10">
                24/50
              </p>
              <div className="absolute z-0 h-3 w-1/4 bg-progress-bar-active rounded-2xl" />
            </div>
            <div className="absolute right-14 w-6 h-6 bg-light-gray rounded-full text-center content-center z-20">
              <img
                src={require("../../../../../../assets/images/placeholder_circle.png")}
              />
            </div>
          </div>
          <div className="flex flex-row w-full justify-between pt-1">
            <div className="flex flex-col gap-0.5">
              {items1.map((characteristic, id) => (
                <Characteristic
                  key={id}
                  title={characteristic.title}
                  value={characteristic.value}
                />
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              {items2.map((characteristic, id) => (
                <Characteristic
                  key={id}
                  title={characteristic.title}
                  value={characteristic.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
