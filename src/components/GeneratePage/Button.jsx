
import {
    Button,
    ThemeProvider
} from "@mui/material";

import styles    from "../../assets/pages/GeneratePage.module.css";
import { theme } from "../../utils/theme";

export const AddModuleButton = ({ addModule }) => (
    <ThemeProvider theme={theme}>
      <Button
        className={styles.containerAddButton}
        color="gray"
        variant="contained"
        onClick={addModule}
      >
        Add
      </Button>
    </ThemeProvider>
);

export const ResetButton = ({ resetInputButton }) => (
    <ThemeProvider theme={theme}>
      <Button
        className={styles.containerResetButton}
        color="gray"
        variant="contained"
        onClick={resetInputButton}
      >
        Reset
      </Button>
    </ThemeProvider>
);
  
export const ImportButton = ({ importModalHandleOpen }) => (
    <ThemeProvider theme={theme}>
      <Button
        className={styles.containerImportButton}
        color="gray"
        variant="contained"
        onClick={importModalHandleOpen}
      >
        Import
      </Button>
    </ThemeProvider>
);

export const ExportButton = ({ exportJson }) => (
    <ThemeProvider theme={theme}>
      <Button
        className={styles.containerExportButton}
        color="gray"
        variant="contained"
        onClick={exportJson}
      >
        Export
      </Button>
    </ThemeProvider>
);