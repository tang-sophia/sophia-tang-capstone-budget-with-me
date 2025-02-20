import React from "react";
import "../DashboardCard/DashboardCard.scss";

const DashboardCard = ({ title, amount, percentage }) => {
  return (
    <div className="dashboard-card__container">
      <div className="dashboard-card__data">
        <span>{title}</span>
        <span>{amount}</span>
        <span>{percentage}</span>
      </div>
    </div>
  );
};

export default DashboardCard;
