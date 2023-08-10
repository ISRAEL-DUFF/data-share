export interface IInfoOfTheDayProps {
  icon: React.ReactNode;
  description: string;
  weekday: string;
}

export interface ISalesDataTypes {
  mostSales: IInfoOfTheDayProps;
  leastSales: IInfoOfTheDayProps;
}

export interface ICompanyInfoProps {
  companyName: string;
  logo: React.ReactNode;
}
