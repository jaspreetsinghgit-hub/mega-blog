# MegaBlog

MegaBlog is a responsive blog application built with React that allows users to create, manage, and read blog posts. The application uses Appwrite for backend services and Redux Toolkit for managing application state.

## Live Demo

https://mega-blog-ten-plum.vercel.app/

## GitHub Repository

https://github.com/jaspreetsinghgit-hub/mega-blog

## Features

* User authentication with Appwrite
* Create, edit, and delete blog posts
* View all available blog posts
* View individual blog posts
* Rich-text content editing using TinyMCE
* Form handling using React Hook Form
* State management using Redux Toolkit
* Client-side routing using React Router
* Responsive user interface using Tailwind CSS
* Image upload and post management through Appwrite

## Technologies Used

* React
* Redux Toolkit
* React Router
* Appwrite
* Tailwind CSS
* React Hook Form
* TinyMCE
* JavaScript
* Vite

## Project Structure

The application is divided into reusable React components and pages.

```text
src/
├── components/
├── pages/
├── store/
├── appwrite/
├── conf/
└── App.jsx
```

## How to Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project

```bash
cd megaBlog
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add the required Appwrite and TinyMCE configuration values.

### 5. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## What I Learned

While building MegaBlog, I practiced:

* Building reusable React components
* Managing global state with Redux Toolkit
* Working with Appwrite backend services
* Implementing authentication and CRUD operations
* Handling forms with React Hook Form
* Integrating a rich-text editor
* Managing routes with React Router
* Building responsive layouts with Tailwind CSS

## Future Improvements

* Improve the overall UI and design
* Add additional blog management features
* Improve post discovery and organization

## Author

**Jaspreet Singh**

* GitHub: [Jaspreet Singh](https://github.com/jaspreetsinghgit-hub/mega-blog)
* LinkedIn: [Jaspreet Singh](https://www.linkedin.com/in/jaspreetsingh-dev/)
