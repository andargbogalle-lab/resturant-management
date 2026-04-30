# Requirements Document: Receipt Generation and Payment Processing System

## 1. Functional Requirements

### 1.1 Payment Processing for Room Bookings

**Priority**: High  
**Description**: The system shall support explicit payment processing for room bookings, similar to the existing restaurant order payment system.

**Acceptance Criteria**:
- Cashier can process payment when checking in a guest
- System creates a payment record linked to the booking
- Payment supports multiple methods: cash, card, mobile money
- System calculates change for cash payments
- Payment record includes amount received and change
- Only one payment can be created per booking
- Payment creation updates booking status appropriately

### 1.2 Receipt Generation for Restaurant Orders

**Priority**: High  
**Description**: The system shall generate printable receipts for completed restaurant order payments.

**Acceptance Criteria**:
- Receipt displays restaurant name "Betesida Restaurant"
- Receipt includes date, time, and receipt number
- Receipt shows table number and guest name
- Receipt lists all ordered items with quantities and prices
- Receipt displays subtotal, tax, service charge, discount, and total
- Receipt shows payment method, amount paid, and change
- Receipt includes cashier name
- Receipt is formatted for printing (browser print or thermal printer)
- Cashier can print receipt immediately after payment
- Cashier can reprint receipt from payment history

### 1.3 Receipt Generation for Room Bookings

**Priority**: High  
**Description**: The system shall generate printable receipts for room booking payments.

**Acceptance Criteria**:
- Receipt displays hotel name "Betesida Hotel"
- Receipt includes date, time, and receipt number
- Receipt shows guest name and phone number
- Receipt displays room number and room type
- Receipt shows check-in date and check-out date
- Receipt displays number of nights and price per night
- Receipt shows total amount, payment method, amount paid, and change
- Receipt includes check-in time (14:00) and check-out time (12:00)
- Receipt displays WiFi SSID information
- Receipt includes cashier name
- Receipt is formatted for printing
- Cashier can print receipt immediately after check-in payment
- Cashier can reprint receipt from payment history

### 1.4 Payment Data Model Extension

**Priority**: High  
**Description**: The system shall extend the Payment model to support both restaurant orders and room bookings.

**Acceptance Criteria**:
- Payment table includes booking_id foreign key (nullable)
- Payment table includes amount_received field
- Payment table includes change field
- Payment can be linked to either an order OR a booking (not both)
- Payment model has relationship to RoomBooking model
- RoomBooking model has relationship to Payment model
- Database migration preserves existing payment records
- Foreign key constraints ensure data integrity

### 1.5 Receipt API Endpoints

**Priority**: High  
**Description**: The system shall provide API endpoints for retrieving receipt data.

**Acceptance Criteria**:
- Endpoint exists for fetching order receipt data by payment ID
- Endpoint exists for fetching booking receipt data by payment ID
- Endpoint exists for fetching receipt data (auto-detects type) by payment ID
- Endpoints return complete receipt data including related models
- Endpoints require authentication (cashier or manager role)
- Endpoints return 404 for non-existent payments
- Endpoints use eager loading to prevent N+1 queries
- Response includes all fields needed for receipt display

### 1.6 Receipt UI Components

**Priority**: High  
**Description**: The system shall provide React components for displaying and printing receipts.

**Acceptance Criteria**:
- OrderReceipt component renders restaurant order receipts
- BookingReceipt component renders room booking receipts
- ReceiptModal component displays receipts in a modal overlay
- Components include print button
- Print button triggers browser print dialog
- Print styles hide non-printable elements (buttons, navigation)
- Receipt layout is optimized for thermal printers (80mm width)
- Receipt layout also supports A4 paper printing
- Components format dates and currency correctly
- Components handle missing optional data gracefully

### 1.7 Integration with Cashier Dashboard

**Priority**: High  
**Description**: The system shall integrate receipt generation into the existing cashier dashboard workflows.

**Acceptance Criteria**:
- Payment confirmation screen shows "Print Receipt" button
- Clicking print button opens receipt modal
- Receipt modal displays after successful payment
- Payment history page includes "Reprint" button for each payment
- Reprint button fetches and displays receipt for past payments
- Check-in flow includes payment processing step
- Check-in payment generates booking receipt
- Order payment generates order receipt
- UI clearly indicates receipt type (order vs booking)

### 1.8 Payment Validation

**Priority**: High  
**Description**: The system shall validate payment data to ensure accuracy and prevent errors.

