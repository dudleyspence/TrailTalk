# **TrailTalk**

A fully revamped frontend for hiking enthusiasts to share and discuss articles. This version introduces TailwindCSS, Material Tailwind, an improved rich text editor, direct image uploads via Cloudinary, and more.

---

## **Table of Contents**  
1. [Project Overview](#project-overview)  
2. [Key Features](#key-features)  
3. [Tech Stack](#tech-stack)  
4. [Cloudinary Setup](#cloudinary-setup)  
5. [Getting Started](#getting-started)  
6. [File Structure](#file-structure)  
7. [Contributing](#contributing)  
8. [License](#license)  
9. [Credits and References](#credits-and-references)

---

## **Project Overview**

- **Name**: TrailTalk
- **Version**: 2.0
- **Purpose**: Provide a platform where hikers can browse, create, and engage with hiking-related articles.  
- **Core Improvements**:  
  - TailwindCSS & Material Tailwind integration for a sleek, maintainable UI.  
  - Rich Text Editor for article creation.  
  - Direct image uploads using Cloudinary.  
  - Optional login with Email/Password or Google Auth.  
  - User profiles with stats and article management.  

---

## **Key Features**

1. **Rich Text Editor**  
   Create and format articles using a powerful editor that supports images and text styling.

2. **Direct Image Uploads**  
   Users can upload images from their devices, stored securely on Cloudinary (see [Cloudinary Setup](#cloudinary-setup)).

3. **Browse Without Login**  
   Anyone can read articles and comments without signing in.

4. **Interactive Content (Login Required)**  
   - Comment on articles.  
   - Vote on articles or comments (optimistic rendering).  
   - Post, edit, or delete your own articles.  

5. **Loading Skeletons**  
   Pages use skeleton components to indicate loading states, improving the perceived performance.

6. **Enhanced Profile**  
   View all your articles, stats, and quick shortcuts to manage your content.

---

## **Tech Stack**

- **Frontend**  
  - [React](https://reactjs.org/)  
  - [TailwindCSS](https://tailwindcss.com/)  
  - [Material Tailwind](https://www.material-tailwind.com/)
  - [TipTap Rich Text Editor](https://tiptap.dev/docs/editor/getting-started/overview)

- **Backend**
  The backend repo is [be-news-api](https://github.com/dudleyspence/be-news-api) 
  - [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)  
  - [PostgreSQL](https://www.postgresql.org/)

- **Authentication**  
  - Email/Password  
  - Google Auth (via Firebase)

- **File Hosting**  
  - [Cloudinary](https://cloudinary.com/) (See below for setup)

- **Deployment**  
  - Typically deployed on [Render](https://render.com/) or [Railway](https://railway.app/)

---

## **Cloudinary Setup**

TrailTalk relies on **Cloudinary** for image hosting. If you plan to run or contribute to this project, you’ll need:

1. **Cloudinary Account**  
   - Sign up for a free account at [cloudinary.com](https://cloudinary.com/).  

2. **Create an Upload Preset**  
   - In your Cloudinary dashboard, go to **Settings -> Upload**.  
   - Create a new unsigned **Upload Preset** (or use a signed one, but that requires additional server-side logic).  
   - Copy the preset name.

3. **Environment Variables**  
   - In your `.env` (or other config) file, store your Cloud Name and Upload Preset, for example:
     ```bash
     VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
     VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
     ```
   - The application will use these environment variables to upload images.

---

## **Getting Started**

### **Prerequisites**

- [Node.js](https://nodejs.org/en/) (v14 or higher)  
- [npm](https://www.npmjs.com/) (v6 or higher) or Yarn  
- A running backend (Express + PostgreSQL) – or you can point to the deployed backend. Instructions on setting up the backend can be found here [be-news-api](https://github.com/dudleyspence/be-news-api) 
- A Cloudinary account and an upload preset (optional but recommended for testing the image upload feature).

### **Installation**

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/dudleyspence/TrailTalk.git
   cd TrailTalk
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```
   or
   ```bash
   yarn
   ```

3. **Environment Variables**  
   - Create a `.env` or `.env.local` file at the project root.  
   - Define your Cloudinary credentials (optional if you don’t need file uploads):  
     ```bash
     VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
     VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
     ```

4. **Run the App**  
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## **File Structure**

Below is a **simplified** overview of the project folder structure:

```
TrailTalk
├── README.md
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── api.js
├── index.html
├── src
│   ├── App.jsx
│   ├── AppRoutes.jsx
│   ├── assets
│   │   └── ... (images & icons)
│   ├── components
│   │   ├── Article
│   │   ├── ArticleList
│   │   ├── Auth
│   │   ├── CommentSection
│   │   ├── Footer
│   │   ├── Header
│   │   ├── Pagination
│   │   ├── PostArticle
│   │   ├── Profile
│   │   ├── SortingControls
│   │   ├── UI
│   │   ├── Utils
│   │   └── VotesControl
│   ├── context
│   ├── firebase
│   ├── hooks
│   ├── pages
│   ├── global.css
│   └── main.jsx
└── ... (other config files)
```

- **`src/components`** – Reusable UI components and features (e.g., ArticleList, CommentSection, etc.).  
- **`src/pages`** – Page-level components for routing (e.g., MainPage, ProfilePage, etc.).  
- **`src/hooks`** – Custom React hooks for data fetching and state management.  
- **`src/context`** – Context providers for global state (Auth, Modal handling, etc.).  
- **`src/firebase`** – Setup for Firebase authentication and config files.  

---

## **Contributing**

1. **Fork the Project**  
2. **Create a Feature Branch** (`git checkout -b feature/SomeFeature`)  
3. **Commit Your Changes** (`git commit -m 'Add some feature'`)  
4. **Push to the Branch** (`git push origin feature/SomeFeature`)  
5. **Open a Pull Request** in this repo

We welcome all contributions, from bug fixes to new features. Any feedback is appreciated.

---

## **License**

TrailTalk is open-source under the [MIT License](LICENSE). You’re free to use, modify, and distribute this software as you wish, as long as the original license is included in derivative works.

---

## **References**

- This repo is a **complete rebuild** of the original TrailTalk. You can find the previous version [here](https://github.com/dudleyspence/TrailTalk-old).  

---

_**Happy Hiking & Coding!**_  
