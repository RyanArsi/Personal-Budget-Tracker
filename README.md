# Personal Budget Tracker

A simple web application for managing personal finances using the **MVC (Model-View-Controller)** pattern.

## Description

Personal Budget Tracker is a lightweight financial management tool that allows users to:
- Add and track income and expenses
- View financial summaries and analytics
- Generate visual reports with charts and graphs
- Filter transactions by month and year

## Features

- **Simple Movement Management**: Easily record financial transactions (income/expenses)
- **Dashboard**: View real-time financial summary with total income, expenses, and balance
- **Reports**: Analyze your finances with interactive charts and monthly statistics
- **Session Storage**: Data is stored in the browser's session storage for quick access
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Requirements

To run this project, you need:

1. **PHP Server** - Any PHP-enabled server such as:
   - XAMPP
   - WAMP
   - LAMP
   - Docker
   - PHP Built-in Server

2. **Web Browser** - Any modern web browser (Chrome, Firefox, Edge, Safari, etc.)

## Installation & Setup

1. **Extract the project** into your web server's root directory:
   - XAMPP: `C:\xampp\htdocs\` (Windows) or `/Applications/XAMPP/htdocs/` (Mac)
   - Or your preferred server location

2. **Start your PHP server**:
   - XAMPP: Start Apache from the XAMPP Control Panel
   - Or use PHP built-in server: `php -S localhost:8000`

3. **Access the application**:
   - Open your browser and navigate to: `http://localhost/Personal-Budget-Tracker/`
   - Or if using PHP built-in: `http://localhost:8000`

## Project Structure

```
Personal-Budget-Tracker/
├── app/               # Application folder
│   ├── Bootstrap.php  # Application initialization
│   ├── Controller.php # Base controller
│   ├── Model.php      # Base model
│   └── View.php       # Base view
├── web/               # Web assets and pages
│   ├── home.php       # Home page
│   ├── movements.php  # Movements management page
│   ├── reports.php    # Reports and analytics page
│   ├── layout.php     # Main layout template
│   ├── script.js      # JavaScript functionality
│   └── style.css      # Styling
├── index.php          # Entry point
└── README.md          # This file
```

## Architecture

This project implements the **MVC Pattern**:

- **Model**: Handles data logic and business operations
- **View**: Displays the user interface
- **Controller**: Manages the flow between Model and View

## Usage

1. **Navigate to Home**: View the application overview and available features
2. **Add Movements**: Go to "Movimentações" (Movements) to record income or expenses
3. **View Reports**: Go to "Relatórios" (Reports) to see charts and financial analysis
4. **Filter Data**: Use month and year filters to analyze specific time periods

## Technology Stack

- **Backend**: PHP (Server-side)
- **Frontend**: HTML, CSS, JavaScript
- **Charts**: Chart.js Library
- **Data Storage**: Browser Session Storage

## Notes

- All data is stored in browser session storage and will be cleared when the browser tab is closed
- No database or backend storage is required
- The application is fully client-side after the initial page load

## License

This project is open source and available for educational and personal use.

## Author

Created as a practical implementation of the MVC design pattern for financial management.