**Acceptance Criteria**:
- Amount must be a positive decimal value
- Payment method must be one of: cash, card, mobile_money
- Amount received must be greater than or equal to total for cash payments
- Change is automatically calculated as amount_received - total
- Either order_id OR booking_id must be provided (not both, not neither)
- System prevents duplicate payments for the same booking
- System validates that referenced order/booking exists
- Validation errors return HTTP 422 with descriptive messages

### 1.9 Receipt Reprinting

**Priority**: Medium  
**Description**: The system shall allow cashiers to reprint receipts for past payments.

**Acceptance Criteria**:
- Cashier can access payment history
- Payment history displays all completed payments
- Each payment has a "Reprint Receipt" action
- Clicking reprint fetches original payment data
- Reprinted receipt shows original payment date/time
- Reprinted receipt is identical to original
- System logs reprint actions for audit trail (optional)

### 1.10 Error Handling

**Priority**: Medium  
**Description**: The system shall handle errors gracefully and provide clear feedback to users.

**Acceptance Criteria**:
- Payment processing failures roll back database transactions
- Failed payments return descriptive error messages
- Receipt generation failures display user-friendly messages
- Missing payment data returns HTTP 404
- Invalid payment data returns HTTP 422 with validation errors
- Print failures allow user to retry
- Network errors display retry option
- All errors are logged for debugging

## 2. Non-Functional Requirements

### 2.1 Performance

**Priority**: High  
**Description**: The system shall generate receipts and process payments efficiently.

**Acceptance Criteria**:
- Single receipt generation completes in < 100ms
- Payment processing completes in < 200ms
- Payment list with 50 records loads in < 200ms
- Receipt modal opens in < 50ms
- Print dialog appears in < 100ms after button click
- Database queries use eager loading to prevent N+1 queries
- Frontend uses pagination for large payment lists (20 per page)

### 2.2 Security

**Priority**: High  
**Description**: The system shall protect payment and receipt data from unauthorized access.

**Acceptance Criteria**:
- Only authenticated users can access payment endpoints
- Only cashiers and managers can process payments
- Only cashiers and managers can generate receipts
- All API requests use Laravel Sanctum authentication
- Payment amounts are validated server-side
- SQL injection is prevented through Eloquent ORM
- Sensitive data is not exposed in logs
- All API communications use HTTPS
- Rate limiting is applied to receipt endpoints

### 2.3 Usability

**Priority**: High  
**Description**: The system shall be easy to use for cashiers with minimal training.

**Acceptance Criteria**:
- Payment forms have clear labels and instructions
- Receipt displays in readable format
- Print button is prominently displayed
- Success messages confirm payment completion
- Error messages are clear and actionable
- Receipt layout is easy to read
- Currency values are formatted with proper symbols
- Dates are formatted in readable format (e.g., "May 1, 2026")
- UI is responsive and works on tablets

### 2.4 Reliability

**Priority**: High  
**Description**: The system shall reliably process payments and generate receipts without data loss.

**Acceptance Criteria**:
- Payment transactions are atomic (all-or-nothing)
- Failed payments do not create partial records
- Database constraints prevent invalid data
- Foreign key relationships maintain data integrity
- System recovers gracefully from errors
- No data loss occurs during payment processing
- Receipt data remains accessible for reprinting

### 2.5 Maintainability

**Priority**: Medium  
**Description**: The system shall be easy to maintain and extend.

**Acceptance Criteria**:
- Code follows Laravel and React best practices
- Components are modular and reusable
- API endpoints follow RESTful conventions
- Database schema uses proper naming conventions
- Code includes inline comments for complex logic
- Receipt templates are easy to modify
- New payment methods can be added easily
- Receipt fields can be added without breaking changes

### 2.6 Compatibility

**Priority**: Medium  
**Description**: The system shall work across different browsers and printer types.

**Acceptance Criteria**:
- Receipts print correctly in Chrome, Firefox, Safari, Edge
- Print layout works with thermal printers (80mm width)
- Print layout works with A4 paper printers
- Receipt displays correctly on desktop and tablet screens
- System works with existing Laravel 11 and React 18 versions
- No breaking changes to existing API endpoints
- Backward compatible with existing payment records

### 2.7 Scalability

**Priority**: Low  
**Description**: The system shall handle growing numbers of payments and receipts.

**Acceptance Criteria**:
- Database indexes support efficient payment queries
- Payment history pagination prevents performance degradation
- Receipt generation performance does not degrade with data growth
- System can handle 1000+ payments per day
- Database can store years of payment history

