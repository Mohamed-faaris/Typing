import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (username.trim() !== '') {
                // Username is valid
            } else {
                alert('You can\'t enter without Username 😒');
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '') {
            setError('Username cannot be empty');
            return;
        }
        localStorage.setItem('username', username);
        navigate('/test');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
            <form 
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">
                    Welcome to Typing Speed Test
                </h2>
                {error && (
                    <p className="text-red-500 text-center text-sm">{error}</p>
                )}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                    onKeyUp={handleKeyPress}
                />
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition"
                >
                    Start Test
                </button>
                <Link
                    to="/leaderboard"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded text-center transition"
                >
                    View Leaderboard
                </Link>
            </form>
        </div>
    );
};

export default Home;