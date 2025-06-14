// Dmitri's Typing
//
// Dmitri's Typing is a modern, interactive web application designed to help users improve their typing speed and accuracy. Built with React and Tailwind CSS, the site offers a clean and responsive interface for practicing typing, tracking progress, and competing on a global leaderboard.
//
// Features:
// - User login with a simple username (no registration required)
// - Real-time typing test with instant feedback on accuracy (green/red highlights)
// - WPM (Words Per Minute), CPM (Characters Per Minute), mistakes, and duration tracking
// - Upload your own text files for custom typing practice
// - Leaderboard to compare your scores with others
// - Beautiful, accessible, and mobile-friendly design
//
// Dmitri's Typing is perfect for students, professionals, and anyone who wants to have fun while improving their typing skills!
//
// Created by Dmitri, 2025

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
            <div className="bg-purple-50 border border-purple-200 rounded-lg shadow p-4 mb-8 text-center w-full max-w-4xl">
                <h1 className="text-3xl font-bold text-purple-700 mb-2">Dmitri's Typing</h1><br /><br />
                <p className="text-gray-700 mb-2">Dmitri's Typing is a modern, interactive web application designed to help users improve their typing speed and accuracy. Built with React and Tailwind CSS, the site offers a clean and responsive interface for practicing typing, tracking progress, and competing on a global leaderboard.</p>
                <ul className="text-left text-gray-700 list-disc list-inside mb-2"><br />   
                    <li>User login with a simple username (no registration required)</li>
                    
                    <li>WPM (Words Per Minute), CPM (Characters Per Minute), mistakes, and duration tracking</li>
                    <li>Upload your own text files for custom typing practice</li>
                    <li>Leaderboard to compare your scores with others</li>
                    
                </ul><br />
                <br />
                <strong>
                <p className="text-gray-600 italic">Perfect for students, professionals, and anyone who wants to have fun while improving their typing skills!</p>
                <p className="text-xs text-gray-400 mt-2">Created by Dmitri, 2025</p>
                </strong>
                <button
                    className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition"
                    onClick={() => navigate('/login')}
                >
                    Log In
                </button>
            </div>
        </div>
    );
};

export default Home;