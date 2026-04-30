# Tasks: Receipt Generation and Payment Processing System

## Phase 1: Database and Backend Foundation

### 1.1 Extend Payment Model and Database Schema
- [ ] 1.1.1 Create database migration to add booking_id, amount_received, and change columns to payments table
- [ ] 1.1.2 Update Payment model to include new fillable fields
- [ ] 1.1.3 Add booking() relationship method to Payment model
- [ ] 1.1.4 Add payment() relationship method to RoomBooking model
- [ ] 1.1.5 Update Payment model casts for new decimal fields
- [ ] 1.1.6 Run migration in development environment and verify schema changes

### 1.2 Implement Booking Payment Processing
- [ ] 1.2.1 Create storeBookingPayment() method in PaymentController
- [ ] 1.2.2 Implement validation rules for booking payment requests
- [ ] 1.2.3 Add logic to check for existing booking payments (prevent duplicates)
- [ ] 1.2.4 Implement change calculation for cash payments
- [ ] 1.2.5 Add database transaction wrapping for payment creation
- [ ] 1.2.6 Update booking status after successful payment
- [ ] 1.2.7 Add error handling and rollback logic

### 1.3 Create Receipt API Endpoints
- [ ] 1.3.1 Create ReceiptController with getOrderReceipt() method
- [ ] 1.3.2 Create getBookingReceipt() method in ReceiptController
- [ ] 1.3.3 Create getReceiptByPayment() method that auto-detects receipt type
- [ ] 1.3.4 Implement eager loading for order receipts (order, items, menuItem, table, cashier)
- [ ] 1.3.5 Implement eager loading for booking receipts (booking, room, cashier)
- [ ] 1.3.6 Format receipt data according to requirements (dates, currency, calculations)
- [ ] 1.3.7 Add authentication middleware to receipt routes
- [ ] 1.3.8 Add role-based authorization (cashier, manager only)

### 1.4 Update API Routes
- [ ] 1.4.1 Add POST /api/payments/bookings route
- [ ] 1.4.2 Add GET /api/payments/{id} route
- [ ] 1.4.3 Add GET /api/receipts/payment/{paymentId} route
- [ ] 1.4.4 Add GET /api/receipts/order/{paymentId} route
- [ ] 1.4.5 Add GET /api/receipts/booking/{paymentId} route
- [ ] 1.4.6 Apply auth:sanctum middleware to all new routes
- [ ] 1.4.7 Apply role:cashier,manager middleware to payment and receipt routes

### 1.5 Backend Testing
- [ ] 1.5.1 Write unit tests for booking payment creation
- [ ] 1.5.2 Write unit tests for payment validation rules
- [ ] 1.5.3 Write unit tests for change calculation
- [ ] 1.5.4 Write unit tests for duplicate payment prevention
- [ ] 1.5.5 Write unit tests for order receipt data generation
- [ ] 1.5.6 Write unit tests for booking receipt data generation
- [ ] 1.5.7 Write integration tests for complete payment flows
- [ ] 1.5.8 Test error handling and rollback scenarios

## Phase 2: Frontend Receipt Components

### 2.1 Create Receipt Component Structure
- [ ] 2.1.1 Create frontend/src/components/receipts/ directory
- [ ] 2.1.2 Create OrderReceipt.jsx component file
- [ ] 2.1.3 Create BookingReceipt.jsx component file
- [ ] 2.1.4 Create ReceiptModal.jsx component file
- [ ] 2.1.5 Create ReceiptPrintButton.jsx component file
- [ ] 2.1.6 Create receipt.css stylesheet

