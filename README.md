# Blogs API Backend

A RESTful API backend for a blog application built with Express.js and Prisma.

## Overview

This repository contains the backend API for a blog application, built with **Express.js** , **Prisma ORM** and **Postgresql**. The API provides endpoints for user authentication, blog post management. The API is hosted on Render and uses Supabase for database services.

## Hosting Information

- **API Hosting**: The API is hosted on Render at [https://blogs-api-express.onrender.com](https://blogs-api-express.onrender.com/)
- **Database Hosting**: PostgreSQL database is hosted on Supabase
- **Live Demo**: The frontend application using this API is available at [https://blogs-ui-nextjs-app.vercel.app/](https://blogs-ui-nextjs-app.vercel.app/)

## Technologies

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database ORM**: Prisma
- **Database**: Postgresql
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Logging**: Morgan
- **Development**: TypeScript, Nodemon

## Features

- User authentication and authorization
- CRUD operations for blog posts

- RESTful API design

## Prerequisites

- Node.js (LTS version recommended)
- pnpm, yarn, or npm
- Database (PostgreSQL)

## Set up environment variables

DATABASE_URL="postgresql://username:password@localhost:5432/blog_db?schema=public"
PORT=3001
NODE_ENV=development
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRATION_TIME=30d

### Installation

To set up the project locally, follow these steps:

1.  **Clone the repository**:

```bash

git clone https://github.com/zawzawmyint/blogs-api-express.git

cd blogs-api-express

```

2.  **Install dependencies**:

```bash

npm install

```

3.  **Start the development server**:

```bash

npm run dev

```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Available Scripts

- `npm run start` - Start the production server
- `npm run dev` - Start the development server with hot reloading
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio for database management

## API Endpoints

### Authentication

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login

### Blog Posts

- `GET /api/blogs` - Get all posts and search (authenticated)
- `GET /api/blogs/:id` - Get a specific post (authenticated)
- `POST /api/blogs` - Create a new post (authenticated)
- `PUT /api/blogs/:id` - Update a post (authenticated)
- `DELETE /api/blogs/:id` - Delete a post (authenticated)

## Blog Frontend repository

Open [https://github.com/zawzawmyint/blogs-ui-nextjs-app](https://github.com/zawzawmyint/blogs-ui-nextjs-app)
