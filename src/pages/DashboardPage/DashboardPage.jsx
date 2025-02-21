import React, { useState, useEffect } from "react";
import "../DashboardPage/DashboardPage.scss";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import DashboardExpenses from "../../components/DashboardExpenses/DashboardExpenses";
import DashboardReminders from "../../components/DashboardReminders/DashboardReminders";
import axios from "axios";

const DashboardPage = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [formattedAmountChange, setFormattedAmountChange] = useState("");
  const [percentageChange, setPercentageChange] = useState("");

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/budget");

        const currentMonth = new Date().toLocaleString("default", {
          month: "long",
        });

        const prevMonth = new Date();
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        const prevMonthName = prevMonth.toLocaleString("default", {
          month: "long",
        });

        const currentMonthExpenses = response.data.filter(
          (entry) => entry.month.toLowerCase() === currentMonth.toLowerCase()
        );

        const prevMonthExpenses = response.data.filter(
          (entry) => entry.month.toLowerCase() === prevMonthName.toLowerCase()
        );

        const currentTotal = currentMonthExpenses.reduce(
          (sum, entry) => sum + parseFloat(entry.amount || 0),
          0
        );

        const prevTotal = prevMonthExpenses.reduce(
          (sum, entry) => sum + parseFloat(entry.amount || 0),
          0
        );

        setTotalExpenses(currentTotal);

        const change = Math.abs(currentTotal - prevTotal).toLocaleString(
          undefined,
          {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        );

        setFormattedAmountChange({
          value: `${change} ${currentTotal > prevTotal ? "up" : "down"}`,
          isIncrease: currentTotal > prevTotal,
        });

        const percentage =
          prevTotal === 0 ? 0 : ((currentTotal - prevTotal) / prevTotal) * 100;
        setPercentageChange(Math.abs(percentage).toFixed(2)); // Use Math.abs() to remove the sign
      } catch (error) {
        console.error("Error fetching budget data:", error);
      }
    };

    fetchBudgetData();
  }, []);

  const amountChangeColor = formattedAmountChange.isIncrease ? "red" : "green";
  const percentageChangeColor = formattedAmountChange.isIncrease
    ? "red"
    : "green";
  const percentageArrow = formattedAmountChange.isIncrease ? "↑" : "↓";

  return (
    <div className="dashboard">
      <div className="dashboard__cards">
        <DashboardCard
          title="Total Expenses"
          amount={`$${totalExpenses.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          amountChange={
            <div className="dashboard__total-expense">
              <span
                style={{
                  color: amountChangeColor,
                }}
              >
                {formattedAmountChange.value} from last month
              </span>
              <div
                className="dashboard__percentage-change"
                style={{
                  color: percentageChangeColor,
                }}
              >
                {percentageChange}% {percentageArrow}
              </div>
            </div>
          }
        />
        <DashboardCard
          title="Lowest Expense category"
          amount="$10,000"
          amountChange="amountChange"
          percentage="5% less than last month"
        />
        <DashboardCard
          title="Highest Expense Category"
          amount="$10,000"
          amountChange="amountChange"
          percentage="20% less than last month"
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
