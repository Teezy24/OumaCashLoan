import React from 'react';
import "./adminStyling/adminAnalytics.css";
import { FaHome, FaFileAlt, FaEnvelope, FaChartBar, FaCog,FaWallet } from "react-icons/fa";
import { Bar, Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { IoFilter } from "react-icons/io5";


Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const AdminAnalytics = () => {
    
    const chartData = {
        labels: ["1Dec", "4Dec", "8Dec", "12Dec", "16Dec", "20Dec", "24Dec", "28Dec", "31Dec"],
        datasets: [
            {
                label: "On-time Payments",
                data: [30, 60, 90, 120, 40, 80, 50, 100, 70],
                backgroundColor: "rgb(59,122,240)",
                borderRadius: 5,
                stack: "Stack 1"
            },
            {
                label: "Late Payments",
                data: [50, 40, 70, 90, 60, 50, 80, 60, 90],
                backgroundColor: "rgb(147,179,251)",
                borderRadius: 5,
                stack: "Stack 1"
            }
        ]
    };

    
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: "#fff",
        plugins: {
            legend: {
                labels: {
                    color: "#333",
                    font: { size: 14 }
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                ticks: {
                    color: "#333",
                    font: { size: 12 },
                    maxRotation: 90,
                    minRotation: 90
                }
            },
            y: {
                stacked: true,
                beginAtZero: true,
                grid: { color: "rgba(0,0,0,0.1)" },
                ticks: { color: "#333", font: { size: 12 } }
            }
        }
    };

    const lineChartData = {
        labels: Array.from({ length: 20 }, (_, i) => `I ${i + 1}`), 
        datasets: [
            {
                label: "Growth",
                data: [10, 15, 20, 18, 25, 30, 35, 40, 38, 45, 50, 55, 53, 58, 60, 65, 70, 75, 73, 80],
                borderColor: "rgb(59, 122, 240)", 
                backgroundColor: "rgba(59, 122, 240, 0.2)", 
                borderWidth: 3,
                pointBackgroundColor: "rgb(59, 122, 240)",
                pointBorderColor: "#fff",
                pointRadius: 6,
                pointHoverRadius: 8,
                fill: true,
                tension: 0.4 
            },
            {
                label: "Projected",
                data: Array(20).fill(50), 
                borderColor: "rgb(34, 197, 94)", 
                borderWidth: 3,
                pointRadius: 0,
                fill: false,
                tension: 0.4 
            }
        ]
    };
    
    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: "#333",
                    font: { size: 14, weight: "bold" }
                }
            }
        },
        scales: {
            x: {
                grid: { display: false }, 
                ticks: {
                    color: "#333",
                    font: { size: 12, weight: "bold" },
                    maxRotation: 90,
                    minRotation: 90
                }
            },
            y: {
                beginAtZero: true,
                grid: { color: "rgba(0,0,0,0.05)" }, 
                ticks: { color: "#333", font: { size: 12, weight: "bold" } }
            }
        }
    };  

    const clusteredBarData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
            {
                label: "Number of Users",
                data: [200, 400, 600, 300, 500, 250, 450], 
                backgroundColor: "#6084EC",
                borderRadius: 5
            },
            {
                label: "Loan Applications",
                data: [150, 350, 550, 270, 420, 220, 390], 
                backgroundColor: "#30C0E6",
                borderRadius: 5
            }
        ]
    };
    
    const clusteredBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#333", font: { size: 12, weight: "bold" },
                maxRotation: 90,
                minRotation: 90
            }
            },
            y: {
                beginAtZero: true,
                grid: { color: "rgba(0,0,0,0.1)" },
                ticks: { color: "#333", font: { size: 12, weight: "bold" } },
                suggestedMax: 600
            }
        },
        plugins: {
            legend: {
                labels: { color: "#333", font: { size: 14, weight: "bold" } }
            }
        }
    };
    
    return (
        <><div className="analytics-dashboard">
                <div className="data-overview">
                        <div class="key-metrics">
                <div class="metric-card">
                    <div class="metric-info">
                        <div class="metric-title">Total Loan Applications <span class="metric-value">25.0%</span></div>
                        <div class="metric-number">823 <span class="metric-footer">vs Last month 660</span></div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-info">
                        <div class="metric-title">Total Active Loans <span class="metric-value">54.97%</span></div>
                        <div class="metric-number">525 <span class="metric-footer">vs Last month 330</span></div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-info">
                        <div class="metric-title">Total Loan Disbursements <span class="metric-value">9.69%</span></div>
                        <div class="metric-number">298 <span class="metric-footer">vs Last month 330</span></div>
                    </div>
                </div>
                <div class="metric-card">
                    <div class="metric-info">
                        <div class="metric-title">Total Active Loans <span class="metric-value">37.5%</span></div>
                        <div class="metric-number">741 <span class="metric-footer">vs Last month 530</span></div>
                    </div>
                </div>
            </div>

                    <div className="performance-summary">
                        <div className="chart-area">
                            <div className="chart-heading">
                                <div className="chart-name">Payment Performance Chart</div>
                                <div className="chart-controls"><IoFilter />Filter</div>
                            </div>
                            <div style={{ height: "300px" }}>
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        </div>

                        <div className="revenue-overview">
                            <div className="revenue-heading">
                                <div className="revenue-name">Total Revenue</div>
                                <div className="revenue-controls"><IoFilter />Filter</div>
                            </div>
                            <div className="revenue-total">$300,000.00</div>
                            <div className="revenue-change">3%</div>
                            <div className="line-chart-container" style={{ height: "250px", marginTop: "20px" }}>
                                <Line data={lineChartData} options={lineChartOptions} />
                            </div>
                        </div>
                    </div>

                    <div className="detailed-data">
                        <div className="loan-stats">
                            <div className="section-header"><div className="section-title">Top Loan Performance</div></div>
                            <div class="image-placeholder">
                            <img src="/assets/woman.png" alt="me"/>
                        </div>
                        <div class="percentage">
                            97%
                        </div>
                        <div class="description">
                            Your top loan performance is by
                        </div>
                        <div class="name">
                            Jane Kuvare
                        </div>
                        </div>
                        <div className="loan-categories">
                            <div className="section-header">
                                <div className="section-title">Most Preferred Loan Type</div>
                            </div>
                            <div className="loan-stats-1"> 
                                <div className="icon">
                                    <FaWallet /> 
                                </div>
                                <div className="percentage-1">57%</div>
                                <div className="description">
                                    Of the selected loans are <span className="loan-type-1">Personal Loans</span>
                                </div>
                            </div>
                        </div>
                        <div className="user-activity-summary">
                            <div className="section-header"><div className="section-title">User Activity</div></div>
                            <div style={{ height: "300px" }}>
                            <Bar data={clusteredBarData} options={clusteredBarOptions} />
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminAnalytics;