### 2.8 Testability

**Priority**: Medium  
**Description**: The system shall be thoroughly testable at all levels.

**Acceptance Criteria**:
- Unit tests cover payment processing logic
- Unit tests cover receipt data generation
- Unit tests cover validation rules
- Integration tests cover complete payment flows
- Frontend tests cover receipt component rendering
- Frontend tests cover print functionality
- End-to-end tests cover user workflows
- Test coverage is > 80% for new code

## 3. Data Requirements

### 3.1 Payment Data Storage

**Priority**: High  
**Description**: The system shall store complete payment information for both orders and bookings.

**Required Fields**:
- `id` (primary key)
- `order_id` (foreign key, nullable)
- `booking_id` (foreign key, nullable)
- `cashier_id` (foreign key)
- `amount` (decimal)
- `discount` (decimal)
- `tax` (decimal)
- `service_charge` (decimal)
- `total` (decimal)
- `payment_method` (enum: cash, card, mobile_money)
- `amount_received` (decimal, nullable)
- `change` (decimal)
- `status` (enum: pending, completed, refunded)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Constraints**:
- Either `order_id` OR `booking_id` must be non-null
- `amount`, `total`, `amount_received`, `change` must be >= 0
- `amount_received` must be >= `total` for cash payments
- `change` must equal `amount_received - total`

### 3.2 Receipt Data Format

**Priority**: High  
**Description**: The system shall provide structured receipt data in JSON format.

**Order Receipt Fields**:
- `type`: "order"
- `receipt_number`: string
- `business_name`: "Betesida Restaurant"
- `date`: ISO date string
- `time`: time string
- `table_number`: string
- `guest_name`: string
- `items`: array of {name, quantity, price, subtotal}
- `subtotal`: decimal
- `tax`: decimal
- `service_charge`: decimal
- `discount`: decimal
- `total`: decimal
- `payment_method`: string
- `amount_paid`: decimal
- `change`: decimal
- `cashier_name`: string

**Booking Receipt Fields**:
- `type`: "booking"
- `receipt_number`: string
- `business_name`: "Betesida Hotel"
- `date`: ISO date string
- `time`: time string
- `guest_name`: string
- `guest_phone`: string
- `room_number`: string
- `room_type`: string
- `check_in_date`: ISO date string
- `check_out_date`: ISO date string
- `nights`: integer
- `price_per_night`: decimal
- `total_amount`: decimal
- `payment_method`: string
- `amount_paid`: decimal
- `change`: decimal
- `check_in_time`: "14:00"
- `check_out_time`: "12:00"
- `wifi_ssid`: "BetesidaGuest"
- `cashier_name`: string

## 4. Interface Requirements

### 4.1 API Endpoints

**Priority**: High  
**Description**: The system shall provide RESTful API endpoints for payment and receipt operations.

**Required Endpoints**:

1. **POST /api/payments/bookings**
   - Create payment for room booking
   - Request body: {booking_id, amount, payment_method, amount_received, discount}
   - Response: Payment object with 201 status
   - Authentication: Required (cashier, manager)

2. **GET /api/payments/{id}**
   - Get payment details by ID
   - Response: Payment object with related data
   - Authentication: Required (cashier, manager)

3. **GET /api/receipts/payment/{paymentId}**
   - Get receipt data (auto-detects order or booking)
   - Response: Receipt data object
   - Authentication: Required (cashier, manager)

4. **GET /api/receipts/order/{paymentId}**
   - Get order receipt data
   - Response: Order receipt object
   - Authentication: Required (cashier, manager)

5. **GET /api/receipts/booking/{paymentId}**
   - Get booking receipt data
   - Response: Booking receipt object
   - Authentication: Required (cashier, manager)

### 4.2 Frontend Components

**Priority**: High  
**Description**: The system shall provide React components for payment and receipt UI.

**Required Components**:

1. **BookingPaymentForm**
   - Props: {booking, onSuccess, onCancel}
   - Displays booking details
   - Collects payment method and amount received
   - Calculates change automatically
   - Submits payment to API
   - Shows success/error messages

2. **OrderReceipt**
   - Props: {receiptData, onPrint}
   - Renders order receipt layout
   - Displays all order items
   - Shows payment details
   - Includes print button

3. **BookingReceipt**
   - Props: {receiptData, onPrint}
   - Renders booking receipt layout
   - Displays room and stay details
   - Shows payment details
   - Includes print button

