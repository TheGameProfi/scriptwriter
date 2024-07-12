import React from "react";
import styles from '@/styles/Leaderboard.module.css';
import Header from "@/components/Header";
import { DataGrid } from '@mui/x-data-grid';

export default function Leaderboard({ scores, darkMode }) {
    // Sort the scores array in descending order based on the score property
    const columns = [
        { field: 'username', headerName: 'Username', width: 200, headerClassName: styles.centeredHeader, cellClassName: styles.centeredCell, headerAlign: 'center'},
        { field: 'score', headerName: 'Score', width: 150, headerClassName: styles.centeredHeader, cellClassName: styles.centeredCell, headerAlign: 'center'},
        { field: 'accuracy', headerName: 'Accuracy', width: 150, headerClassName: styles.centeredHeader, cellClassName: styles.centeredCell, headerAlign: 'center'},
        { field: 'speed', headerName: 'Speed', width: 150, headerClassName: styles.centeredHeader, cellClassName: styles.centeredCell, headerAlign: 'center'},
    ];

    return (
        <div>
            <div className={styles.bg}>
                <Header toggle={false} darkMode={darkMode} />
                <div className={styles.leaderboard}>
                    <h1>Leaderboard</h1>
                    <DataGrid
                        rows={scores}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 20, 30]}
                    />
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
