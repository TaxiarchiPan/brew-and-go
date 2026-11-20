# BREW & GO

### Coffee Shop Ordering Web Application

BREW & GO is a web application designed to provide customers with a simple and convenient way to explore a coffee shop's menu and place orders online.

The project focuses on developing a practical full-stack application, combining a user-friendly frontend with a backend API and a MySQL database.

---

## Project Overview

The main goal of BREW & GO is to develop a digital ordering system for a coffee shop.

Customers will be able to browse available products, explore the menu and place orders through an intuitive interface.

The application is being developed as an individual project, with an emphasis on backend development, database integration and REST API design.

## Technologies Used

**Frontend**
- React
- JavaScript
- CSS
- HTML

**Backend**
- Node.js
- Express.js
- JavaScript
- REST API

**Database**
- MySQL
- mysql2

**Development Tools**
- Visual Studio Code
- Git & GitHub
- npm
- MySQL Workbench

## Project Structure

```text
brew-and-go/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── server.js
|   ├── .gitignore
│   └── package.json
│
└── README.md
```

*Note: The structure may evolve as development progresses.*

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/USERNAME/brew-and-go.git
```

### 2. Backend setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file with your local database configuration:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=brew_and_go
```

Start the backend development server:

```bash
npm run dev
```

### 3. Frontend setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Retrieve available products |

Additional endpoints will be documented as new features are implemented.

## Database

The application uses MySQL for persistent data storage.

The database is designed to support the coffee shop's product catalogue and future ordering functionality.

## Project Goals

- Develop a full-stack web application.
- Implement RESTful API endpoints.
- Integrate a MySQL relational database.
- Practice backend development with Node.js and Express.
- Build a functional online coffee shop ordering system.
- Improve software development and database management skills.

## Future Improvements

Planned features include:

- Shopping cart functionality.
- Customer order management.
- Guest checkout.
- Pickup ordering.
- In-store payment option.
- Improved user interface and responsive design.
- Order tracking and management.

## Author

Developed as an individual academic and personal development project.
