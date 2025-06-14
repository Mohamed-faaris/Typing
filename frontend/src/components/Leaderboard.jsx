import React, { useState, useEffect } from 'react';
import axios from 'axios';
import goldTrophy from '../assets/gold-trophy.png';
import silverTrophy from '../assets/silver-trophy.png';
import bronzeTrophy from '../assets/bronze-trophy.png';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://localhost:5000/results');
                const sortedData = response.data.sort((a, b) => b.WPM - a.WPM);
                setLeaderboard(sortedData);
            } catch (err) {
                console.error('Error fetching leaderboard:', err);
            }
        };

        fetchLeaderboard();
    }, []);

    const getTrophyImage = (rank) => {
        switch (rank) {
            case 1:
                return goldTrophy;
            case 2:
                return silverTrophy;
            case 3:
                return bronzeTrophy;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-yellow-50 to-purple-100 py-10">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <div className="flex justify-end mb-4 gap-4">
                    <button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded transition"
                        onClick={() => window.location.href = '/test'}
                    >
                        Back to Test
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded transition"
                        onClick={() => {
                            localStorage.removeItem('username');
                            window.location.href = '/';
                        }}
                    >
                        Logout
                    </button>
                </div>
                <h2 className="text-3xl font-bold text-center text-purple-700 mb-8 flex items-center justify-center gap-2">
                    🏆 Leaderboard
                </h2>
                <ul className="divide-y divide-gray-200">
                    {leaderboard.map((entry, index) => (
                        <li
                            key={index}
                            className="flex flex-col md:flex-row items-center justify-between py-4 px-2"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-xl font-semibold text-gray-700">
                                    #{index + 1}
                                </span>
                                {getTrophyImage(index + 1) && (
                                    <img
                                        src={getTrophyImage(index + 1)}
                                        alt={`Trophy for rank ${index + 1}`}
                                        className="w-8 h-8"
                                    />
                                )}
                                <span className="font-medium text-purple-600">
                                    {entry.username}
                                </span>
                            </div>
                            <div className="flex flex-col md:flex-row gap-2 md:gap-6 mt-2 md:mt-0 text-gray-600 text-sm">
                                <span>
                                    <span className="font-semibold">WPM:</span> {entry.WPM}
                                </span>
                                <span>
                                    <span className="font-semibold">CPM:</span> {entry.CPM}
                                </span>
                                <span>
                                    <span className="font-semibold">Mistakes:</span> {entry.mistakes}
                                </span>
                                
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Leaderboard;