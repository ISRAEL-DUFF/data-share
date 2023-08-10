import { useEffect, useState } from "react";
import { UserModel } from "../../types";
import { Card } from "../Card";

import { SimpleGraph } from "../SimpleGraph";
import { CompanyInfo } from "./components/CompanyInfo";

export const Sales: React.FC<{
  userA: UserModel | undefined,
  userB: UserModel | undefined
}> = ({
  userA,
  userB
}) => {
  const [userAData, setUserAData] =  useState<UserModel | undefined>(userA)
  const [userBData, setUserBData] =  useState<UserModel | undefined>(userB)

  useEffect(() => {
    setUserAData(userA)
    setUserBData(userB)
  }, [userA, userB])

  const data = () => {
    return  {
      userAData: {
        companyName: userAData?.companyInfo?.name ?? "",
        logo: <img className="text-green-700 shadow-sm" width = '100px' height = '100px' src={userAData?.companyInfo?.logoUrl} alt="logo a"/>,
      },
      userBData: {
        companyName: userBData?.companyInfo?.name ?? "",
        logo: <img className="text-green-700 shadow-sm" width = '100px' height = '100px' src={userBData?.companyInfo?.logoUrl} alt="logo b"/>,
      },
    }
  }

  return (
    <Card>
      <div className="px-12 py-7 flex flex-col justify-center">
        <span className="text-white font-inter text-2xl text-center sm:text-left">
          Data Graph
        </span>
        <div className="grid sm:grid-cols-1 grid-cols-1 pt-8 h-72">
          <SimpleGraph userA={ userA } userB={ userB }/>
        </div>
      </div>
    </Card>
  );
};
