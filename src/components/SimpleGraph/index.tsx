import { useEffect, useMemo, useState } from "react";
import { DAYS } from "./constants";
import { UserModel } from "../../types";

const calculateValue = (value: number) => {
  let total = value * 10;

  if (total < 0) return 1;
  else if (total > 140) return 140;

  return total;
};

export const SimpleGraph: React.FC<{
  userA: UserModel | undefined,
  userB: UserModel | undefined
}> = ({
  userA,
  userB
}) => {
  const getDataValues = () => {
    const percentA = userA?.companyInfo ? userA.companyInfo.percentage : 0
    const percentB = userB?.companyInfo ? userB.companyInfo.percentage : 0

    return [
      {
        day: "users A",
        value: userA?.companyInfo ? userA.companyInfo.numberOfUsers : 0,
      },
      {
        day: "users B",
        value: userB?.companyInfo ? userB.companyInfo.numberOfUsers : 0,
      },
      {
        day: "products A",
        value: userA?.companyInfo ? userA.companyInfo.numberOfProducts : 0,
      },
      {
        day: "products B",
        value: userB?.companyInfo ? userB.companyInfo.numberOfProducts : 0,
      },
      {
        day: "percent A",
        value: userA?.companyInfo ? userA.companyInfo.percentage : 0,
      },
      {
        day: "percent B",
        value: userB?.companyInfo ? userB.companyInfo.percentage : 0,
      },
      {
        day: "percent Diff",
        value: Math.abs(percentA - percentB),
      },
    ];
  }

  const [dataValues, setDataValues] = useState<{day: string, value: number}[]>(getDataValues())

  
  useEffect(() => {
    console.log("user inf:", userA, userB)

    setDataValues(getDataValues())
    console.log(dataValues, getDataValues())
  }, [userA, userB])

  const valueMemoized = useMemo(() => {
    
    return dataValues.reduce((acc, item) => {
      acc[item.day] = calculateValue(item.value);
      return acc;
    }, {} as { [key: string]: number });
  }, [dataValues]);

  return (
    <div className="relative h-full flex items-center pt-48 sm:pt-0">
      <div className="w-full bg-[#4A4556] h-[3px] absolute flex overflow-auto p-1 top-full" />

      <div className="absolute flex items-end justify-between w-full overflow-auto p-1 inset-0">
        {dataValues.map((item) => {
          const value = valueMemoized[item.day];

          return (
            <div
              key={item.day}
              className="flex flex-col justify-center items-center"
            >
              <div
                className={"bg-custom-cyan-600 w-[15px] rounded-full"}
                style={{ height: `${value}px` }}
              />
              <span className="font-inter font-medium text-sm text-white">
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
