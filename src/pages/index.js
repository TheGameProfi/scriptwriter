import React, { useEffect, useState, useRef } from "react";
import Header from "@/components/Header";
import getText from "@/data/sentences";
import styles from "@/styles/gamefield.module.css";
import { Button, ButtonGroup } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


export default function Game() {

    const [text, setText] = useState("");

    useEffect(() => {
        setText(getText());
    }, []);

    const [inputText, setInputText] = useState("");
    const [isFinished, setIsFinished] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const myInterval = useRef();
    const [countdown, setCountdown] = useState(5);
    const [prevCountdown, setPrevCountdown] = useState(countdown);
    const [correctLetters, setCorrectLetters] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    var counter = null;

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                document.querySelector('input').focus(); // Step 3: Focus the input on Enter press
            }
        };

        window.addEventListener("keydown", handleKeyDown); // Step 2: Add event listener

        return () => {
            window.removeEventListener("keydown", handleKeyDown); // Remove event listener on cleanup
        };
    }, []);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
        if (inputText.length >= text.length) {
            continueGame();
        }
    };

    function newGame() {
        console.log("newGame");
        console.log(isFinished);
        setText(getText());
        setInputText("");
        setIsFinished(false);
        pauseGame();
        setCountdown(30);
        setPrevCountdown(countdown)
    }

    function restartGame() {
        console.log("restartGame");
        console.log(isFinished);
        setInputText("");
        setIsFinished(false);
        pauseGame();
        setCountdown(30);
        setPrevCountdown(countdown)
    }

    function continueGame() {
        setText(getText());
        setInputText("");
    }

    function pauseGame() {
        setIsFocused(false);
    }

    useEffect(() => {
        if (isFocused) {
            myInterval.current = setInterval(
                () => setCountdown((countdown) => countdown - 1),
                1000
            );
        } else {
            clearInterval(myInterval.current);
            myInterval.current = null;
        }
    }, [isFocused]);

    useEffect(() => {
        if (countdown == 0) {
            setCountdown(30);
            finishGame();
        }
    }, [countdown]);

    function finishGame() {
        setIsFocused(false);
        document.querySelector('input').blur();
        countWords();
        countLetters();
        setIsFinished(true);
        alert("Time's up!");
    }

    function countWords() {
        var tmpWords = 0
        var templateWords = text.split(" ");
        var inputWords = inputText.split(" ");
        for (var i = 0; i < templateWords.length && i < inputWords.length; i++) {
            if (templateWords[i] == inputWords[i]) {
                tmpWords++;
            }
        }
        setCorrectWords(tmpWords);
    }
    function countLetters(){
        var tmpLetters = 0
        for (var i = 0; i < text.length && i < inputText.length; i++) {
            if (text[i] == inputText[i]) {
                tmpLetters++;
            }
        }
        setCorrectLetters(tmpLetters);
    }

    return (
        <div>
            <Header />
            <div className={styles.typeField}>
                <h1>Game</h1>
                <br />

                <div
                    className={`${!isFocused ? styles.blur : ''} ${styles.typeBox}`}
                    style={{ color: 'grey', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
                    onClick={() => document.querySelector('input').focus()}
                    onDragStart={(e) => e.preventDefault()}
                    onContextMenu={(e) => e.preventDefault()}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseUp={(e) => e.preventDefault()}
                    onMouseMove={(e) => e.preventDefault()}
                    onMouseEnter={(e) => e.preventDefault()}
                    onMouseLeave={(e) => e.preventDefault()}
                    onMouseOver={(e) => e.preventDefault()}
                    onMouseOut={(e) => e.preventDefault()}
                    onTouchStart={(e) => e.preventDefault()}
                    onTouchMove={(e) => e.preventDefault()}
                    onTouchEnd={(e) => e.preventDefault()}
                    onTouchCancel={(e) => e.preventDefault()}
                >
                    <div className={styles.timer}>
                        <h2>{countdown}</h2>
                    </div>
                    {text.split("").map((letter, index) => (
                        <span
                            key={index}
                            style={{ color: inputText[index] ? letter === inputText[index] ? "white" : "red" : "grey" }}
                        >
                            {isFocused && index === inputText.length && <span className={styles.cursor}>.</span>}
                            <span style={{ position: 'relative' }}>
                                {index < inputText.length && inputText[index] != letter && letter == ' ' ? '_' : letter}
                            </span>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={(e) => {
                        if (e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowUp" || e.key == "ArrowDown" || e.key === 0 || e.ctrlKey || e.metaKey) {
                            e.preventDefault();
                        }
                    }}
                    style={{ opacity: 0 }}
                    autoFocus={false}
                />
                {!isFocused && <div className={styles.unactive} onClick={() => document.querySelector('input').focus()}>
                    <p>Press Enter or Click the box to start typing...</p>
                    <br />
                    <ButtonGroup variant='contained' aria-label="Basic button group">
                    <Button onClick={() => restartGame()} color='warning' startIcon={<RestartAltIcon />}>Restart</Button>
                    <Button onClick={() => newGame()} color='error' endIcon={<PlayArrowIcon />}>New Game</Button>
                    </ButtonGroup>
                </div>}
                {isFinished &&
                    <div className={styles.finished}>
                        <p>Game Over!</p>
                        <div className={styles.statTable}>
                            <div>
                                <p>Your score:</p>
                                <p>{correctLetters}</p>
                            </div>
                            <div>
                                <p>Your accuracy:</p>
                                <p>{Math.floor((inputText.length / text.length) * 100)}%</p>
                            </div>
                            <div>
                                <p>Your speed:</p>
                                <p>{inputText.length == 0 ? 0 : Math.floor((inputText.split(" ").length/ prevCountdown) * 60)} WPM</p>
                            </div>
                        </div>
                        <br />
                        <Button onClick={() => restartGame()} color='warning' variant='contained' startIcon={<RestartAltIcon />}>Restart</Button>
                        <Button onClick={() => newGame()} variant='contained' color='success' endIcon={<PlayArrowIcon />} style={{margin: '10px'}}>Next</Button>
                    </div>
                }
            </div>

        </div>
    );
}