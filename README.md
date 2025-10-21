# E-Jeep Management System

A comprehensive web-based management system for electric jeepney operations with separate interfaces for Administrators/Operators, Drivers, and Users.

## 📋 Features

### Admin/Operator Features
- **Authentication**
  - Create account
  - Login/Logout
  - Forgot password
  - Social sign-in (Google, Phone, Apple)
  - Two-step verification
  - Face recognition support
  - Email & mobile verification
  - OTP authentication

- **Dashboard**
  - Daily activity monitoring
  - Active jeeps tracking
  - Current passenger count
  - Total passengers today
  - Revenue and expenses tracking
  - Google Maps integration (placeholder)
  - Real-time jeep tracking
  - Traffic detection

- **Analytics**
  - Profit reports (Daily, Weekly, Monthly, Yearly)
  - Per E-jeep and overall analytics
  - Passenger count analysis
  - Most profitable routes
  - Busiest times analysis
  - Data export to PDF & CSV (placeholder)

- **E-Jeep Management**
  - Add/Edit/Delete jeep profiles
  - Track plate numbers, routes, and assigned drivers
  - Maintenance logs (oil change, repairs, etc.)

- **Driver Management**
  - Assign drivers to jeeps
  - Track driver shifts and working hours
  - Monitor driver activities and location

- **Transactions**
  - View all fare collections
  - Filter by jeep, route, time, and driver
  - Sort and search transactions

- **Notifications**
  - System alerts (low balance, maintenance due)
  - Push/Email notifications
  - Custom notification sending

- **Communication**
  - Group chat with drivers
  - Real-time messaging

- **Settings**
  - Profile management
  - Security settings
  - Notification preferences
  - System configuration

### Driver Features
- **Login** - Assigned by operator
- **Dashboard**
  - Start/End shift tracking
  - Assigned route and map view
  - Daily activity monitoring
  - Current and total passenger count
  - Revenue and expenses tracking
  - Google Maps integration
  - Real-time tracking
  - Traffic detection

- **Analytics**
  - Daily profit reports
  - Total passenger count
  - Performance metrics
  - Busiest times

- **Profile Management**
  - Personal information
  - Work history
  - Security settings

### User Features
- **Authentication**
  - Create account
  - Login/Logout
  - Forgot password
  - Social sign-in (Google, Phone, Apple)

- **Find E-Jeep**
  - Real-time e-jeep tracking
  - Route selection
  - Live locations on map
  - Availability status

- **Routes**
  - Browse all available routes
  - View schedules and operating hours
  - Check fare information
  - See active e-jeeps per route

- **Trip History**
  - View past trips
  - Spending analysis
  - Filter by route and date

- **Profile**
  - Account settings
  - Preferences management

## 🎨 Color Palette

The system uses a modern, professional color scheme:

- **Primary Blue**: #3498DB
- **Navy**: #2C3E50
- **Light Gray**: #ECF0F1
- **Yellow/Orange**: #F39C12
- **Green**: #27AE60
- **Teal**: #1ABC9C
- **White**: #FFFFFF
- **Gray**: #95A5A6
- **Dark Gray**: #34495E
- **Red**: #E74C3C
- **Purple**: #9B59B6

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required for this mockup version

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd e-jeep-management
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - No build process or dependencies needed

### File Structure

```
e-jeep-management/
├── index.html                    # Main login page
├── styles.css                    # Global styles and color palette
├── script.js                     # JavaScript functionality
├── README.md                     # This file
│
├── Admin Pages
│   ├── admin-dashboard.html      # Admin dashboard
│   ├── admin-analytics.html      # Analytics and reports
│   ├── admin-jeeps.html          # E-Jeep management
│   ├── admin-drivers.html        # Driver management
│   ├── admin-transactions.html   # Transaction history
│   ├── admin-notifications.html  # Notification center
│   ├── admin-chat.html           # Group chat
│   └── admin-settings.html       # Settings
│
├── Driver Pages
│   ├── driver-dashboard.html     # Driver dashboard
│   ├── driver-analytics.html     # Driver analytics
│   └── driver-profile.html       # Driver profile
│
└── User Pages
    ├── user-dashboard.html        # Find e-jeep
    ├── user-routes.html           # Browse routes
    ├── user-history.html          # Trip history
    └── user-profile.html          # User profile
```

