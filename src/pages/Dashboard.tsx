import { IDashboardScreenProps } from "../components/Statistics/types";
import { FC } from "react";
import { DataPage } from "./DataInput";
import AdminDashboard from "./AdminScreen";

export const Dashboard: FC<IDashboardScreenProps> = ({
  userType
}) => {
  if(!userType) {
    return <div>
      <p>Login to Continue...</p>
    </div>
  }
  
  if(userType === 'Admin') {
    return (
      <AdminDashboard />
    );
  } else {
    return (
      <DataPage />
    );
  }
}


