# LJ Plant Hire

A booking website for **LJ Plant Hire**, a construction and mining equipment hire company based in Tzaneen, Limpopo, South Africa.

Customers can browse the fleet and send a hire request without creating an account. The owner logs in to an admin dashboard to review requests, confirm them and track each hire. No payments are taken on the site. The business follows up with each customer by phone or email.

## Features

**Public site**
- Landing page, About page and Contact page
- Fleet catalogue with live data from the API (name, category, hourly rate, photo)
- Hire request form with a dropdown of real equipment, site location and dates
- Server-side validation of every booking request
- Each booking gets a unique reference token (e.g. `LJPH-GR8FQX`)

**Admin dashboard**
- Secure login using JWT
- All bookings in a searchable, sortable, paginated table (AG Grid)
- Filter tabs and summary cards for each status
- A MANAGE modal to view full booking details, change the status or delete a booking
- Booking statuses: `NEW`, `CONFIRMED`, `IN_USE`, `RETURNED`, `CANCELLED`

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS, React Router, AG Grid |
| Backend | Java, Spring Boot, Spring Security, Spring Data JPA, Bean Validation |
| Database | MySQL |
| Auth | JWT (jjwt), BCrypt password hashing |
| Image storage | Supabase Storage (public bucket, images only) |
| Hosting | Render (backend in Docker, static frontend) with a hosted MySQL database |

## How it works

```
React (browser)  ->  Spring Boot REST API  ->  MySQL
                          |
                          +-> JWT filter protects /api/admin/**
```

The backend is layered: controller (HTTP) -> service (business logic) -> repository (database) -> entity. Request bodies use DTOs, so customers can never set fields like `status` or `referenceToken` themselves.

### API overview

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/equipment` | Public | List the fleet |
| GET | `/api/equipment/{id}` | Public | Single machine |
| POST | `/api/bookings` | Public | Submit a hire request |
| POST | `/api/auth/login` | Public | Admin login, returns a JWT |
| GET | `/api/admin/bookings` | Admin | List all bookings |
| PUT | `/api/admin/bookings/{id}/status` | Admin | Change a booking's status |
| DELETE | `/api/admin/bookings/{id}` | Admin | Delete a booking |

Admin requests must send the header `Authorization: Bearer <token>`.

## Running it locally

### Prerequisites
- Java (the version set in `pom.xml`)
- Node.js 18 or newer
- MySQL 8

### 1. Database
Create an empty database:

```sql
CREATE DATABASE lj_plant_hire;
```

Hibernate creates the tables automatically on first run.

### 2. Backend

Secrets are read from environment variables. They are never stored in the code. Set them before starting the app (check `application.properties` for the exact variable names):

```bash
export DB_PASSWORD=your_database_password
export JWT_SECRET=a_long_random_string_at_least_32_characters
```

Then start the backend:

```bash
cd backend
./mvnw spring-boot:run
```

It runs on `http://localhost:8080`.

### 3. Create the first admin

There is no public admin sign-up, by design. Generate a BCrypt hash of your chosen password locally, then insert one row:

```sql
INSERT INTO admin_user (username, password_hash)
VALUES ('admin', '<your BCrypt hash>');
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
```

It runs on `http://localhost:5173`. The backend allows this origin through CORS by default.

## Security notes

- Passwords are stored only as BCrypt hashes
- Admin routes require a valid JWT, checked on the server for every request
- Public booking input is validated and goes through a DTO
- Secrets (database password, JWT secret) come from environment variables and are excluded from the repository
- Never commit a real `.env` file or real credentials

## Roadmap

- [ ] Email confirmation sent to the customer after booking
- [ ] Admin screen to add, edit and remove equipment
- [ ] Full mobile responsiveness pass
- [ ] Friendlier error responses for failed validation

## Author

Built by Tshepo Sepatake for LJ Plant Hire, Tzaneen, Limpopo.
