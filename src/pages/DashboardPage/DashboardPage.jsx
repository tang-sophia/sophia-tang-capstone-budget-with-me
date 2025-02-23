import React, { useState, useEffect } from "react";
import "../DashboardPage/DashboardPage.scss";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import DashboardExpenses from "../../components/DashboardExpenses/DashboardExpenses";
import DashboardReminders from "../../components/DashboardReminders/DashboardReminders";
import axios from "axios";

const DashboardPage = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [formattedAmountChange, setFormattedAmountChange] = useState({
    value: "",
    isIncrease: false,
  });
  const [percentageChange, setPercentageChange] = useState("");
  const [lowestCategory, setLowestCategory] = useState({
    category: "",
    total: 0,
    amountChange: "",
    percentageChange: "",
    isIncrease: false,
  });
  const [highestCategory, setHighestCategory] = useState({
    category: "",
    total: 0,
    amountChange: "",
    percentageChange: "",
    isIncrease: false,
  });

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/budget");
        const data = response.data || [];

        const currentMonth = new Date().toLocaleString("default", {
          month: "long",
        });
        const prevMonth = new Date();
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        const prevMonthName = prevMonth.toLocaleString("default", {
          month: "long",
        });

        const currentMonthExpenses = data.filter(
          (entry) => entry.month.toLowerCase() === currentMonth.toLowerCase()
        );

        const prevMonthExpenses = data.filter(
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
        setPercentageChange(Math.abs(percentage).toFixed(2));

        const categoryTotals = currentMonthExpenses.reduce((acc, entry) => {
          if (!acc[entry.category]) {
            acc[entry.category] = 0;
          }
          acc[entry.category] += parseFloat(entry.amount || 0);
          return acc;
        }, {});

        const lowestCategoryEntry = Object.entries(categoryTotals).reduce(
          (lowest, [category, total]) => {
            return total < lowest.total ? { category, total } : lowest;
          },
          { category: "", total: Infinity }
        );

        const highestCategoryEntry = Object.entries(categoryTotals).reduce(
          (highest, [category, total]) => {
            return total > highest.total ? { category, total } : highest;
          },
          { category: "", total: -Infinity }
        );

        // Calculate amountChange and percentageChange for the lowest category
        const prevMonthLowestCategoryTotal = prevMonthExpenses
          .filter((entry) => entry.category === lowestCategoryEntry.category)
          .reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0);

        let lowestAmountChange;
        if (lowestCategoryEntry.total === prevMonthLowestCategoryTotal) {
          // If there is no change, display "No change from last month"
          lowestAmountChange = "No change from last month";
        } else {
          lowestAmountChange = `${Math.abs(
            lowestCategoryEntry.total - prevMonthLowestCategoryTotal
          ).toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} ${
            lowestCategoryEntry.total > prevMonthLowestCategoryTotal
              ? "up"
              : "down"
          }`;
        }

        let lowestPercentageChange;
        let lowestPercentageChangeDisplay;
        if (prevMonthLowestCategoryTotal === 0) {
          // If the previous month's total is zero, the percentage change should be 100% if the current total is greater than zero
          lowestPercentageChange = lowestCategoryEntry.total > 0 ? 100 : 0;
          lowestPercentageChangeDisplay = `${Math.abs(
            lowestPercentageChange
          ).toFixed(2)}% ${
            lowestCategoryEntry.total > prevMonthLowestCategoryTotal ? "↑" : "↓"
          }`;
        } else if (lowestCategoryEntry.total === prevMonthLowestCategoryTotal) {
          // If there is no change, display 0.00% with no arrow
          lowestPercentageChange = 0;
          lowestPercentageChangeDisplay = `${Math.abs(
            lowestPercentageChange
          ).toFixed(2)}%`;
        } else {
          lowestPercentageChange =
            ((lowestCategoryEntry.total - prevMonthLowestCategoryTotal) /
              prevMonthLowestCategoryTotal) *
            100;
          lowestPercentageChangeDisplay = `${Math.abs(
            lowestPercentageChange
          ).toFixed(2)}% ${
            lowestCategoryEntry.total > prevMonthLowestCategoryTotal ? "↑" : "↓"
          }`;
        }

        setLowestCategory({
          ...lowestCategoryEntry,
          amountChange: lowestAmountChange,
          percentageChange: lowestPercentageChangeDisplay,
          isIncrease: lowestCategoryEntry.total > prevMonthLowestCategoryTotal,
        });

        // Calculate amountChange and percentageChange for the highest category
        const prevMonthHighestCategoryTotal = prevMonthExpenses
          .filter((entry) => entry.category === highestCategoryEntry.category)
          .reduce((sum, entry) => sum + parseFloat(entry.amount || 0), 0);

        let highestAmountChange;
        if (highestCategoryEntry.total === prevMonthHighestCategoryTotal) {
          // If there is no change, display "No change from last month"
          highestAmountChange = "No change from last month";
        } else {
          highestAmountChange = `${Math.abs(
            highestCategoryEntry.total - prevMonthHighestCategoryTotal
          ).toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} ${
            highestCategoryEntry.total > prevMonthHighestCategoryTotal
              ? "up"
              : "down"
          }`;
        }

        let highestPercentageChange;
        let highestPercentageChangeDisplay;
        if (prevMonthHighestCategoryTotal === 0) {
          // If the previous month's total is zero, the percentage change should be 100% if the current total is greater than zero
          highestPercentageChange = highestCategoryEntry.total > 0 ? 100 : 0;
          highestPercentageChangeDisplay = `${Math.abs(
            highestPercentageChange
          ).toFixed(2)}% ${
            highestCategoryEntry.total > prevMonthHighestCategoryTotal
              ? "↑"
              : "↓"
          }`;
        } else if (
          highestCategoryEntry.total === prevMonthHighestCategoryTotal
        ) {
          // If there is no change, display 0.00% with no arrow
          highestPercentageChange = 0;
          highestPercentageChangeDisplay = `${Math.abs(
            highestPercentageChange
          ).toFixed(2)}%`;
        } else {
          highestPercentageChange =
            ((highestCategoryEntry.total - prevMonthHighestCategoryTotal) /
              prevMonthHighestCategoryTotal) *
            100;
          highestPercentageChangeDisplay = `${Math.abs(
            highestPercentageChange
          ).toFixed(2)}% ${
            highestCategoryEntry.total > prevMonthHighestCategoryTotal
              ? "↑"
              : "↓"
          }`;
        }

        setHighestCategory({
          ...highestCategoryEntry,
          amountChange: highestAmountChange,
          percentageChange: highestPercentageChangeDisplay,
          isIncrease:
            highestCategoryEntry.total > prevMonthHighestCategoryTotal,
        });
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
          title={`Lowest Expense Category: ${
            lowestCategory.category || "No data"
          }`}
          amount={`$${lowestCategory.total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          amountChange={
            <div className="dashboard__total-expense">
              <span
                style={{
                  color: lowestCategory.isIncrease ? "red" : "green",
                }}
              >
                {lowestCategory.amountChange || "No data"}
              </span>
              <div
                className="dashboard__percentage-change"
                style={{
                  color: lowestCategory.isIncrease ? "red" : "green",
                }}
              >
                {lowestCategory.percentageChange || "No data"}
              </div>
            </div>
          }
        />
        <DashboardCard
          title={`Highest Expense Category: ${
            highestCategory.category || "No data"
          }`}
          amount={`$${highestCategory.total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          amountChange={
            <div className="dashboard__total-expense">
              <span
                style={{
                  color: highestCategory.isIncrease ? "red" : "green",
                }}
              >
                {highestCategory.amountChange || "No data"} from last month
              </span>
              <div
                className="dashboard__percentage-change"
                style={{
                  color: highestCategory.isIncrease ? "red" : "green",
                }}
              >
                {highestCategory.percentageChange || "No data"}
              </div>
            </div>
          }
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
