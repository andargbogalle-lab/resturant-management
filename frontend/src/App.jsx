import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Tables from './pages/Tables'
import Login from './pages/Login'
import ManagerDashboard from './pages/dashboards/ManagerDashboard'
import CashierDashboard from './pages/dashboards/CashierDashboard'
import ChefDashboard from './pages/dashboards/ChefDashboard'
import WaiterDashboard from './pages/dashboards/WaiterDashboard'
import CustomerDashboard from './pages/dashboards/CustomerDashboard'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/manager" element={<ManagerDashboard />} />
            <Route path="/dashboard/cashier" element={<CashierDashboard />} />
            <Route path="/dashboard/chef" element={<ChefDashboard />} />
            <Route path="/dashboard/waiter" element={<WaiterDashboard />} />
            <Route path="/dashboard/customer" element={<CustomerDashboard />} />
            <Route path="/*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/tables" element={<Tables />} />
                </Routes>
              </>
            } />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
