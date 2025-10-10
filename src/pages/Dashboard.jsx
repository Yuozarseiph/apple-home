import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { LogOut, UserCircle, Bell, BarChart2, Settings, HelpCircle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const Card = ({ children, className = "" }) => (
    <motion.div variants={itemVariants} className={`bg-gray-800/80 border border-gray-700/60 rounded-2xl shadow-lg p-6 ${className}`}>
        {children}
    </motion.div>
);

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    
    const fetchUserData = async () => {
      try {
        // Mocking user data as the endpoint might not be available
        // const response = await axios.get("/api/user", { headers: { Authorization: `Bearer ${token}` } });
        // setUserData(response.data);
        setTimeout(() => setUserData({ name: "Yousef", email: "hi@yuozarseiph.top" }), 500);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authchange"));
    navigate("/");
  };

  if (!userData) {
    return <div className="flex bg-gray-900 items-center justify-center h-screen text-lg text-gray-400">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-24 pb-28">
      <motion.div 
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-teal-400">Dashboard</h1>
          <motion.button onClick={handleLogout} className="flex items-center gap-2 bg-gray-700 text-white font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-red-500 transition-colors" whileHover={{ scale: 1.05 }}>
            <LogOut size={18} /><span>Logout</span>
          </motion.button>
        </motion.div>

        <Card className="flex items-center gap-6">
          <UserCircle size={64} className="text-teal-400"/>
          <div>
            <h2 className="text-2xl font-bold">Welcome, <span className="text-teal-400">{userData.name}</span></h2>
            <p className="text-gray-400">Here’s what’s happening today.</p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="text-center">
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Your Name</h3>
                <p className="font-bold text-xl">{userData.name}</p>
            </Card>
             <Card className="text-center">
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Apple ID</h3>
                <p className="font-bold text-xl">{userData.email}</p>
            </Card>
             <Card className="text-center">
                <h3 className="text-lg font-semibold text-gray-400 mb-2">Active Devices</h3>
                <p className="font-bold text-xl">1 (Demo)</p>
            </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
                <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center gap-2"><Bell size={20}/>Recent Activity</h3>
                <ul className="space-y-2 text-gray-300">
                    <li>Signed in from a new device</li>
                    <li>Account settings updated</li>
                </ul>
            </Card>
             <Card>
                <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center gap-2"><BarChart2 size={20}/>Your Usage</h3>
                <p className="text-gray-400">Usage stats coming soon.</p>
            </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
           <Card>
              <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center gap-2"><Settings size={20}/>Quick Actions</h3>
              <ul className="space-y-2">
                  <li><Link to="/profile" className="hover:text-teal-400 transition-colors">Manage Account</Link></li>
                  <li><Link to="/orders" className="hover:text-teal-400 transition-colors">Check Order Status</Link></li>
              </ul>
            </Card>
            <Card>
                <h3 className="text-lg font-bold text-teal-400 mb-4 flex items-center gap-2"><HelpCircle size={20}/>Need Help?</h3>
                <ul className="space-y-2">
                    <li><Link to="/faq" className="hover:text-teal-400 transition-colors">Visit FAQ</Link></li>
                    <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Get in Touch</Link></li>
                </ul>
            </Card>
        </div>

      </motion.div>
    </div>
  );
};

export default Dashboard;
