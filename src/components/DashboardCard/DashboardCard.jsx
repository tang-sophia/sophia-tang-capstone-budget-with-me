import React from "react";
import "../DashboardCard/DashboardCard.scss";

const DashboardCard = ({
  title,
  subtitle,
  amount,
  amountChange,
  percentage,
}) => {
  return (
    <div className="dashboard-card__container">
      <div className="dashboard-card__data">
        <span className="dashboard-card__title">{title}</span>
        <span>{subtitle}</span>
        <span className="dashboard-card__amount">{amount}</span>
        <span>{amountChange}</span>
        <span className="dashboard-card__per">{percentage}</span>
      </div>
    </div>
  );
};

export default DashboardCard;
