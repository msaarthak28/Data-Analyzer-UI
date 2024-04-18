import React, {useState} from "react";
import axios from "axios";
import "./SalesAnalyzer.css";
import Loader from "../Loader/Loader";

function SalesAnalyzer() {
  const [totalSales, setTotalSales] = useState(null);
  const [monthWiseSales, setMonthWiseSales] = useState(null);
  const [mostPopularItem, setMostPopularItem] = useState(null);
  const [highestRevenueItems, setHighestRevenueItems] = useState(null);
  const [mostPopularItemStats, setMostPopularItemStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const monthNames = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const fetchData = async (endpoint, setter) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://data-analyzer-28a33d21fbe6.herokuapp.com/${endpoint}`
      );
      setter(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleGetTotalSales = () => {
    fetchData("totalSales", setTotalSales);
  };

  const handleGetMonthWiseSales = () => {
    fetchData("monthWiseSales", setMonthWiseSales);
  };

  const handleGetMostPopularItem = () => {
    fetchData("mostPopularItem", setMostPopularItem);
  };

  const handleGetHighestRevenueItems = () => {
    fetchData("highestRevenueItems", setHighestRevenueItems);
  };

  const handleGetMostPopularItemStats = () => {
    fetchData("mostPopularItemStats", setMostPopularItemStats);
  };

  return (
    <div>
      {loading && <Loader />}
      <div className="sales-analyzer-container">
        <div className="stat-section">
          <h2>Total Sales</h2>
          <button className="get-stat-btn" onClick={handleGetTotalSales}>
            Fetch Data
          </button>
          <p>
            {totalSales && (
              <span className="stat-value">
                Total Sales: {totalSales.totalSales} Rupees
              </span>
            )}
          </p>
        </div>
        <div className="stat-section">
          <h2>Month Wise Sales</h2>
          <button className="get-stat-btn" onClick={handleGetMonthWiseSales}>
            Fetch Data
          </button>
          <div className="table-container">
            {monthWiseSales && (
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Sales (Rupees)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(monthWiseSales).map(([month, sales]) => (
                    <tr key={month}>
                      <td>{monthNames[month]}</td>
                      <td>{sales}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="stat-section">
          <h2>Most Popular Item</h2>
          <button className="get-stat-btn" onClick={handleGetMostPopularItem}>
            Fetch Data
          </button>
          <div className="table-container">
            {mostPopularItem && (
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Item</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(mostPopularItem).map(
                    ([month, {item, quantity}]) => (
                      <tr key={month}>
                        <td>{monthNames[month]}</td>
                        <td>{item}</td>
                        <td>{quantity}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="stat-section">
          <h2>Highest Revenue Items</h2>
          <button
            className="get-stat-btn"
            onClick={handleGetHighestRevenueItems}
          >
            Fetch Data
          </button>
          <div className="table-container">
            {highestRevenueItems && (
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Item</th>
                    <th>Revenue (Rupees)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(highestRevenueItems).map(
                    ([month, {item, revenue}]) => (
                      <tr key={month}>
                        <td>{monthNames[month]}</td>
                        <td>{item}</td>
                        <td>{revenue}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className="stat-section">
          <h2>Most Popular Item Stats</h2>
          <button
            className="get-stat-btn"
            onClick={handleGetMostPopularItemStats}
          >
            Fetch Data
          </button>
          <div className="table-container">
            {mostPopularItemStats && (
              <table>
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Item</th>
                    <th>Min Orders</th>
                    <th>Max Orders</th>
                    <th>Avg Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(mostPopularItemStats).map(
                    ([month, {item, minOrders, maxOrders, avgOrders}]) => (
                      <tr key={month}>
                        <td>{monthNames[month]}</td>
                        <td>{item}</td>
                        <td>{minOrders}</td>
                        <td>{maxOrders}</td>
                        <td>{avgOrders}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesAnalyzer;
