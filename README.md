# Project Title

Budget with me

## Overview

What is your app? Give a brief description in a couple of sentences.

Budget with Me is an intuitive personal finance app designed to help users track their income and expenses. The app allows users to set budgets, monitor financial progress, and gain real-time insights into their financial health. The interactive dashboard provides users with a clear and visual overview of their financial situation, helping them make informed decisions about their money.

### Problem Space

Why is your app needed? Give any background information around any pain points or other reasons.

Managing personal finances is often challenging due to the use of multiple tools like spreadsheets, apps, or manual tracking methods. This fragmented approach can be overwhelming and inefficient. Budget with Me solves this by consolidating all financial information into a single, user-friendly app, providing users with a streamlined and efficient way to manage their finances.

### User Profile

Who will use your app? How will they use it? Add any special considerations that your app must take into account.

Target Users:

- Young professionals, families, and freelancers who need an easy way to manage their finances.
- Individuals with different financial goals, like saving for a home, building an emergency fund, or investing in the stock market.
- Basically, anyone looking to take control of their finances.

How They'll Use It:

- Users will create an account and input their financial data (income, expenses)
- Users can view a financial summary on their dashboard and access detailed reports on spending

Special Considerations:

- The app will be user-friendly, with simple navigation and accessible financial explanations for users of varying financial knowledge.
- Mobile-responsive to ensure ease of use across devices.

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

1. Dashboard Overview:

   - Displays income, expenses, savings goals, and investments in one place.
   - Visual feedback on overall financial health.

2. Budgeting:

   - Users can set a budget for different categories (e.g., groceries, entertainment) and track spending.
   - Alerts for overspending within categories.

3. Important Dates & Reminders:

   - Calendar feature for tracking recurring bills, payments, and other important financial dates with reminders.

## Implementation

### Tech Stack

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

Frontend:

- React for building the user interface.
- CSS/Sass for styling.

Backend:

- Node.js with Express for handling API requests and server logic.
- MySQL for database management
- RESTful API for server communication.

### APIs

List any external sources of data that will be used in your app.

Each API supports specific app functionalities:

- Budget Management: Enables users to set and view budgets for various categories, helping them stay within financial limits.
- Important Dates & Reminders: Helps users manage recurring payments and important financial dates.

### Sitemap

List the pages of your app with brief descriptions. You can show this visually, or write it out.

App Structure:
The following pages are included, with brief descriptions:

1. Dashboard Overview Page: Provides a snapshot of the user’s income, expenses, income, along with visual feedback on their overall financial health.
2. Budgeting Page: Allows users to set and track budgets across various categories.
3. Important Dates & Reminders Page: Features a calendar for tracking recurring bills, payments, and other financial deadlines.

### Mockups

Provide visuals of your app's screens. You can use pictures of hand-drawn sketches, or wireframing tools like Figma.

Provided as pictures under assets folder.

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out.

Budgeting {budget_id, category, budget_amount}
Reminders {reminder_id, name, due_date, category}

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

1. Dashboard Overview:

   - GET /api/dashboard/overview:
     Response: {"total_income": 5000, "total_expenses": 2000, "reminders": [{"reminder_id": 1,"name": "Electric Bill","due_date": "2025-02-15","category": "Utilities"}]}
   - POST /api/reports/overview
     Request body:{"total_income": 5000, "total_expenses": 2000, "reminders": [{"reminder_id": 1,"name": "Electric Bill","due_date": "2025-02-15","category": "Utilities"}]}
     Response: {"message": Dashboard updated successfully."}

2. Budgeting

   - GET /api/budget
     Response: {"groceries": 500,"entertainment": 300,"transport": 150}
   - POST /api/budget
     Request Body: {"category": "groceries","amount": 500}
     Response: {"message": "Budget entry saved successfully."}
   - DELETE /api/budget/{id}
     Response: {"message": "Budget entry deleted successfully."}

3. Important Dates & Reminders:

   - GET /api/reminders
     Response: [{"reminder_id": 1,"name": "Electric Bill","due_date": "2025-02-15", "category": "Utilities"}]
   - POST /api/reminders
     Request Body: {"name": "Rent Payment","due_date": "2025-02-28","category": "Housing"}
     Response: {"message": "Reminder saved successfully."}

- DELETE /api/reminders/{id}
  Response: {"message": "Reminder deleted successfully."}

## Roadmap

Day 1: Project Setup & Initial Development

- Set up your project repository and structure (e.g., GitHub).
- Initialize the frontend and backend environments.
- Create a new React app for the frontend.
- Set up a Node.js server with Express for the backend.
- Initialize the database (MySQL), set up Tables.
- Set up version control (e.g., Git) and commit the initial setup.

Day 2: Frontend Layout & Basic UI Design

- Design the basic layout of the app (Dashboard, Budgeting, Reminders)
- Use a CSS framework like Bootstrap or styled-components for a responsive UI.
- Develop static versions of the pages (no functionality yet) with placeholders.
- Focus on making the app mobile-responsive.

Day 3: Backend - API Endpoints

- GET /api/dashboard/overview (for total income, expenses, etc.)
- POST /api/budget (to set or update a budget)
- Test API endpoints using Postman or similar tools.

Day 4: Frontend - API Integration

- Integrate frontend with backend APIs.
- Fetch dashboard data (income, expenses) and display on the Dashboard page.
- Set and update budget data on the Budgeting page.
- Implement basic error handling and loading states for user experience.

Day 5: Backend - API Endpoints

- GET /api/reminders (for recurring bills and financial reminders).
- POST /api/reminders (to add a reminder).

Day 6: Frontend - API Integration

- Integrate the frontend with the remaining backend APIs.
- Display reminders on the Important Dates & Reminders page.
- Polish UI elements, make sure data flows correctly.

Day 7: Testing, Debugging, and Final Adjustments

- Test the app thoroughly for bugs (frontend and backend).
  Check all functionality: budget updates, reminder creation, etc.
- Ensure smooth navigation and mobile responsiveness.
- Look for UI/UX issues and make final adjustments.

---

## Future Implementations

- User Authentication
- Transaction Tracking for real time
- Savings Goals
- Investment Tracking
- Multi-currency support
