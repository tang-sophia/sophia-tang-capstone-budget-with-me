import "../DashboardPage/DashboardPage.scss";
// import { Box } from "@mui/material";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import DashboardExpenses from "../../components/DashboardExpenses/DashboardExpenses";
import DashboardReminders from "../../components/DashboardReminders/DashboardReminders";
// import Header from "../../components/Header/Header";

const DashboardPage = () => {
  return (
    <div className="dashboard">
      {/* <Box>
        <Header title="DASHBOARD" subtitle="Monitoring your Financial Health" />
      </Box> */}
      <div className="dashboard__cards">
        <DashboardCard
          title="Total Expenses"
          amount="$5,000"
          percentage="10% more than last week"
        />
        <DashboardCard
          title="Total Revenue"
          amount="$10,000"
          percentage="5% less than last week"
        />
        <DashboardCard
          title="Highest Expense Category"
          amount="$10,000"
          percentage="20% less than last week"
        />
      </div>
      <div className="dashboard__bottom-container">
        <div className="dashboard__reminders">
          <DashboardReminders />
        </div>
        <div className="dashboard__expenses">
          <DashboardExpenses />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