### 2.2 Implement OrderReceipt Component
- [ ] 2.2.1 Create OrderReceipt component with props interface
- [ ] 2.2.2 Implement receipt header with restaurant name and date/time
- [ ] 2.2.3 Implement table number and guest name display
- [ ] 2.2.4 Implement order items table with quantities and prices
- [ ] 2.2.5 Implement subtotal, tax, service charge, discount display
- [ ] 2.2.6 Implement total, payment method, amount paid, change display
- [ ] 2.2.7 Implement cashier name display
- [ ] 2.2.8 Add print button with onPrint callback
- [ ] 2.2.9 Format currency values with Birr symbol
- [ ] 2.2.10 Format dates and times for readability

### 2.3 Implement BookingReceipt Component
- [ ] 2.3.1 Create BookingReceipt component with props interface
- [ ] 2.3.2 Implement receipt header with hotel name and date/time
- [ ] 2.3.3 Implement guest information section (name, phone)
- [ ] 2.3.4 Implement room details section (number, type)
- [ ] 2.3.5 Implement stay details section (check-in, check-out, nights)
- [ ] 2.3.6 Implement pricing section (price per night, total)
- [ ] 2.3.7 Implement payment details section (method, amount paid, change)
- [ ] 2.3.8 Implement check-in/out times and WiFi information
- [ ] 2.3.9 Implement cashier name display
- [ ] 2.3.10 Add print button with onPrint callback
- [ ] 2.3.11 Format currency, dates, and times

### 2.4 Implement ReceiptModal Component
- [ ] 2.4.1 Create ReceiptModal component with props interface
- [ ] 2.4.2 Implement modal overlay and container
- [ ] 2.4.3 Add conditional rendering based on isOpen prop
- [ ] 2.4.4 Implement receipt type detection (order vs booking)
- [ ] 2.4.5 Render OrderReceipt for order receipts
- [ ] 2.4.6 Render BookingReceipt for booking receipts
- [ ] 2.4.7 Add close button with onClose callback
- [ ] 2.4.8 Add print button that triggers print functionality
- [ ] 2.4.9 Implement modal close on overlay click
- [ ] 2.4.10 Add keyboard support (ESC to close)

### 2.5 Implement Print Functionality
- [ ] 2.5.1 Create frontend/src/services/printService.js
- [ ] 2.5.2 Implement printReceipt() function using window.print()
- [ ] 2.5.3 Create print-specific CSS styles (@media print)
- [ ] 2.5.4 Hide non-printable elements (buttons, navigation) in print styles
- [ ] 2.5.5 Optimize layout for thermal printer (80mm width)
- [ ] 2.5.6 Add A4 paper print support
- [ ] 2.5.7 Implement page break prevention for receipts
- [ ] 2.5.8 Test print functionality in multiple browsers

### 2.6 Create Receipt Service
- [ ] 2.6.1 Create frontend/src/services/receiptService.js
- [ ] 2.6.2 Implement fetchReceiptByPayment() API call
- [ ] 2.6.3 Implement fetchOrderReceipt() API call
- [ ] 2.6.4 Implement fetchBookingReceipt() API call
- [ ] 2.6.5 Add error handling for API failures
- [ ] 2.6.6 Add loading state management
- [ ] 2.6.7 Implement response data transformation if needed

### 2.7 Frontend Component Testing
- [ ] 2.7.1 Write tests for OrderReceipt component rendering
- [ ] 2.7.2 Write tests for BookingReceipt component rendering
- [ ] 2.7.3 Write tests for ReceiptModal open/close behavior
- [ ] 2.7.4 Write tests for print button functionality
- [ ] 2.7.5 Write tests for receipt data formatting
- [ ] 2.7.6 Write tests for conditional rendering based on receipt type
- [ ] 2.7.7 Test error handling for missing data

## Phase 3: Payment Form Integration

