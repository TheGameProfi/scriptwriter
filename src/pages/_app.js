import "@/styles/globals.css";
import { useState, useEffect, useMemo } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function App({ Component, pageProps }) {

  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setDarkMode(e.matches);
    }

    mediaQuery.addEventListener('change', handleChange);
    setDarkMode(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </ThemeProvider>
  );
}
