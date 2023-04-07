import { Link } from "react-router-dom";

import { Button, ThemeProvider } from "@mui/material";
import { createTheme } from '@mui/material/styles';

import styles from '../../assets/components/Header/Header.module.css';
import { useLocation } from "react-router-dom";

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        gray: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

const Header = () => {
    const location = useLocation();
    // console.log(location)
    return (
        <div className={styles.header}>
            <div className={styles.buttonContainer}>
                <ThemeProvider theme={theme}>
                    <Button color="gray" className={styles.button}>
                        <Link to="/" className={styles.link}>Home</Link>
                    </Button>
                    <Button color="gray" className={styles.button}>
                        <Link to="/edit" className={styles.link}>Edit</Link>
                    </Button>
                    <Button color="gray" className={styles.button}>
                        <Link to="/solution" className={styles.link}>Solution</Link>
                    </Button>

                    <Button color="gray" className={styles.button}>
                        <Link to="/generate" className={styles.link}>Generate</Link>
                    </Button>
                </ThemeProvider>
            </div>
        </div>
    )
};

export default Header;