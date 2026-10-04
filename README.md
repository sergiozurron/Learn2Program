# Learn2Program

**Everyone can Learn2Program**

Interactive web platform that teaches programming languages in a fun, progressive and accessible way — inspired by Duolingo.

Developed as an academic project for the course *Gestión de Proyectos Software y Metodologías de Desarrollo* (2024-2025) by the team **Agile Masters**.

**App:** https://learn2program.sergiozurron.site/

## About the Project

Learn2Program is a gamified learning platform that helps beginners (and not-so-beginners) learn programming through short, interactive lessons.

Instead of long, overwhelming courses, users progress through bite-sized activities such as:

- Interactive tutorials
- Fill-in-the-blank exercises
- Matching games
- Multiple-choice questions
- Short coding challenges

The goal is to make learning programming feel rewarding, accessible from anywhere, and adaptable to different levels and languages.

### Key Concepts
- **Progressive learning** – short lessons that feel like “chocolates” (one small, satisfying bite at a time)
- **Multiple languages** – users can choose the programming language they want to learn
- **Anywhere, anytime** – fully web-based and responsive
- **Gamification** – designed to keep motivation high through continuous small wins

## Tech Stack

| Layer          | Technology                          |
|----------------|-------------------------------------|
| Backend        | Node.js + Express                   |
| Templating     | EJS                                 |
| Database       | MySQL + Sequelize ORM               |
| Authentication | express-session + bcrypt            |
| Email          | Nodemailer                          |
| Testing        | Jest + Supertest + jsdom            |
| Other          | dotenv, cookie-parser, moment       |

## Project Structure

```
Learn2Program/
├── app.js                 # Express application setup
├── server.js              # Entry point
├── package.json
├── database/              # Database configuration & migrations
├── middleware/            # Custom middleware
├── modelos/               # Sequelize models
├── public/                # Static assets (CSS, JS, images)
├── servicios/             # Business logic / services
├── tests/                 # Unit & integration tests
├── utils/                 # Utility functions
└── views/                 # EJS templates
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- MySQL
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Criistiiansiito/Learn2Program.git
   cd Learn2Program
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   
   Create a `.env` file in the root directory with the following variables (example):

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=learn2program
   DB_DIALECT=mysql
   SESSION_SECRET=your_secret_key
   # Email configuration (Nodemailer)
   EMAIL_HOST=...
   EMAIL_PORT=...
   EMAIL_USER=...
   EMAIL_PASS=...
   ```

4. **Database setup**
   
   Create the MySQL database and run the necessary migrations/seeders (check the `database/` folder for details).

5. **Run the application**
   ```bash
   npm start
   ```

   The server will start at `http://localhost:3000` (or the port defined in `.env`).

### Running Tests

```bash
npm test
```

## Features (Current / Planned)

- User registration and authentication
- Interactive lessons and exercises
- Progress tracking
- Multiple programming languages support
- Responsive design
- Admin capabilities (content management)

## Team – Agile Masters

| Member                          | Roles                          |
|---------------------------------|----------------------------------|
| Javier Aceituno Monja           | Product Owner, Monitor Evaluador, Implementador, Finalizador |
| Eric Adrián Caiguaraico Balboa  | Desarrollador, Cerebro, Monitor Evaluador       |
| Juan Pablo Fernández de la Torre| Desarrollador, Finalizador, Cerebro, Monitor Evaluador, Impulsor |
| Cristian García Moruno          | Desarrollador, Finalizador, Especialista        |
| Paula Guadilla Gómez            | Desarrollador, Finalizador, Impulsor, Monitor Evaluador |
| Wenjie Huang                    | Desarrollador, Cohesionador, Finalizador        |
| Julián Martínez Ródenas         | Desarrollador, Implementador, Finalizador, Investigador de Recursos |
| Sofía Postigo Ruiz              | Desarrollador, Coordinador, Cohesionador        |
| Sara Alexandra Sánchez del Río  | Scrum Master, Coordinador, Cohesionador, Implementador, Finalizador |
| Sergio Vázquez Carbajo          | Desarrollador, Implementador, Cohesionador, Coordinador |
| Sergio Zurrón Cid               | Desarrollador, Especialista                     |

**Slogan:** *Agilidad en acción, innovación en cada sprint*

## Academic Context

This project was developed following Agile methodologies (mainly Scrum) as part of the course:

**Gestión de Proyectos Software y Metodologías de Desarrollo**  
Universidad Complutense de Madrid – 2024/2025
