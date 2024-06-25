import React, {useEffect, useState} from "react";
import Header from "@/components/Header";
import getText from "@/data/sentences";
import styles from "@/styles/gamefield.module.css";



export default function Game() {

    const [text, setText] = useState("");

    useEffect(() => {
        setText(getText());
    }, []);

    const [inputText, setInputText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

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
            newGame();
        }
    };

    function newGame(){
        setText(getText());
        setInputText("");
    }

    return (
        <div>
            <Header />
            <div className={styles.typeField}>
                <h1>Game</h1>
                <br />
                <div
                    className={!isFocused ? styles.blur : null}
                    style={{ color: 'grey', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
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
                        if (e.key == "ArrowLeft" || e.key == "ArrowRight" || e.key == "ArrowUp" || e.key == "ArrowDown" || e.key === 0) {
                            e.preventDefault();
                        }
                    }}
                    style={{ opacity: 0 }}
                    autoFocus={false}
                />
                {!isFocused && <div className={styles.unactive} onClick={() => document.querySelector('input').focus()}>
                    <p>Press Enter or Click the box to start typing...</p>
                </div>}
            </div>
            
        </div>
    );
}