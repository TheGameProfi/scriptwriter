import React from "react";
import Data from '@/data/scores.json';
import styles from '@/styles/Leaderboard.module.css';
import Header from "@/components/Header";

export default function Leaderboard() {
    // Sort the scores array in descending order based on the score property
    const sortedData = Data.sort((a, b) => b.score - a.score);

    return (
        <div>
            <Header />
            <div className={styles.leaderboard}>
                <div className={styles.container}>
                    <h1>Leaderboard</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Score</th>
                                <th>Accuracy</th>
                                <th>Speed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedData.map((score, index) => (
                                <tr key={index}>
                                    <td>{score.username}</td>
                                    <td>{score.score}</td>
                                    <td>{score.accuracy}</td>
                                    <td>{score.speed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}