### 3.1 Create Booking Payment Form
- [ ] 3.1.1 Create frontend/src/components/payments/BookingPaymentForm.jsx
- [ ] 3.1.2 Implement form with booking details display
- [ ] 3.1.3 Add payment method selection (cash, card, mobile_money)
- [ ] 3.1.4 Add amount received input field (for cash payments)
- [ ] 3.1.5 Implement automatic change calculation
- [ ] 3.1.6 Add discount input field (optional)
- [ ] 3.1.7 Display calculated total
- [ ] 3.1.8 Implement form validation
- [ ] 3.1.9 Add submit button with loading state
- [ ] 3.1.10 Add cancel button
- [ ] 3.1.11 Implement API call to create booking payment
- [ ] 3.1.12 Handle success and error responses
- [ ] 3.1.13 Trigger receipt modal on success

### 3.2 Update Order Payment Flow
- [ ] 3.2.1 Update existing order payment form to include amount_received field
- [ ] 3.2.2 Update order payment form to calculate change
- [ ] 3.2.3 Modify order payment API call to include new fields
- [ ] 3.2.4 Add receipt modal trigger after successful order payment
- [ ] 3.2.5 Test updated order payment flow

### 3.3 Create Payment Service
- [ ] 3.3.1 Create frontend/src/services/paymentService.js (if not exists)
- [ ] 3.3.2 Implement createOrderPayment() API call
- [ ] 3.3.3 Implement createBookingPayment() API call
- [ ] 3.3.4 Implement fetchPaymentById() API call
- [ ] 3.3.5 Add error handling and validation
- [ ] 3.3.6 Add loading state management

## Phase 4: Cashier Dashboard Integration

### 4.1 Integrate Receipt Modal into Order Management
- [ ] 4.1.1 Update CashierDashboard order payment section
- [ ] 4.1.2 Add state management for receipt modal (isOpen, receiptData)
- [ ] 4.1.3 Open receipt modal after successful order payment
- [ ] 4.1.4 Pass receipt data to modal component
- [ ] 4.1.5 Add "Print Receipt" button to payment confirmation
- [ ] 4.1.6 Test order payment to receipt flow

### 4.2 Integrate Payment Processing into Booking Check-In
- [ ] 4.2.1 Update CashierDashboard booking check-in section
- [ ] 4.2.2 Add BookingPaymentForm to check-in flow
- [ ] 4.2.3 Modify check-in process to include payment step
- [ ] 4.2.4 Add state management for receipt modal
- [ ] 4.2.5 Open receipt modal after successful check-in payment
- [ ] 4.2.6 Update booking status after payment
- [ ] 4.2.7 Test check-in with payment flow

### 4.3 Add Payment History and Reprint Functionality
- [ ] 4.3.1 Create payment history view in CashierDashboard
- [ ] 4.3.2 Fetch and display list of all payments
- [ ] 4.3.3 Add filters for payment type (order vs booking)
- [ ] 4.3.4 Add date range filter
- [ ] 4.3.5 Implement pagination (20 payments per page)
- [ ] 4.3.6 Add "Reprint Receipt" button for each payment
- [ ] 4.3.7 Implement reprint functionality (fetch receipt data and open modal)
- [ ] 4.3.8 Test reprint flow for both order and booking receipts

### 4.4 UI/UX Enhancements
- [ ] 4.4.1 Add loading spinners for payment processing
- [ ] 4.4.2 Add success messages after payment completion
- [ ] 4.4.3 Add error messages for payment failures
- [ ] 4.4.4 Improve form validation feedback
- [ ] 4.4.5 Add confirmation dialogs for payment submission
- [ ] 4.4.6 Ensure responsive design for tablet use
- [ ] 4.4.7 Add keyboard shortcuts for common actions (optional)

## Phase 5: Testing and Quality Assurance

### 5.1 Integration Testing
- [ ] 5.1.1 Test complete order payment flow (order → payment → receipt → print)
- [ ] 5.1.2 Test complete booking payment flow (booking → check-in → payment → receipt → print)
- [ ] 5.1.3 Test receipt reprint flow for orders
- [ ] 5.1.4 Test receipt reprint flow for bookings
- [ ] 5.1.5 Test payment validation errors
- [ ] 5.1.6 Test duplicate payment prevention
- [ ] 5.1.7 Test change calculation for various amounts
- [ ] 5.1.8 Test different payment methods (cash, card, mobile_money)

