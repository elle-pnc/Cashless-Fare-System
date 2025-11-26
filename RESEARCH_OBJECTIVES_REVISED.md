# Research Objectives (Revised)

This study aims to design, develop, and evaluate an automated fare collection and management system for modern jeepneys. Specifically, the study seeks to:

1. **Develop a commuter fare validation terminal interface** that displays the commuter's card balance, validates sufficient funds for fare payment, and provides clear visual feedback on transaction status (valid/invalid) with balance information.

2. **Implement a tap-in/tap-out payment process** where:
   - A tap-in validates the commuter's card balance and confirms transaction eligibility
   - A tap-out automatically calculates the fare based on distance travelled, deducts the fare amount from the commuter's account, and displays transaction details including fare deducted, distance travelled, and remaining balance

3. **Develop a driver dashboard** that displays:
   - Shift management (start/end shift tracking)
   - Assigned jeepney and route information
   - Current passenger count and total passengers for the day
   - Real-time revenue, expenses, and profit tracking
   - Operational status and daily assignment details

4. **Develop an administrator dashboard** that provides:
   - Overall system operational status
   - Total passenger statistics
   - Financial analytics including daily revenue, expenses, and profit
   - Revenue and profit trend visualization (daily, weekly, monthly, yearly views)
   - Report generation capabilities

5. **Evaluate the developed system** using selected ISO/IEC 25010:2023 product quality characteristics, including functional suitability, performance efficiency, reliability, security, usability, and data quality.

---

## Implementation Status

The current system fully implements all research objectives:
- ✅ Commuter terminal with tap-in/tap-out functionality
- ✅ Balance validation and fare deduction based on selected drop-off terminal
- ✅ Incoming jeepney information display (ID, route, destination)
- ✅ Real-time seat availability display and allocation
- ✅ Drop-off terminal selection before boarding
- ✅ Extended terminal mechanism for changing drop-off during trip with automatic fare recalculation
- ✅ Driver dashboard with passenger tracking, seat monitoring, and financial metrics
- ✅ Administrator dashboard with financial analytics, fleet seat monitoring, and terminal tracking
- ✅ Real-time seat availability indicators with visual seat map
- ✅ Boarding and alighting per terminal tracking with statistics

