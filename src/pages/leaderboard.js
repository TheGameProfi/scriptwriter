import React from "react";
import styles from '@/styles/Leaderboard.module.css';
import Header from "@/components/Header";

export default function Leaderboard({ scores }) {
    // Sort the scores array in descending order based on the score property
    const sortedData = scores.sort((a, b) => b.score - a.score);

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

export async function getServerSideProps() {
    // Fetch data from API
    const res = await fetch('http://localhost:3000/api/score', {
        method: 'GET'
    }) // Replace with your API endpoint

    if (!res.ok) {
        console.error('Failed to fetch scores');
        return {
            props: {
                scores: [],
            },
        };
    }

    const scores = await res.json();

    return {
        props: {
            scores,
        },
    };
}
