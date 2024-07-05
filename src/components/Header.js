import React from "react";
import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import { Button } from "@mui/material";
import { Home, Leaderboard } from "@mui/icons-material";
import Link from 'next/link';

export default function Header() {
    return (
        <header className={styles.head}>
            <div className={styles.title}>
                <h1>MonkeyScript</h1>
            </div>
            <div className={styles.nav}>
                <Link href="/">
                    <Button variant="text" color="primary" startIcon={<Home />}>Home</Button>
                </Link>
                <Link href="/leaderboard">
                    <Button variant="text" color="primary" startIcon={<Leaderboard />}>Leaderboard</Button>
                </Link>
            </div>
        </header >
    );
}