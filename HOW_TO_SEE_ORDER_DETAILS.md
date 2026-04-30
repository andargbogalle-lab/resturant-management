# 📋 HOW TO SEE ORDER DETAILS

## 👥 BY USER TYPE

---

## 1. 🍽️ **GUESTS (No Login Required)**

### **Current Limitation:**
Guests who place orders **CANNOT** see their order details after placing.

### **What Guests See:**
- ✅ Menu items
- ✅ Cart before ordering
- ✅ Success message after placing order
- ❌ **NO order history**
- ❌ **NO order tracking**
- ❌ **NO order details after submission**

### **Why?**
Guests don't have accounts, so the system doesn't track which orders belong to them.

### **Workaround:**
- Remember your **Order ID** from the success message
- Ask staff (waiter/cashier) to check order status
- Or create a customer account and login

---

## 2. 👨‍🍳 **CHEF (Kitchen Staff)**

### **How to See Orders:**

1. **Login** as chef:
   - Email: `chef@restaurant.com`
   - Password: `password`

2. **Dashboard shows:**
   - ✅ All pending orders
   - ✅ Orders being prepared
   - ✅ Orders ready to serve

3. **Order Details Include:**
   - Order ID
   - Table number
   - All items with quantities
   - Special notes for each item
   - Wait time (how long ago order was placed)
   - Priority indicator (urgent/high/normal)
   - Order status

4. **Actions Available:**
   - Start preparing order
   - Mark order as ready
   - View full order details
   - Update item status

### **Example View:**
```
Order #5
Table 3
Status: Pending
Wait Time: 5 min ago

Items:
- 2x ዶሮ ወጥ (Doro Wot)
  📝 Extra spicy
- 1x ጠጅ (Tej)

[🔥 Start Preparing] [View Details]
```

---

## 3. 🍽️ **WAITER**

### **How to See Orders:**

1. **Login** as waiter:
   - Email: `waiter@restaurant.com`
   - Password: `password`

2. **Go to "Active Orders" tab**

3. **Order Details Include:**
   - Order ID
   - Table number
   - Total amount
   - Number of items
   - Order time
   - Current status

4. **Actions Available:**
   - View order details
   - Serve order (when ready)
   - Clear table after completion

### **Example View:**
```
Order #5
Table: 3
Total: $450.00
Items: 3
Time: 2:30 PM
Status: Ready

[✅ Serve Order]
```

---

## 4. 💰 **CASHIER**

### **How to See Orders:**

1. **Login** as cashier:
   - Email: `cashier@restaurant.com`
   - Password: `password`

2. **Go to "Pending Payments" tab**

3. **Order Details Include:**
   - Order ID
   - Table number
   - Number of items
   - Order time
   - **Total amount to pay**
   - Order status

4. **Actions Available:**
   - Process payment
   - View order details
   - Issue refunds

### **Example View:**
```
Order #5
Table: 3
Items: 3
Time: 2:30 PM

Total Amount: $450.00

[💳 Process Payment]
```

---

## 5. 🛍️ **CUSTOMER (Logged In)**

### **How to See Orders:**

1. **Login** as customer:
   - Email: `customer@restaurant.com`
   - Password: `password`

2. **Go to "My Orders" tab**

3. **Order Details Include:**
   - Order ID
   - Table number
   - All items with quantities and prices
   - Total amount
   - Order date and time
   - Current status

4. **Full Order History:**
   - See all past orders
   - Track current order status
   - View itemized details

### **Example View:**
```
Order #5
Status: Preparing

Table: 3
Items: 3
Total: $450.00
Date: April 30, 2026 2:30 PM

Items:
- 2x ዶሮ ወጥ (Doro Wot) - $500.00
- 1x ጠጅ (Tej) - $100.00
```

---

## 6. 👔 **MANAGER**

### **How to See Orders:**

1. **Login** as manager:
   - Email: `manager@restaurant.com`
   - Password: `password`

2. **Manager sees ALL orders** from all users

3. **Full Access:**
   - View all orders
   - See order details
   - Track order status
   - View payment information
   - Generate reports

---

## 📊 ORDER DETAILS COMPARISON

| User Type | Can See Orders? | What They See |
|-----------|----------------|---------------|
| **Guest** | ❌ No | Only success message |
| **Chef** | ✅ Yes | Kitchen orders (pending/preparing/ready) |
| **Waiter** | ✅ Yes | Active orders for their tables |
| **Cashier** | ✅ Yes | Orders ready for payment |
| **Customer** | ✅ Yes | Their own order history |
| **Manager** | ✅ Yes | ALL orders + full details |

---

## 🔍 HOW TO FIND SPECIFIC ORDER

### **Method 1: By Order ID**

