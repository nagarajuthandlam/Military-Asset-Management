# Military Asset Management System

## Project Overview

The Military Asset Management System is a full stack web application developed using React, Django REST Framework, and MySQL. It helps military bases manage purchases, transfers, assignments, and asset movements across multiple bases using role-based access control.

---

## Tech Stack

**Frontend**

* React.js
* Bootstrap
* Axios

**Backend**

* Django
* Django REST Framework

**Database**

* MySQL

---

## Features

* User Login with Role-Based Access (Admin, Base Commander, Logistics Officer)
* Dashboard with Opening Balance, Closing Balance, Net Movement, Assigned Assets, and Transfers
* Purchases Management
* Asset Transfers Between Bases
* Asset Assignments
* Filters for Date, Base, and Equipment Type

---

## Project Structure

Military-Asset-Management/

* backend/
* frontend/
* military.sql

---

## Setup Instructions

### Backend

```bash
cd backend
venv\Scripts\activate
py manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## API Endpoints

* `/api/users/login/`
* `/api/dashboard/`
* `/api/purchases/`
* `/api/transfers/`
* `/api/assignments/`

---

## Login Credentials

| Username  | Password     | Role              |
| --------- | ------------ | ----------------- |
| admin     | admin123     | Admin             |
| commander | commander123 | Base Commander    |
| logistics | logistics123 | Logistics Officer |

---

## Author

**Thandlam Nagaraju**

B.Tech – Computer Science Engineering (2026)
