import './adminStyling/adminMessages.css'; 
import { FaHome, FaFileAlt, FaEnvelope, FaChartBar, FaCog, FaSearch  } from 'react-icons/fa';
import { MdInbox, MdPeople, MdGroups, MdStar, MdDelete} from 'react-icons/md';
import { MdOutlineAttachment } from 'react-icons/md';
import { FaMicrophone } from 'react-icons/fa';
import { HiPaperAirplane } from 'react-icons/hi';
  

const AdminMessages = () => {

    const sidebarLinks = [
        { icon: <MdInbox />, text: 'All Inbox', subtext: 'View all your messages' },
        { icon: <MdPeople />, text: 'Clients', subtext: 'Manage your clients' },
        { icon: <MdGroups  />, text: 'Staff', subtext: 'Manage your staff' },
        { icon: <MdStar />, text: 'Starred', subtext: 'Important messages' },
        { icon: <MdDelete />, text: 'Deleted', subtext: 'Recently deleted messages' },
      ];


  return (
    <div className="wrapper">
    <div className="container-1">
        <div className="chat-container">
        <div className="chat-left">
      <ul className="sidebar-list-1">
        {sidebarLinks.map((link, index) => (
          <li key={index} className="sidebar-item-1">
            <a href="#" className="sidebar-link-1">
              <span className="sidebar-icon-1">{link.icon}</span>
              <div className="sidebar-text-container-1"> 
                <span className="sidebar-text-1">{link.text}</span><br/> 
                <span className="sidebar-subtext-1">{link.subtext}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
        <div className="chat-right">
        <aside className="sidebar-1">
        <div className="search-box">
          <input type="text" placeholder="Search Chat" />
          <button > <FaSearch/></button>
        </div>
        <div className="chat-list">
          {['Moses UriKhab', 'Admin Group', 'Jimmy Takluk', 'Jane Kuvare'].map((name, index) => (
            <div key={index} className={`chat-item ${name === 'Admin Group' ? 'active' : ''}`}>
              <img src="../assets/woman.png" alt="Contact Avatar" />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </aside>
      <main className="chat-area">
        <div className="chat-item active">
          <img src="../assets/woman.png" alt="Contact Avatar" />
          <div className="chat-item-text">
            <p>Admin Group</p>
            <p className="subtext">Senior Administrator</p>
          </div>
        </div>

        <div className="message-area">
          <div className="message received">
            <img src="../assets/woman.png" alt="Contact Avatar" />
            <p>Jamie has instructed me to tell you to focus on the pending application sent in this week as there is an overflow on clients that was not addressed yet.</p>
          </div>
          <div className="message sent">
            <img src="../assets/woman.png" alt="User Avatar" />
            <p>Sure thing, I will begin with that promptly.</p>
          </div>
          <div className="message received">
            <img src="../assets/woman.png" alt="Contact Avatar" />
            <p>How many applications were you able to complete?</p>
          </div>
          <div className="message sent">
            <img src="../assets/woman.png" alt="User Avatar" />
            <p>About 20 or so, why?</p>
          </div>
        </div>

        <div className="input-area">
      <div className="input-wrapper">
        <input type="text" placeholder="Type a message..." />
        <MdOutlineAttachment className="input-icon right" />
        <FaMicrophone className="input-icon right" />
        <HiPaperAirplane className="input-icon right send-icon" /> {/* Added class */}
      </div>
    </div>
      </main>
        </div>
      </div>
      </div>
      </div>
      
  );
};

export default AdminMessages;