## 📖 Usage

### Login Credentials (Mock)
Since this is a mockup, you can use any email/password combination. The system will redirect based on the selected role:

- **Admin/Operator**: Redirects to `admin-dashboard.html`
- **Driver**: Redirects to `driver-dashboard.html`
- **User**: Redirects to `user-dashboard.html`

### Navigation

#### Admin/Operator
1. Select "Admin/Operator" role on login page
2. Enter any credentials
3. Navigate through:
   - Dashboard - Overview of operations
   - Analytics - Detailed reports
   - E-Jeep Management - Fleet management
   - Driver Management - Driver oversight
   - Transactions - Financial records
   - Notifications - System alerts
   - Group Chat - Driver communication
   - Settings - System configuration

#### Driver
1. Select "Driver" role on login page
2. Enter any credentials
3. Access:
   - Dashboard - Shift management and daily activity
   - Analytics - Performance metrics
   - Profile - Personal information

#### User
1. Select "User" role on login page
2. Enter any credentials
3. Explore:
   - Find E-Jeep - Real-time tracking
   - Routes - Available routes
   - Trip History - Past trips
   - Profile - Account settings

## ✨ Features Highlights

### Interactive Elements
- ✅ Role-based login system
- ✅ Form validation
- ✅ Password visibility toggle
- ✅ Modal dialogs
- ✅ Interactive charts with hover effects
- ✅ Search functionality
- ✅ Filter and sort options
- ✅ Tab navigation
- ✅ Real-time clock
- ✅ Shift timer
- ✅ Responsive design

### Sample Data
All pages include realistic sample data:
- E-jeep fleet information
- Driver profiles
- Transaction records
- Revenue and profit metrics
- Passenger statistics
- Routes and schedules

### Placeholder Integrations
The following features are shown as placeholders:
- Google Maps integration
- PDF/CSV export
- Real-time tracking
- Push notifications
- Email notifications
- Payment processing

## 🎯 Future Enhancements

To make this a production-ready application:

1. **Backend Integration**
   - Connect to a database (MySQL, PostgreSQL, MongoDB)
   - Implement RESTful API or GraphQL
   - Real user authentication with JWT
   - Session management

2. **Real Integrations**
   - Google Maps API for real tracking
   - Payment gateway (PayPal, Stripe)
   - SMS gateway for OTP
   - Email service (SendGrid, Mailgun)
   - Push notification service (Firebase Cloud Messaging)

3. **Additional Features**
   - QR code scanning for passengers
   - Mobile app versions (iOS/Android)
   - Real-time websocket connections
   - Advanced analytics with charts library (Chart.js, D3.js)
   - Automated reporting
   - Multi-language support

4. **Security**
   - HTTPS encryption
   - Input sanitization
   - CSRF protection
   - Rate limiting
   - Secure password hashing (bcrypt)

## 🌐 Browser Compatibility

Tested and compatible with:
- Google Chrome 90+
- Mozilla Firefox 88+
- Safari 14+
- Microsoft Edge 90+

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices (portrait and landscape)

## 🛠️ Technologies Used

- **HTML5** - Structure and content
- **CSS3** - Styling and layout
  - CSS Grid
  - Flexbox
  - CSS Variables
  - Animations
- **JavaScript (ES6+)** - Interactivity
- **Font Awesome 6.4.0** - Icons

## 📄 License

This project is a mockup demonstration and is available for educational purposes.

## 👥 Author

Created as a comprehensive E-Jeep management system mockup with full frontend functionality.

## 🙏 Acknowledgments

- Font Awesome for the icon library
- Google Fonts for typography
- Modern CSS techniques for responsive design

## 📞 Support

For questions or issues with this mockup, please refer to the documentation above.

---

**Note**: This is a frontend mockup with placeholder data and functionality. No backend server is required to run and test the interface. All buttons and forms are functional but do not persist data or connect to real services.

