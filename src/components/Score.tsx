import { UserModel } from "../types";
import { Card } from "./Card";
import { IconHappyPerson } from "./Icons/IconHappyPerson";

export const Score: React.FC<{
  userAData: UserModel | undefined
  userBData: UserModel | undefined
}> = ({
  userAData,
  userBData
}) => {
  const score = () => {
    if(!userAData && !userBData) {
      return "No Data Available"
    }

    if(!userAData) {
      return "User B has " + `${userBData?.companyInfo?.percentage ?? 0}% more than User A`
    }

    if(!userBData) {
      return "User A has " + `${userAData?.companyInfo?.percentage ?? 0}% more than User A`
    }

    return "Data is " + `${Math.abs((userAData?.companyInfo?.percentage ?? 0) - (userBData?.companyInfo?.percentage ?? 0))}% Different`
  }
  return (
    <Card>
      <div className="flex flex-col h-72 justify-between items-center p-7">
        <span className="font-inter font-semibold text-2xl text-white">
          Data Summary
        </span>
        <span className="font-inter font-semibold text-2xl text-custom-green-500 flex flex-col justify-center items-center gap-2">
          <IconHappyPerson />
          Excellent
        </span>
        <span className="font-inter font-normal text-sm text-white">
          {
            score()
          }
        </span>
      </div>
    </Card>
  )
};
