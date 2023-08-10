export interface IDataTypes {
  numberOfUsers: number;
  numberOfProducts: number;
  // type: "money" | "integer";
}

export interface IStatisticsProps {
  title: string;
  data: IDataTypes;
  backgroundColor: string;
  strokeColor: string;
}

export interface IDashboardScreenProps {
  userType: 'Admin' | 'User' | undefined
}