### 5.2 End-to-End Testing
- [ ] 5.2.1 Write E2E test for restaurant order payment and receipt
- [ ] 5.2.2 Write E2E test for room booking payment and receipt
- [ ] 5.2.3 Write E2E test for receipt reprinting
- [ ] 5.2.4 Test user authentication and authorization
- [ ] 5.2.5 Test error scenarios (network failures, invalid data)
- [ ] 5.2.6 Test browser compatibility (Chrome, Firefox, Safari, Edge)

### 5.3 Print Testing
- [ ] 5.3.1 Test receipt printing on thermal printer (80mm)
- [ ] 5.3.2 Test receipt printing on A4 paper
- [ ] 5.3.3 Verify print layout and formatting
- [ ] 5.3.4 Test print preview functionality
- [ ] 5.3.5 Test print cancellation handling
- [ ] 5.3.6 Verify all receipt fields are visible when printed

### 5.4 Performance Testing
- [ ] 5.4.1 Measure receipt generation time (target < 100ms)
- [ ] 5.4.2 Measure payment processing time (target < 200ms)
- [ ] 5.4.3 Test payment list loading with 50+ records
- [ ] 5.4.4 Verify no N+1 query issues in receipt endpoints
- [ ] 5.4.5 Test modal open/close performance
- [ ] 5.4.6 Profile frontend rendering performance

### 5.5 Security Testing
- [ ] 5.5.1 Verify authentication is required for all payment endpoints
- [ ] 5.5.2 Verify role-based authorization (cashier, manager only)
- [ ] 5.5.3 Test SQL injection prevention
- [ ] 5.5.4 Test payment amount validation
- [ ] 5.5.5 Verify sensitive data is not exposed in logs
- [ ] 5.5.6 Test CSRF protection on payment endpoints
- [ ] 5.5.7 Verify rate limiting on receipt endpoints

## Phase 6: Documentation and Deployment

### 6.1 Code Documentation
- [ ] 6.1.1 Add PHPDoc comments to PaymentController methods
- [ ] 6.1.2 Add PHPDoc comments to ReceiptController methods
- [ ] 6.1.3 Add JSDoc comments to React components
- [ ] 6.1.4 Add inline comments for complex logic
- [ ] 6.1.5 Document API endpoints in API documentation
- [ ] 6.1.6 Document component props and interfaces

### 6.2 User Documentation
- [ ] 6.2.1 Create user guide for processing order payments
- [ ] 6.2.2 Create user guide for processing booking payments
- [ ] 6.2.3 Create user guide for printing receipts
- [ ] 6.2.4 Create user guide for reprinting receipts
- [ ] 6.2.5 Create troubleshooting guide for common issues
- [ ] 6.2.6 Create printer setup guide (thermal and A4)

### 6.3 Deployment Preparation
- [ ] 6.3.1 Review and test database migration
- [ ] 6.3.2 Create deployment checklist
- [ ] 6.3.3 Prepare rollback plan
- [ ] 6.3.4 Create database backup before migration
- [ ] 6.3.5 Test migration on staging environment
- [ ] 6.3.6 Verify backward compatibility with existing data

### 6.4 Deployment Execution
- [ ] 6.4.1 Deploy backend code to production
- [ ] 6.4.2 Run database migration on production
- [ ] 6.4.3 Deploy frontend code to production
- [ ] 6.4.4 Verify API endpoints are accessible
- [ ] 6.4.5 Test order payment flow in production
- [ ] 6.4.6 Test booking payment flow in production
- [ ] 6.4.7 Test receipt printing in production
- [ ] 6.4.8 Monitor error logs for issues

