import React from "react";
import Sidebar from '../Components/sidebar'
import '../css/HomeLoanpage.css'
import { Link } from "react-router-dom";

//importing icons
import { FaSearch } from "react-icons/fa";
import { MdOutlineNewspaper } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { FaRegNewspaper } from "react-icons/fa6";


const HomeLoanpage = () =>{

    return(
    <div>
        <Sidebar />
        <div className = 'HomeLoan-container'>
           <div className = 'HomeLoan-header-conainer'>
            <Link to = {'/ApplyforLoan'}>
            <div className = 'ApplyCard'>
               <label htmlFor="Icon" ><FaRegNewspaper /></label>
               <h1>Apply for a Loan</h1>
               <p>Get started on your loan today</p>


            </div>
            </Link>
            <div className = 'PaymentCard'>
            <label htmlFor="Icon" ><MdOutlineNewspaper /></label>
               <h1>Make a payment</h1>
               <p> Get started with your payment</p>

            </div>
            <div className = 'DiscoverCard'>
            <label htmlFor="Icon" ><RiGraduationCapFill /></label>
               <h1>Discover more</h1>
               <p>Explore tips and tools for smarter browsing!</p>

            </div>

           </div>
           <div className = 'HomeLoan-body-conainer'>
            <div className = 'HomeLoan-inputCard'>
                <input type="text" placeholder="Search..." className = 'search-input'/>
                <button className = 'search-button'> <FaSearch /></button>
            </div>
            <div className = 'LoantableCard'>
                <div className = 'LoantableCard-header' >
                    <label htmlFor="Loans">Loans</label>

                </div>
                <div className="LoantableCard-body">
                    <h1>
                        there are no loans available at the moment
                    </h1>

                </div>

            </div>


           </div>


            
        </div>
    </div>
        
    )
}

export default HomeLoanpage;