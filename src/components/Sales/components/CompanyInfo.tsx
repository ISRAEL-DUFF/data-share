import { ICompanyInfoProps, IInfoOfTheDayProps } from "../types";

export const CompanyInfo: React.FC<ICompanyInfoProps> = ({
  logo,
  companyName,
}) => (
  <>
    <div className="flex items-center gap-1">
      {logo}
      <span className="text-white font-inter text-sm font-medium">
        {companyName}
      </span>
    </div>

    <span className="text-white font-inter text-2xl font-medium">
      {"ddddd"}
    </span>
  </>
);
