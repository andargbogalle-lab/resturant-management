# Bugfix Requirements Document

## Introduction

The Betesida Restaurant Management System currently has an incorrect order workflow where orders bypass cashier approval and go directly to the chef. According to the business requirements, orders must be reviewed and accepted by the cashier before being sent to the kitchen. This bug affects the order approval process and violates the intended workflow where cashiers act as gatekeepers for order validation.

**Impact:** Orders are processed without cashier verification, potentially leading to incorrect orders being prepared, lack of payment verification, and breakdown of the intended approval workflow.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN a customer places an order with status "pending" THEN the system displays the order in the chef dashboard immediately without cashier approval

1.2 WHEN the chef dashboard filters orders THEN the system includes orders with status "pending" in the kitchen queue

1.3 WHEN a cashier views the pending orders THEN the system does not provide a UI control to accept/confirm orders before sending them to the kitchen

1.4 WHEN an order transitions through status changes THEN the system does not include a "confirmed" status between "pending" and "preparing"

### Expected Behavior (Correct)

2.1 WHEN a customer places an order with status "pending" THEN the system SHALL display the order ONLY in the cashier dashboard, not in the chef dashboard

2.2 WHEN the cashier reviews a pending order THEN the system SHALL provide an "Accept Order" or "Confirm Order" button to approve the order

2.3 WHEN the cashier accepts a pending order THEN the system SHALL change the order status from "pending" to "confirmed"

2.4 WHEN the chef dashboard filters orders THEN the system SHALL display ONLY orders with status "confirmed", "preparing", or "ready" (excluding "pending" orders)

2.5 WHEN an order status is updated THEN the system SHALL validate that "confirmed" is a valid status value in the order status enum

2.6 WHEN the order workflow progresses THEN the system SHALL follow the sequence: pending → confirmed → preparing → ready → delivered → completed

2.7 WHEN a waiter marks an order as delivered THEN the system SHALL change the order status from "ready" to "delivered"

### Unchanged Behavior (Regression Prevention)

3.1 WHEN an order has status "preparing" THEN the system SHALL CONTINUE TO display the order in the chef dashboard

3.2 WHEN an order has status "ready" THEN the system SHALL CONTINUE TO display the order in the chef dashboard

3.3 WHEN a chef marks an order as "preparing" THEN the system SHALL CONTINUE TO update the order status to "preparing"

3.4 WHEN a chef marks an order as "ready" THEN the system SHALL CONTINUE TO update the order status to "ready"

3.5 WHEN a waiter marks an order as delivered THEN the system SHALL CONTINUE TO update the order status to "delivered"

3.6 WHEN a cashier processes payment for a delivered order THEN the system SHALL CONTINUE TO update the order status to "completed"

3.7 WHEN a customer places an order THEN the system SHALL CONTINUE TO create the order with status "pending"

3.8 WHEN order items are created THEN the system SHALL CONTINUE TO calculate the total amount correctly

3.9 WHEN a table is assigned to an order THEN the system SHALL CONTINUE TO update the table status to "occupied"

## Bug Condition

The bug condition identifies inputs (orders) that trigger the incorrect behavior:

```pascal
FUNCTION isBugCondition(order)
  INPUT: order of type Order
  OUTPUT: boolean
  
  // Returns true when the order has "pending" status
  // These orders should NOT appear in chef dashboard
  RETURN order.status = "pending"
END FUNCTION
```

## Property Specification

### Fix Checking Property

This property ensures that pending orders are not visible to chefs:

```pascal
// Property: Fix Checking - Pending Orders Hidden from Chef
FOR ALL order WHERE isBugCondition(order) DO
  chefDashboardOrders ← getChefDashboardOrders'()
  ASSERT order NOT IN chefDashboardOrders
  
  cashierDashboardOrders ← getCashierDashboardOrders'()
  ASSERT order IN cashierDashboardOrders
END FOR
```

### Preservation Checking Property

This property ensures that non-pending orders continue to work correctly:

```pascal
// Property: Preservation Checking - Non-Pending Orders Unchanged
FOR ALL order WHERE NOT isBugCondition(order) DO
  // For orders with status: confirmed, preparing, ready, delivered, completed
  ASSERT getChefDashboardOrders(order) = getChefDashboardOrders'(order)
  ASSERT getOrderStatus(order) = getOrderStatus'(order)
END FOR
```

**Key Definitions:**
- **F**: Original (unfixed) function - current code where chef sees pending orders
- **F'**: Fixed function - corrected code where chef only sees confirmed orders
- **isBugCondition(order)**: Returns true when order.status = "pending"

## Affected Components

1. **Frontend - ChefDashboard.jsx** (Line ~30)
   - Current filter: `['pending', 'preparing', 'ready']`
   - Should be: `['confirmed', 'preparing', 'ready']`

2. **Frontend - CashierDashboard.jsx**
   - Missing: UI to accept/confirm pending orders
   - Needs: "Accept Order" button for pending orders

3. **Backend - OrderController.php**
   - Status validation: `'pending,preparing,ready,served,completed,cancelled'`
   - Should include: `'pending,confirmed,preparing,ready,delivered,completed,cancelled'`

4. **Backend - Order Model**
   - No changes needed to model structure
   - Status enum needs to support "confirmed"

## Counterexample

**Concrete example demonstrating the bug:**

1. Customer places order for "Doro Wot" at Table T05
2. Order created with status: "pending"
3. **BUG:** Chef dashboard immediately shows the order
4. Chef can start preparing without cashier approval
5. Cashier never reviews or approves the order

**Expected behavior after fix:**

1. Customer places order for "Doro Wot" at Table T05
2. Order created with status: "pending"
3. **CORRECT:** Only cashier dashboard shows the order
4. Cashier reviews and clicks "Accept Order"
5. Order status changes to "confirmed"
6. **CORRECT:** Chef dashboard now shows the order
7. Chef can start preparing the confirmed order
