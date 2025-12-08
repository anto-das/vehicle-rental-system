### 🚗 Vehicle Rental System

--In a vehicle rental system backend API, separate functionalities can be created for each role such as normal users, admins, and customers.
Admins will be able to add and remove vehicles, while normal users can only fetch/get vehicles without needing to sign up or sign in.

Admins can also see how many users have signed up or signed in and can assign roles to them.
In the authentication functionality, a JWT token will be generated, and user verification will be done based on that token.

### 🛩️ Key Featured

- **JWT Authentication**
- **Role based access (Admin & Customer)**
- **Vehicle Management**
- **Vehicle booked auto return and auto calculate per day price**
- **Customer can vehicle booking cancelled and admin can returned**
- **Secured password hashing**
- **Middleware validation**

### 📦 Tech stack

- | Runtime | **Node Js**
- | Language | **Typescript**
- | Framework | **Express Js**
- | Database | **PostgreSQL**
- | Auth | **JWT**
- | Password hashing | **bycrpt**

### 📁 Project Structure

```
src/
│── app.ts
│── server.ts
│
├── config/
│   ├── index.ts
│   ├── db.ts
│
├── middleware/
│   ├── auth.ts
│   ├── isAdmin.ts
│
├── modules/
│   ├── authentication/
│   ├── users/
│   ├── vehicles/
│   ├── bookings/
│
└── utilities/
    └── number_of_days.ts
```

### ⚙️ Setup & Installation

## Clone Repository

Git-clone: `https://github.com/anto-das/vehicle-rental-system`


Live-line: `https://vehicle-rental-system-api-chi.vercel.app`

- cd vehicle-rental-system

## Install Dependencies

`npm install`

## Create .env file

````PORT=5000
DATABASE_URL=your_postgres_url
JWT_SECRET_TOKEN=your_secret_key```

````
