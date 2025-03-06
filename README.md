# 🎬 Movie Search App

A modern, responsive web application built with Next.js that allows users to search for movies and view detailed information using the OMDB API. Features real-time search suggestions as you type and comprehensive movie details in an elegant UI.

Movie Search App Screenshot (https://i.postimg.cc/GtFj48tT/movie-search.png) 

## 🌟 Features

- **Real-time Search Suggestions**: See movie matches instantly as you type
- **Comprehensive Movie Details**: View plots, casts, ratings, and more
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Server-side API Integration**: Secure handling of API requests
- **Modern UI**: Clean interface with loading states and error handling
- **Performance Optimized**: Debounced search to minimize API calls

## 🚀 Live Demo

[View the live application](https://movie-search-web-sigma.vercel.app/)

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **API**: OMDB API for movie data
- **State Management**: React Hooks
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18.x or later
- npm or yarn
- OMDB API key

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Emeka-Okpaleke/movie-search.git
   cd movie-search
   
2. **Install dependencies**
   ```bash
   npm install

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   OMDB_API_KEY=your_api_key_here
   
5. **Run the development server**
   ```bash
   npm run dev

## 🔑 Getting an OMDB API Key

1. Visit [OMDB API Key Page](http://www.omdbapi.com/apikey.aspx)
2. Select the FREE tier (1,000 daily limit)
3. Fill in the form with your email and "Educational" as the purpose
4. Check your email for the API key activation link
5. Add the key to your `.env.local` file

## 📱 Usage

1. Type a movie title in the search box
2. See real-time suggestions appear as you type
3. Click on a suggestion or press Enter to search
4. Browse through search results
5. Click on a movie to view detailed information

## 🙏 Acknowledgements

- [OMDB API](http://www.omdbapi.com/) for providing the movie data  
- [Next.js](https://nextjs.org/) for the amazing React framework  
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework  
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components

Made by **Olisemeka Okpaleke**

