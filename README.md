# User-Product / Role-Based Access Control API

This project is a backend system with role-based access control for managing users, products, and access levels. It supports different functionalities for Super Admins, Admins, Partners, and Customers.



## Tech Stack

- **Database**: MongoDB
- **Authentication and Authorization**: JSON Web Tokens (JWT)
- **Password Security**: bcrypt for password hashing
- **Environment**: Node.js with Express.js

## API Base URL
- **Production**: [https://role-based-access-control-au9l.onrender.com](https://role-based-access-control-au9l.onrender.com)

## Documentation Link
- **Documentation Postman**: [https://documenter.getpostman.com/view/39223152/2sAYBYeVPN](https://documenter.getpostman.com/view/39223152/2sAYBYeVPN)

## Key Features

1. **Role-Based Access**: Separate functionalities for Super Admin, Admin, Partner, and Customer roles.
2. **Secure Authentication**: JWT for session management and authorization.
3. **Password Security**: Passwords are hashed and stored securely using bcrypt.
4. **RESTful Endpoints**: APIs for managing users, products, and orders.
5. **Email Notifications**: Automatic email notifications for account setup and password management.

## Super Admin Login Credentials

- **Email**: `superadmin@gmail.com`
- **Password**: `12345678`

## Role-Based Functionalities

### Super Admin
- Can add/edit Admins.
- Can view all Admins, Partners, Products and Customers.

### Admin
- Can add/edit Partners.
- Can view products added by Partners under their management.
- Can verify and reject products.

### Partner
- Can add/edit/delete products.

### Customer
- Can sign up and sign in.
- Can view all products.
- Can add products to the cart and place orders.

## Additional Functionalities

### Authentication
- Sign up, sign in, forgot password, and reset password.

### Email Notifications
- When a Partner is added by an Admin, an email is sent to the Partner for password setup.
- When an Admin is added by a Super Admin, an email is sent to the Admin for password setup.

## API Endpoints

## Auth - of All Users
- **Sign Up**: `POST /api/auth/signup`
- **Login**: `POST /api/auth/login`
- **Forgot Password**: `POST /api/auth/verify-email`
- **Reset Forgotten Password**: `POST /api/auth/reset-forget-password`
- **Reset Password (Auth Required)**: `POST /api/auth/reset-password`

### Admin Management by Super Admin
- **Add Admin**: `POST /api/admin/add`
- **Get All Admins**: `GET /api/admin/all-admins`

### Partner Management by Admin
- **Add Partner**: `POST /api/admin/add-partner`
- **Get All Partners**: `GET /api/admin/all-partners`

### Product Management by Partner
- **Add Product**: `POST /api/products/add`
- **Update Product**: `PUT /api/products/:id`
- **Get All Products**: `GET /api/products/`
- **Get Product by ID**: `GET /api/products/:id`
- **Delete Product**: `DELETE /api/products/:id`

## How to Run
1. Clone the repository.
   ```bash
   git clone https://github.com/Saurabhsawant77/User-Product-API.git
   
   cd User-Product-API
2. Install dependencies using
   ```bash
   npm install
3. Start the server using
   ```bash
   npm start