4. **ReceiptModal**
   - Props: {isOpen, receiptData, onClose}
   - Displays receipt in modal overlay
   - Renders correct receipt type
   - Includes close and print buttons
   - Handles modal open/close

5. **ReceiptPrintButton**
   - Props: {receiptData}
   - Triggers print functionality
   - Shows loading state
   - Handles print errors

### 4.3 User Interface Flow

**Priority**: High  
**Description**: The system shall integrate seamlessly into existing cashier workflows.

**Order Payment Flow**:
1. Cashier views pending order
2. Cashier clicks "Process Payment"
3. Payment form displays with order total
4. Cashier selects payment method
5. Cashier enters amount received (for cash)
6. System calculates change
7. Cashier submits payment
8. Receipt modal displays automatically
9. Cashier clicks "Print Receipt"
10. Browser print dialog opens
11. Cashier prints receipt

**Booking Payment Flow**:
1. Cashier views confirmed booking
2. Cashier clicks "Check In"
3. Check-in form displays
4. Cashier enters payment details
5. System calculates change
6. Cashier submits check-in with payment
7. Receipt modal displays automatically
8. Cashier clicks "Print Receipt"
9. Browser print dialog opens
10. Cashier prints receipt and gives to guest

**Receipt Reprint Flow**:
1. Cashier navigates to payment history
2. Cashier finds payment record
3. Cashier clicks "Reprint Receipt"
4. Receipt modal displays
5. Cashier clicks "Print Receipt"
6. Browser print dialog opens

## 5. Constraints

### 5.1 Technical Constraints

- Must use existing Laravel 11 backend
- Must use existing React 18 frontend
- Must use existing MySQL database
- Must use Laravel Sanctum for authentication
- Must maintain backward compatibility with existing payment records
- Must not break existing API endpoints
- Must work with existing user roles (cashier, manager)

### 5.2 Business Constraints

- Receipt must include all legally required information
- Payment records must be immutable (no editing after creation)
- Only one payment per booking is allowed
- Cashier must be authenticated to process payments
- Receipt must be printable immediately after payment
- System must support Ethiopian Birr currency

### 5.3 Design Constraints

- Receipt layout must fit on thermal printer (80mm width)
- Receipt must be readable when printed
- UI must match existing dashboard design
- Components must follow existing React patterns
- API must follow existing RESTful conventions

## 6. Assumptions

- Cashiers have access to printers (thermal or A4)
- Browsers support window.print() API
- Internet connection is available for API calls
- Cashiers are trained on basic computer operations
- WiFi password is managed separately (not in database)
- Tax and service charge rates are configured in settings
- Receipt numbers are generated automatically
- Check-in time is always 14:00 and check-out time is always 12:00

## 7. Dependencies

### 7.1 External Dependencies

- Laravel Framework 11.x
- React 18.x
- MySQL 8.x
- Laravel Sanctum 4.x
- Axios (HTTP client)
- date-fns (date formatting)

### 7.2 Internal Dependencies

- Existing Payment model (to be extended)
- Existing Order model
- Existing RoomBooking model
- Existing User model
- Existing authentication system
- Existing cashier dashboard
- Existing settings system (for tax/service charge)

## 8. Success Metrics

### 8.1 Functional Success

- 100% of order payments generate receipts
- 100% of booking payments generate receipts
- 0 duplicate payments for bookings
- 100% of receipts are printable
- 100% of reprints match original receipts

### 8.2 Performance Success

- Receipt generation < 100ms (95th percentile)
- Payment processing < 200ms (95th percentile)
- Print dialog opens < 100ms after button click
- Zero N+1 query issues

### 8.3 User Success

- Cashiers can process payments without errors
- Cashiers can print receipts on first attempt
- Cashiers can reprint receipts when needed
- Zero training issues reported
- Positive feedback from cashier users

## 9. Out of Scope

The following features are explicitly out of scope for this implementation:

- PDF generation and download (future enhancement)
- Email receipts to guests (future enhancement)
- SMS receipts to guests (future enhancement)
- Receipt customization by user (future enhancement)
- Multi-language receipts (future enhancement)
- Receipt templates management (future enhancement)
- Refund processing for bookings (future enhancement)
- Partial payments for bookings (future enhancement)
- Payment installments (future enhancement)
- Credit card integration (future enhancement)
- Mobile money API integration (future enhancement)
- Receipt analytics and reporting (future enhancement)
