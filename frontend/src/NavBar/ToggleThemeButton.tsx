import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { Button } from 'react-bootstrap';

export default function toggleThemeButton({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) {
    return (
        <Button
            variant='outline-light'
            onClick={toggleTheme}
            style={{ marginRight: "10px" }}
        >
            {theme === "light" ? <LightModeOutlinedIcon /> : <DarkModeRoundedIcon />}
        </Button>
    );
}