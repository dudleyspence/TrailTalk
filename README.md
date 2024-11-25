
# **Trail Talk**

**Description**  
Trail Talk is a web-based application crafted for outdoor enthusiasts to delve into hiking-related articles, share their thoughts through comments, vote to increase an article's "altitude points," and manage personalised user profiles. This platform ensures an engaging experience with features like dynamic article sorting, pagination, and a robust commenting system.

----------

## **Features**

-   **Dynamic Article Sorting**: Effortlessly sort articles by date, popularity, or number of comments.
-   **Profile Page**: View user details, including username, avatar, and a list of posted articles with options to delete them.
-   **Voting System**: Upvote and downvote on users articles and comments. Votes utilise optimistic rendering for a smooth voting experience.
-   **Topic Navigation**: Browse articles by selecting topics of interest.
-   **Commenting System**: Add comments to articles, engage with others, and manage your comments (delete functionality available).
-   **Pagination Controls**: Navigate seamlessly through articles and comments with efficient pagination.
-   **Error Handling**: Friendly error messages and validation prompts for smooth interaction.
-   **Login**: The code includes basic login functionality but i have subsituted this for a demo user button for ease of demonstration.

----------

## **Technologies Used**

-   **Frontend**: React.js, CSS
-   **Backend**: Node.js, Express.js
-   **Database**: PostgreSQL
-   **Hosting**: Hosted on Railway [TrailTalk](https://trailtalk-production.up.railway.app/)

----------

## **How to Use**

### **Using the Web App**

1.  Visit the deployed application on your web browser.
2.  Log in by simply pressing the demo user login button.
3.  Explore hiking articles, sort them by various criteria, and interact with the community by adding or deleting comments.
4.  Navigate to your profile to view and manage your articles and comments.

Access the web app here:  
**URL**: [https://trailtalk-im36.onrender.com/](https://trailtalk-im36.onrender.com/)

----------

## **Code Overview**

### **Frontend**

-   **React Components**: Modular structure for dynamic rendering of articles, topics, and user profiles.
-   **State Management**: Utilises React's state and props for seamless navigation and updates.

### **Backend**

-   **Express.js API**: Manages requests for articles, comments, and user data.
-   **Database Integration**: PostgreSQL handles data storage and retrieval with efficient queries.

### **Error Handling**
-   Comprehensive error management for a user-friendly experience during login, article interactions, and commenting.

----------

## **For Developers**

If you wish to contribute or run the project locally, follow these steps:

### **Prerequisites**

-   **Node.js** (v12.x or higher)
-   **npm** (v6.x or higher)

### **Installation**

1.  Clone the repository:
    
    `git clone https://github.com/dudleyspence/TrailTalk.git` 
    
2.  Navigate to the project folder:
    
    `cd TrailTalk` 
    
3.  Install the dependencies:
    
    `npm install` 
    

### **Running the Project Locally**

This is the client-side repository for the Be News App.

[Backend API](https://github.com/dudleyspence/be-news-api)  
Ensure the backend is running locally at `http://localhost:5000` or on the deployed server before starting the frontend.

Start the development server with the following command:

`npm run dev` 

Access the app at `http://localhost:3000` in your browser.

----------

### **Related Projects**
<div width="100%">
<a href="https://github.com/dudleyspence/TrailTalk" align="left"><img align="left" width="45%" src="https://github-readme-stats.vercel.app/api/pin/?username=dudleyspence&repo=TrailTalk&title_color=0891b2&text_color=ffffff&icon_color=0891b2&bg_color=0f172a&hide_border=true&locale=en" /></a><div/>


## **Future Enhancements**

-   **Drag and drop image uploads**: For both Articles and Profile Avatars the user will have the ability to drag and drop files instead of the currrent image URL.
-   **Enhanced Article Interactions**: Add features like article bookmarking or sharing.
-   **Improved UI/UX**: Refine styling for a more immersive user experience.

----------

## **Contributing**

Contributions are welcome! Feel free to fork the repository and submit pull requests with your improvements.

----------

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.
