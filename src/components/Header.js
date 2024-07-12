import React from "react";
import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import { Button, IconButton } from "@mui/material";
import { Home, Leaderboard, LightMode, DarkMode } from "@mui/icons-material";
import Link from 'next/link';

const Header = ({ toggle, darkMode, toggleDarkMode }) => {

    return (
        <header className={darkMode ? styles.dark : styles.white}>
            <div className={styles.head}>
                <div className={styles.branding}>
                    <Image
                        src={`/thecfu-logo-${darkMode ? 'dark' : 'light'}.svg`}
                        alt="Logo"
                        width={40}
                        height={40}
                        className={styles.logo}
                    />
                    <h1>The CfU</h1>
                </div>
                <div className={styles.title}>
                    <h1>ScriptWriter</h1>
                </div>
                <div className={styles.endofhead}>
                <div className={styles.nav}>
                    <Link href="/">
                        <Button variant="text" color="primary" startIcon={<Home />}>Home</Button>
                    </Link>
                    <Link href="/leaderboard">
                        <Button variant="text" color="primary" startIcon={<Leaderboard />}>Leaderboard</Button>
                    </Link>
                </div>
                {toggle && <div className={styles.toggle}>
                    <IconButton onClick={toggleDarkMode}>
                        {darkMode ? <DarkMode /> : <LightMode />}
                    </IconButton>
                </div>}
                </div>
            </div>
        </header >
    );
}

export default Header;