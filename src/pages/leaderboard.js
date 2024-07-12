import { useState, useEffect } from "react";
import styles from '@/styles/Leaderboard.module.css';
import Header from "@/components/Header";
import { DataGrid } from '@mui/x-data-grid';
import Skeleton from '@mui/material/Skeleton';
import { Alert, AlertTitle, Button } from "@mui/material";

export default function Leaderboard({ darkMode }) {

    const [scores, setScores] = useState([]);
    const [error, setError] = useState(false);
    const [errorCount, setErrorCount] = useState(0);

    const fetchScores = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/score', {
                method: 'GET'
            });

            if (!res.ok) {
                console.error('Failed to fetch scores');
                setError(true);
                return;
            }

            const scores = await res.json();
            setError(false);
            setErrorCount(0);
            setScores(scores);
        } catch (error) {
            setError(true);
            console.error('Failed to fetch scores:', error);
        }
    };

    useEffect(() => {
        fetchScores();
    }, []);

    // Sort the scores array in descending order based on the score property
    const columns = [
        { field: 'username', headerName: 'Username', width: 200, headerClassName: styles.centeredHeader, cellClassName: styles.centeredCell, headerAlign: 'center' },
        { field: 'score', headerName: 'Score', width: 150, headerClassName: styles.centeredHeader, cellClassName: styles.centeredCell, headerAlign: 'center' },
        { field: 'accuracy', headerName: 'Accuracy', width: 150, headerClassName: styles.centeredHeader, cellClassName: styles.centeredCell, headerAlign: 'center' },
        { field: 'speed', headerName: 'Speed', width: 150, headerClassName: styles.centeredHeader, cellClassName: styles.centeredCell, headerAlign: 'center' },
    ];

    return (
        <div>
            <div className={styles.bg}>
                <Header toggle={false} darkMode={darkMode} />
                <div className={styles.leaderboard}>
                    <h1>Leaderboard</h1>
                    {
                        error && errorCount >= 5 && <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => window.location.reload()}>Reload Page</Button>}> <AlertTitle>Error</AlertTitle> Failed to fetch Scores after 5 tries. <br /> Reload or try again later! </Alert> ||
                        error && <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => setErrorCount(errorCount + 1) && fetchScores()}>Retry</Button>}> <AlertTitle>Error</AlertTitle> Failed to fetch the Scores </Alert> ||
                        scores.length === 0 && <Skeleton variant="rectangular" width={"100%"} height={200} /> ||
                        scores.length > 0 && <DataGrid
                            rows={scores}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 20, 30]}
                        />
                    }
                </div>
            </div>
        </div>
    );
}