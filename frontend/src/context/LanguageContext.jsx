import { createContext, useState, useContext } from 'react'

const LanguageContext = createContext()

export const translations = {
  en: {
    // Navbar
    home: 'Home',
    menu: 'Menu',
    tables: 'Tables',
    login: 'Login',
    
    // Home
    restaurantName: 'Betesida Restaurant',
    backendStatus: 'Backend Status',
    checkingConnection: 'Checking backend connection...',
    
    // Menu
    ourMenu: 'Our Menu',
    allItems: 'All Items',
    unavailable: 'Unavailable',
    
    // Tables
    restaurantTables: 'Restaurant Tables',
    noTables: 'No tables available',
    seats: 'seats',
    available: 'Available',
    occupied: 'Occupied',
    reserved: 'Reserved',
    
    // Login
    email: 'Email',
    password: 'Password',
    loggingIn: 'Logging in...',
    loginFailed: 'Login failed',
    demoAccounts: 'Demo Accounts (password: password)',
    enterEmail: 'Enter your email',
    enterPassword: 'Enter your password',
    
    // Dashboard
    welcome: 'Welcome',
    logout: 'Logout',
    quickActions: 'Quick Actions',
    totalOrders: 'Total Orders',
    totalTables: 'Total Tables',
    menuItems: 'Menu Items',
    manageMenu: 'Manage Menu',
    manageTables: 'Manage Tables',
    viewReports: 'View Reports',
    manageStaff: 'Manage Staff',
    pendingOrders: 'Pending Orders',
    preparing: 'Preparing',
    completedToday: 'Completed Today',
    totalRevenue: 'Total Revenue',
    processPayment: 'Process Payment',
    viewInvoices: 'View Invoices',
    dailyReport: 'Daily Report',
    kitchenOrders: 'Kitchen Orders',
    noPendingOrders: 'No pending orders',
    availableTables: 'Available Tables',
    occupiedTables: 'Occupied Tables',
    reservedTables: 'Reserved Tables',
    viewAllTables: 'View All Tables',
    viewMenu: 'View Menu',
    takeNewOrder: 'Take New Order',
    browseMenu: 'Browse Menu',
    myCart: 'My Cart',
    orderHistory: 'Order History',
    favorites: 'Favorites',
    
    // Roles
    manager: 'Manager',
    cashier: 'Cashier',
    chef: 'Chef',
    waiter: 'Waiter',
    customer: 'Customer',
  },
  am: {
    // Navbar
    home: 'መነሻ',
    menu: 'ምናሌ',
    tables: 'ጠረጴዛዎች',
    login: 'ግባ',
    
    // Home
    restaurantName: 'ቤተ ሳይዳ ሬስቶራንት',
    backendStatus: 'የስርዓት ሁኔታ',
    checkingConnection: 'ግንኙነት በማረጋገጥ ላይ...',
    
    // Menu
    ourMenu: 'የእኛ ምናሌ',
    allItems: 'ሁሉም ምግቦች',
    unavailable: 'አይገኝም',
    
    // Tables
    restaurantTables: 'የሬስቶራንት ጠረጴዛዎች',
    noTables: 'ምንም ጠረጴዛ የለም',
    seats: 'መቀመጫዎች',
    available: 'ክፍት',
    occupied: 'ተይዟል',
    reserved: 'ተያዟል',
    
    // Login
    email: 'ኢሜይል',
    password: 'የይለፍ ቃል',
    loggingIn: 'በመግባት ላይ...',
    loginFailed: 'መግባት አልተሳካም',
    demoAccounts: 'የሙከራ መለያዎች (የይለፍ ቃል: password)',
    enterEmail: 'ኢሜይልዎን ያስገቡ',
    enterPassword: 'የይለፍ ቃልዎን ያስገቡ',
    
    // Dashboard
    welcome: 'እንኳን ደህና መጡ',
    logout: 'ውጣ',
    quickActions: 'ፈጣን እርምጃዎች',
    totalOrders: 'ጠቅላላ ትዕዛዞች',
    totalTables: 'ጠቅላላ ጠረጴዛዎች',
    menuItems: 'የምናሌ ዕቃዎች',
    manageMenu: 'ምናሌን አስተዳድር',
    manageTables: 'ጠረጴዛዎችን አስተዳድር',
    viewReports: 'ሪፖርቶችን ይመልከቱ',
    manageStaff: 'ሰራተኞችን አስተዳድር',
    pendingOrders: 'በመጠባበቅ ላይ ያሉ ትዕዛዞች',
    preparing: 'በዝግጅት ላይ',
    completedToday: 'ዛሬ የተጠናቀቁ',
    totalRevenue: 'ጠቅላላ ገቢ',
    processPayment: 'ክፍያ አስተናግድ',
    viewInvoices: 'ደረሰኞችን ይመልከቱ',
    dailyReport: 'የዕለት ሪፖርት',
    kitchenOrders: 'የኩሽና ትዕዛዞች',
    noPendingOrders: 'በመጠባበቅ ላይ ያሉ ትዕዛዞች የሉም',
    availableTables: 'ክፍት ጠረጴዛዎች',
    occupiedTables: 'የተያዙ ጠረጴዛዎች',
    reservedTables: 'የተያዙ ጠረጴዛዎች',
    viewAllTables: 'ሁሉንም ጠረጴዛዎች ይመልከቱ',
    viewMenu: 'ምናሌን ይመልከቱ',
    takeNewOrder: 'አዲስ ትዕዛዝ ውሰድ',
    browseMenu: 'ምናሌን አስሱ',
    myCart: 'የእኔ ጋሪ',
    orderHistory: 'የትዕዛዝ ታሪክ',
    favorites: 'ተወዳጆች',
    
    // Roles
    manager: 'ስራ አስኪያጅ',
    cashier: 'ገንዘብ ተቀባይ',
    chef: 'ሼፍ',
    waiter: 'አስተናጋጅ',
    customer: 'ደንበኛ',
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const t = (key) => {
    return translations[language][key] || key
  }

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'am' : 'en')
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
