import React from "react";
import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import { Button, IconButton } from "@mui/material";
import { Home, Leaderboard, LightMode, DarkMode } from "@mui/icons-material";
import Link from 'next/link';

const Header = ({ toggleFunc, darkMode }) => {

    const [mode, setMode] = React.useState(darkMode);

    const handleToggle = () => {
        if (toggleFunc) {
            setMode(!mode);
            toggleFunc();
        }
    }

    return (
        //<header className={`${mode ? styles.dark : styles.white} ${styles.head}`}>
        <header className={mode ? styles.white : styles.dark}>
            <div className={styles.head}>
                <div className={styles.branding}>
                    <Image
                        src="/tmp-logo.svg"
                        alt="Logo"
                        width={30}
                        height={30}
                        className={styles.logo}
                    />
                    <h1>VirtualMinds</h1>
                </div>
                <div className={styles.title}>
                    <h1>MonkeyScript</h1>
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
                {toggleFunc && <div className={styles.toggle}>
                    <IconButton onClick={handleToggle}>
                        {mode ? <LightMode /> : <DarkMode />}
                    </IconButton>
                </div>}
                </div>
            </div>
        </header >
    );
}

export default Header;