### 6.5 Training and Handoff
- [ ] 6.5.1 Conduct training session for cashier staff
- [ ] 6.5.2 Demonstrate order payment and receipt printing
- [ ] 6.5.3 Demonstrate booking payment and receipt printing
- [ ] 6.5.4 Demonstrate receipt reprinting
- [ ] 6.5.5 Answer questions and address concerns
- [ ] 6.5.6 Provide user documentation to staff
- [ ] 6.5.7 Set up support channel for issues

### 6.6 Post-Deployment Monitoring
- [ ] 6.6.1 Monitor payment processing success rate
- [ ] 6.6.2 Monitor receipt generation success rate
- [ ] 6.6.3 Monitor API response times
- [ ] 6.6.4 Monitor error logs for issues
- [ ] 6.6.5 Collect user feedback from cashiers
- [ ] 6.6.6 Address any reported issues promptly
- [ ] 6.6.7 Create bug fix plan if needed

## Phase 7: Optional Enhancements (Future)

### 7.1 PDF Receipt Generation
- [ ] 7.1.1 Research PDF generation libraries (DomPDF, Puppeteer)
- [ ] 7.1.2 Implement PDF generation for order receipts
- [ ] 7.1.3 Implement PDF generation for booking receipts
- [ ] 7.1.4 Add download button to receipt modal
- [ ] 7.1.5 Test PDF generation and download

### 7.2 Email Receipts
- [ ] 7.2.1 Integrate email service (SendGrid, Mailgun)
- [ ] 7.2.2 Create email templates for order receipts
- [ ] 7.2.3 Create email templates for booking receipts
- [ ] 7.2.4 Add "Email Receipt" button to receipt modal
- [ ] 7.2.5 Implement email sending functionality
- [ ] 7.2.6 Add guest email field to booking form

### 7.3 SMS Receipts
- [ ] 7.3.1 Integrate SMS service (Twilio)
- [ ] 7.3.2 Create SMS message templates
- [ ] 7.3.3 Add "Send SMS" button to receipt modal
- [ ] 7.3.4 Implement SMS sending functionality
- [ ] 7.3.5 Test SMS delivery

### 7.4 Receipt Customization
- [ ] 7.4.1 Create receipt template management UI
- [ ] 7.4.2 Allow customization of receipt header/footer
- [ ] 7.4.3 Allow customization of receipt fields
- [ ] 7.4.4 Add logo upload functionality
- [ ] 7.4.5 Implement template preview

### 7.5 Analytics and Reporting
- [ ] 7.5.1 Create payment analytics dashboard
- [ ] 7.5.2 Add daily/weekly/monthly payment reports
- [ ] 7.5.3 Add payment method breakdown charts
- [ ] 7.5.4 Add receipt generation statistics
- [ ] 7.5.5 Export reports to CSV/Excel

---

## Task Summary

**Total Tasks**: 200+
**Estimated Duration**: 3-4 weeks
**Priority Phases**: 1-6 (Core functionality)
**Optional Phases**: 7 (Future enhancements)

## Dependencies

- Phase 2 depends on Phase 1 (backend must be ready for frontend)
- Phase 3 depends on Phase 2 (components must exist for forms)
- Phase 4 depends on Phase 3 (forms must exist for dashboard integration)
- Phase 5 depends on Phase 4 (features must be complete for testing)
- Phase 6 depends on Phase 5 (testing must pass for deployment)
- Phase 7 is independent and can be done anytime after Phase 6

## Risk Mitigation

- **Risk**: Database migration fails in production
  - **Mitigation**: Test thoroughly on staging, create backup, have rollback plan

- **Risk**: Print functionality doesn't work on all browsers
  - **Mitigation**: Test on all major browsers early, use standard window.print() API

- **Risk**: Receipt layout doesn't fit thermal printer
  - **Mitigation**: Test with actual thermal printer early, adjust CSS as needed

- **Risk**: Performance issues with large payment history
  - **Mitigation**: Implement pagination, use database indexes, optimize queries

- **Risk**: Cashiers struggle with new workflow
  - **Mitigation**: Provide thorough training, create clear documentation, offer support
