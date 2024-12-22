# **TrailTalk 2.0**  
A modern, refactored frontend for hikers, trekkers, and outdoor enthusiasts to share articles, discuss in comments, and stay updated on the latest hiking trends.

---

## **Table of Contents**  
1. [Overview](#overview)  
2. [Key Features](#key-features)  
3. [Tech Stack](#tech-stack)  
4. [Getting Started](#getting-started)  
5. [Usage](#usage)  
6. [Architecture](#architecture)  
7. [Future Roadmap](#future-roadmap)  
8. [Contributing](#contributing)  
9. [License](#license)  
10. [Credits and References](#credits-and-references)

---

## **Overview**  
TrailTalk 2.0 is a brand-new frontend application built from the ground up. While still rooted in the core idea of sharing and discussing hiking-related articles, this version introduces a vastly improved user interface, richer functionality, and a more maintainable codebase.  

### **Why TrailTalk 2.0?**  
1. **Rich Text Editing:** Articles now have proper formatting and embedded media support.  
2. **Direct Image Uploads:** Users can upload images seamlessly without relying on external URLs.  
3. **Flexible Authentication:** Users can register or log in via email/password or Google Auth.  
4. **Enhanced Browsing:** Sort and filter articles without being logged in. Log in only when you want to interact.  
5. **Profile Pages:** Centralized location for all your activity—articles, votes, and account stats.  
6. **Custom Hooks Architecture:** Clean, scalable code for easier maintenance and faster iteration.  

---

## **Key Features**

1. **Browse & Read Without Login**  
   - Immediately access articles and comments.  
   - Sort by topics, popularity, or date.

2. **Interactive Content (Login Required)**  
   - Vote on articles and comments.  
   - Submit or edit articles using a full-featured text editor.  
   - Leave and manage comments.

3. **User Profiles**  
   - Access a personal dashboard showing your articles, stats, and recent activity.  
   - Quickly edit or remove posts you’ve created.

4. **Optimistic Rendering**  
   - Vote changes, comment interactions, and article updates feel instantaneous.

5. **Loading Skeletons**  
   - Enjoy better perceived performance with skeleton components indicating loading states.

6. **TailwindCSS & Material Tailwind**  
   - All styling is utility-first for rapid development.  
   - Easy to maintain design consistency across the entire app.

---

## **Tech Stack**

### **Frontend**  
- **React** – Core library for building the user interface.  
- **TailwindCSS** – Utility-first styling for rapid, consistent design.  
- **Material Tailwind** – Pre-built UI components following modern design standards.  

### **Backend**  
- **Express & Node.js** – RESTful API with robust routing.  
- **PostgreSQL** – Relational database for article, user, and comment data.

### **Authentication**  
- **Email/Password** – Classic approach for account creation.  
- **Google Auth** – Quick sign-in with Google to simplify registration and login.

---

## **Getting Started**

### **Prerequisites**  
- **Node.js** (v14 or higher)  
- **npm** (v6 or higher) or **Yarn**  
- A running or deployed version of the backend API (Node + Express + PostgreSQL).  

### **Installation**  
1. **Clone this repository**:  
   ```bash
   git clone https://github.com/YourUsername/TrailTalk2.0.git
   ```
2. **Move into the project directory**:  
   ```bash
   cd TrailTalk2.0
   ```
3. **Install dependencies**:  
   ```bash
   npm install
   ```
   or  
   ```bash
   yarn
   ```

### **Running the App Locally**  
1. Ensure your [Backend API](https://github.com/dudleyspence/be-news-api) is already running at `http://localhost:5000` or a deployed server.  
2. **Start the development server**:  
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## **Usage**  
1. **Browse Articles**  
   - No login required. Sort or filter by topic, popularity, or newest articles.  
2. **Log In**  
   - Choose Email/Password or Google Auth.  
   - Alternatively, use a demo login if provided.  
3. **Create or Edit Articles**  
   - Use the built-in Rich Text Editor to format your content.  
   - Directly upload images from your device.  
4. **Vote & Comment**  
   - Upvote or downvote content and engage in conversations via the comments.  
   - Remove your comments if needed.  
5. **Visit Your Profile**  
   - Manage your articles and review your engagement stats.  

---

## **Architecture**  

### **File Structure**  
A simplified view of the folder structure might look like this:
```
TrailTalk2.0
├─ src
│  ├─ components
│  │  ├─ ArticleCard.jsx
│  │  ├─ CommentSection.jsx
│  │  └─ ...
│  ├─ hooks
│  │  ├─ useArticles.js
│  │  ├─ useComments.js
│  │  └─ ...
│  ├─ pages
│  │  ├─ Home.jsx
│  │  ├─ Profile.jsx
│  │  ├─ ArticleDetails.jsx
│  │  └─ ...
│  ├─ services
│  │  └─ api.js
│  ├─ App.js
│  └─ main.css
├─ package.json
└─ ...
```

### **Custom Hooks**  
- **useArticles** – Fetches, filters, and manages state for articles.  
- **useComments** – Handles comments data lifecycle.  
- **useAuth** – Manages user authentication, login/logout, and token storage.

### **Why Custom Hooks?**  
- **Scalability** – Easily extend or modify without rewriting large parts of the code.  
- **Reusability** – Shared logic can be imported into any component that needs it.  
- **Maintainability** – Keep components clean, focusing on UI rather than data fetch/management.

---

## **Future Roadmap**  
1. **Drag & Drop Image Uploads**  
   - Further enhance the user experience by allowing direct file dragging into the editor.  
2. **Enhanced Social Interactions**  
   - Article bookmarks, social media sharing, notifications for new articles or comments.  
3. **Offline Support / PWA**  
   - Enable offline reading and push notifications for a truly seamless mobile experience.  
4. **Comment Threads & Replies**  
   - Nest replies and threads to facilitate deeper discussions.

---

## **Contributing**  
Contributions are always welcome! Whether you’re reporting a bug, suggesting an enhancement, or submitting a pull request, your help is greatly appreciated.  

1. **Fork the project**  
2. **Create a new branch** for your feature or fix.  
3. **Commit your changes** and push to your branch.  
4. **Create a Pull Request** describing your changes and why they should be merged.

---

## **License**  
This project is licensed under the **MIT License**—see the [LICENSE](LICENSE) file for details.  

---

## **Credits and References**  
- The **original version** of TrailTalk can be found [here](https://github.com/dudleyspence/TrailTalk). While TrailTalk 2.0 is a brand-new frontend developed from scratch, the core concept remains true to the original project’s vision.  
