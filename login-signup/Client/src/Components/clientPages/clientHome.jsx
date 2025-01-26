import React from "react";
import { Outlet } from "react-router-dom";
import '../sidebar.css';
import "./clientStyling/clientHome.css";



function ClientHome() {
    return (
        <div className="new-home">
            <main className="main-content">
                <section className="overview">
                    <h2>Overview</h2>
                    <div className="calendar">
                        {/* Calendar component here */}
                    </div>
                    <div className="balance">
                        <h3>Your Balance</h3>
                        <p>Namibia Dollars</p>
                        <p>$234,000.00</p>
                    </div>
                </section>

                <section className="quick-actions">
                    <h2>Quick Actions</h2>
                    <button>Make Payment</button>
                    <button>Apply for a Loan</button>
                </section>

                <section className="recommendations">
                    <h2>Recommendations</h2>
                    <div className="loan-offers">
                        <p>Loan Offers</p>
                    </div>
                    <div className="financial-tips">
                        <p>Financial Tips</p>
                    </div>
                </section>

                <section className="account-activity">
                    <h2>Account Activity</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Method</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Account activity rows here */}
                        </tbody>
                    </table>
                </section>

                <section className="data-insights">
                    <h2>Data & Insights</h2>
                    {/* Data visualization here */}
                </section>
            </main>
            <Outlet />
        </div>
    );
}

export default ClientHome;