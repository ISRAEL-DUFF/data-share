import { FC, useMemo } from "react";
import { Card } from "../Card";
import { CircleProgress } from "../CircleProgress";
import { ItemStatistics } from "./components/ItemStatistics";
import { IStatisticsProps } from "./types";

export const Statistics: FC<IStatisticsProps> = ({
  title,
  data,
  backgroundColor,
  strokeColor,
}) => {
  const { numberOfUsers, numberOfProducts } = data;

  const percentage = useMemo(() => {
    let value = 0;

    if(numberOfUsers === 0 || numberOfProducts === 0) {
      value = 0
    } else if(numberOfProducts > numberOfUsers) {
      value = (numberOfUsers / numberOfProducts) * 100; 
    } else {
      value = (numberOfProducts / numberOfUsers) * 100;
    }

    return Math.ceil(value);
  }, [numberOfUsers, numberOfProducts]);

  return (
    <Card>
      <div className="py-7 md:px-12">
        <div className="flex flex-col items-center justify-between gap-4">
          <span className="font-inter font-semibold text-2xl text-white flex items-center justify-center">
            {title}
          </span>
          <div className="relative">
            <CircleProgress
              size={8}
              color={strokeColor}
              percentage={percentage}
            />

            <div className="absolute inset-0 h-full w-full rounded-full items-center justify-center flex flex-col text-white">
              <span className="font-inter text-sm md:text-3xl font-bold">
                {percentage}%
              </span>
              <span className="font-inter text-base font-light"></span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ItemStatistics
              title="Users"
              value={numberOfUsers}
              color={"bg-custom-purple-700"}
              type={"integer"}
            />
            <ItemStatistics
              title="Products"
              value={numberOfProducts}
              color={backgroundColor}
              type={"integer"}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