**For Staff (Chef/Waiter/Cashier/Manager):**
1. Login to dashboard
2. Look through order list
3. Find order by ID number

### **Method 2: By Table Number**

**For Waiter/Cashier:**
1. Login to dashboard
2. Filter by table number
3. See all orders for that table

### **Method 3: By Status**

**For Chef:**
- Pending orders
- Preparing orders
- Ready orders

**For Cashier:**
- Orders ready for payment
- Completed orders

---

## 📱 DETAILED ORDER INFORMATION

### **What's Included in Order Details:**

```
Order #5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Basic Info:
- Order ID: 5
- Table Number: 3
- Status: Preparing
- Created: April 30, 2026 2:30 PM

Items:
1. ዶሮ ወጥ (Doro Wot)
   - Quantity: 2
   - Price: $250.00 each
   - Subtotal: $500.00
   - Notes: Extra spicy

2. ጠጅ (Tej)
   - Quantity: 1
   - Price: $100.00 each
   - Subtotal: $100.00
   - Notes: None

Financial:
- Subtotal: $600.00
- Total: $600.00

Customer Info:
- Name: Guest (or customer name)
- User ID: (if logged in)

Staff Info:
- Waiter: (if assigned)
- Chef: (preparing)
- Cashier: (if paid)

Timeline:
- Ordered: 2:30 PM
- Started Preparing: 2:35 PM
- Ready: (pending)
- Served: (pending)
- Paid: (pending)
```

---

## 🎯 STEP-BY-STEP GUIDES

### **For Chef to See Order Details:**

1. Open browser: http://localhost:3000/login
2. Login:
   - Email: `chef@restaurant.com`
   - Password: `password`
3. You'll see kitchen dashboard
4. All orders are listed with details
5. Click "View Details" for full information

### **For Waiter to See Order Details:**

1. Open browser: http://localhost:3000/login
2. Login:
   - Email: `waiter@restaurant.com`
   - Password: `password`
3. Click "Active Orders" tab
4. See all current orders
5. Click on order for details

### **For Cashier to See Order Details:**

1. Open browser: http://localhost:3000/login
2. Login:
   - Email: `cashier@restaurant.com`
   - Password: `password`
3. Click "Pending Payments" tab
4. See orders ready for payment
5. Click "Process Payment" to see full details

### **For Customer to See Order Details:**

1. Open browser: http://localhost:3000/login
2. Login:
   - Email: `customer@restaurant.com`
   - Password: `password`
3. Click "My Orders" tab
4. See all your orders with full details
5. Each order shows items, prices, status

---

## 💡 TIPS

### **Tip 1: Real-Time Updates**
Chef dashboard auto-refreshes every 30 seconds to show new orders.

### **Tip 2: Order Status Flow**
```
Pending → Preparing → Ready → Served → Completed
```

### **Tip 3: Multiple Views**
Different roles see different information:
- Chef sees cooking details
- Waiter sees serving details
- Cashier sees payment details
- Customer sees their order history

### **Tip 4: Guest Orders**
Guest orders show as "Guest Order" or "Guest: [name]" in the notes field.

---

## 🚀 QUICK ACCESS

### **URLs:**

| Role | Login URL |
|------|-----------|
| All Staff | http://localhost:3000/login |
| After Login | Redirects to role dashboard |

### **Credentials:**

| Role | Email | Password |
|------|-------|----------|
| Chef | chef@restaurant.com | password |
| Waiter | waiter@restaurant.com | password |
| Cashier | cashier@restaurant.com | password |
| Customer | customer@restaurant.com | password |
| Manager | manager@restaurant.com | password |

---

## ❓ FAQ

### **Q: Can guests see their order after placing it?**
A: No, guests cannot see order details after placing. They only see a success message.

### **Q: How can a guest track their order?**
A: Guests should:
1. Remember their order ID
2. Ask waiter/cashier to check status
3. Or create a customer account

### **Q: Can I see orders from yesterday?**
A: Yes, if you're logged in as customer/manager. Cashier sees today's payments only.

### **Q: How do I know when my order is ready?**
A: 
- **Guest:** Waiter will serve you
- **Customer (logged in):** Check "My Orders" tab for status

### **Q: Can I cancel an order?**
A: Currently, only manager can delete orders. Contact staff to cancel.

---

## 🎉 SUMMARY

**To see order details, you need to:**

1. **Be logged in** (except for placing orders)
2. **Have the right role** (chef/waiter/cashier/customer/manager)
3. **Go to your dashboard**
4. **Navigate to orders section**

**Guests cannot see order details after placing!**

---

**Need help?** Read `QUICK_START_GUIDE.md` to start the system and test!

**ቤተ ሳይዳ ሬስቶራንት** 🇪🇹🍽️
