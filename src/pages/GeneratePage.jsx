import * as React from 'react';

import { Autocomplete, TextField, Checkbox, ThemeProvider, ListItem, ListItemText, ListItemIcon, List, Modal, Button, FormGroup, FormControlLabel } from "@mui/material";
import { createTheme } from '@mui/material/styles';

import moment from 'moment/moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import styles from "../assets/pages/GeneratePage.module.css";

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



// TODO
// DUPLICATION CHECK
const GeneratePage = () => {
    const [tab, setTab] = React.useState("module");
    const [activityModule, setActivityModule] = React.useState("");
    const [activityActivities, setActivityActivities] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [activities, setActivities] = React.useState([
        "Lecture",
        "Tutorial",
        "Exercise",
        "Lab Session",
        "Workshop",
        "Experiment",
    ])
    const [activityName, setActivityName] = React.useState("")
    const [checked, setChecked] = React.useState([]);
    const [userInput, setUserInput] = React.useState({
        umodules: {},
        activities: {},
        lecturers: {},
        rooms: {},
    })
    const [umodule, setUModule] = React.useState(
        {
            id: "",
            studentNo: 1,
            activities: []
        }
    )
    const [moduleID, setModuleID] = React.useState("")
    const [studentNo, setStudentNo] = React.useState(1)
    const [modules, setModules] = React.useState([])

    const [startTime, setStartTime] = React.useState(moment({ hour: 9, minute: 0 }));
    const [endTime, setEndTime] = React.useState(moment({ hour: 10, minute: 0 }));

    const startTimeHandler = (newValue) => {
        setStartTime(newValue);
    };

    const endTimeHandler = (newValue) => {
        setEndTime(newValue);
    };

    // Set module id in activity tab
    const activityModuleHandler = (value) => {
        setActivityModule(value)
        setActivityActivities(userInput.umodules[value].activities)
    }

    // STATE: open handler
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // STATE: activityName handler
    const activityNameHandler = (event) => {
        setActivityName(event.target.value);
    }

    /**
     * Checkbox handler
     * STATE: umodule
     * @param {String} value 
     */
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        setUModule(
            {
                ...umodule,
                "activities": [...newChecked]
            }
        )
    };

    const addNewActivity = (value) => {
        setOpen(false);

        setActivities([...activities, value]);

        handleToggle(value);
    }

    const moduleIDHandler = (value) => {
        setModuleID(value)
        setUModule({
            ...umodule,
            id: value,
        })
    }

    const studentNoHandler = (value) => {
        setStudentNo(value * 1)
        setUModule({
            ...umodule,
            studentNo: value * 1,
        })
    }

    const addModule = () => {

        setUserInput(
            {
                ...userInput,
                umodules: {
                    ...userInput.umodules,
                    [umodule.id]: umodule
                }
            }
        )
        console.log(umodule);


        setUModule(
            {
                id: "",
                studentNo: 0,
                activities: []
            }
        )
        setModuleID("")
        setStudentNo(1)
        setChecked([]);
        setModules([
            ...modules,
            { label: umodule.id }
        ])
    }

    const tabContentHandler = () => {
        switch (tab) {
            case 'module':
                return <div className={styles.listWithInputContainer}>
                    <div className={styles.inputContainer}>
                        <ThemeProvider theme={theme}>
                            <TextField
                                color="gray"
                                required
                                id="standard-required"
                                label="Module ID"
                                variant="standard"
                                className={styles.input}
                                margin="normal"
                                value={moduleID}
                                onChange={(event) => moduleIDHandler(event.target.value)}
                            />
                            <TextField
                                color="gray"
                                required
                                id="standard-required"
                                type="number"
                                onInput={(e) => {
                                    e.target.value = e.target.value < 1 ? 1 : e.target.value
                                }}
                                label="Number of Students"
                                variant="standard"
                                className={styles.input}
                                margin="normal"
                                value={studentNo}
                                onChange={(event) => studentNoHandler(event.target.value)}
                            />
                        </ThemeProvider>






                    </div>
                    <List
                        sx={{
                            width: 400,
                            height: 230,
                            bgcolor: '#F8F8F8',
                            overflow: 'auto',
                        }}
                        dense
                        component="div"
                        role="list"
                    >
                        {activities.map((value) => {
                            const labelId = `transfer-list-all-item-${value}-label`;

                            return (
                                <ListItem
                                    key={value}
                                    role="listitem"
                                    button
                                    onClick={() => handleToggle(value)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={checked.indexOf(value) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                            sx={{
                                                color: 'black',
                                                '&.Mui-checked': {
                                                    color: 'black',
                                                },
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={value} />
                                </ListItem>
                            );
                        })}

                        <ListItem
                            role="listitem"
                            button
                            onClick={handleOpen}
                        >
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText id="AddNew" primary="Add new Activity" />
                        </ListItem>
                        <Modal
                            open={open}
                            onClose={handleClose}
                        >
                            <div className={styles.modal}>
                                <ThemeProvider theme={theme}>
                                    <TextField
                                        color="gray"
                                        required
                                        id="standard-required"
                                        label="Name for new Activity"
                                        variant="standard"
                                        className={styles.input}
                                        onChange={activityNameHandler}
                                    />
                                </ThemeProvider>
                                <div className={styles.buttonContainer}>
                                    <ThemeProvider theme={theme}>

                                        <Button
                                            color="gray"
                                            className={styles.closeButton}
                                            onClick={handleClose}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            color="gray"
                                            className={styles.addButton}
                                            variant="contained"
                                            onClick={() => addNewActivity(activityName)}
                                        >
                                            Add
                                        </Button>
                                    </ThemeProvider>

                                </div>
                            </div>

                        </Modal>
                        {/* <ListItem /> */}
                    </List>
                </div>
            case 'activity':
                return <div className={styles.activityInputContainer}>
                    <div className={styles.inputContainer}>
                        <ThemeProvider theme={theme}>
                            <Autocomplete
                                required
                                disableClearable

                                id="standard-required"
                                variant="standard"
                                className={styles.input}
                                options={modules}
                                renderInput={(params) => <TextField color="gray" variant='standard'{...params} label="Module ID" />}
                                onInputChange={(event, newInputValue) => {
                                    activityModuleHandler(newInputValue);
                                }}
                            />
                        </ThemeProvider>
                        {/* This part has to be erased */}
                        <div />
                        {/*  */}
                        <ThemeProvider theme={theme}>
                            <Autocomplete
                                required
                                disableClearable

                                id="standard-required"
                                variant="standard"
                                className={styles.input}
                                options={activityActivities}
                                renderInput={(params) => <TextField color="gray" variant='standard'{...params} label="Activity" />}
                            />
                        </ThemeProvider>
                        <div className={styles.timePicker}>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <TimePicker
                                    label="Start Time"
                                    value={startTime}
                                    onChange={startTimeHandler}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                                <TimePicker
                                    label="End Time"
                                    value={endTime}
                                    onChange={endTimeHandler}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className={styles.dayPicker}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }} />} label="Monday" />
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }} />} label="Tuesday" />
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }} />} label="Wednesday" />
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }} />} label="Thursday" />
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }} />} label="Sunday" />
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }} />} label="Friday" />
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }} />} label="Saturday" />
                        </FormGroup>
                    </div>
                </div >
            case 'lecturer':
                return <div className={styles.inputContainer}>
                    <ThemeProvider theme={theme}>
                        <TextField
                            color="gray"
                            required
                            id="standard-required"
                            label="Name"
                            variant="standard"
                            className={styles.input}
                        />
                    </ThemeProvider>
                    <div>

                    </div>
                </div>
            case 'room':
                return <div className={styles.inputContainer}>
                    <ThemeProvider theme={theme}>
                        <TextField
                            color="gray"
                            required
                            id="standard-required"
                            label="Name"
                            variant="standard"
                            className={styles.input}
                        />
                    </ThemeProvider>
                    <div>

                    </div>
                </div>
            default:
                return null
        }
    }

    const tabHandler = (tabToMove) => {
        setTab(tabToMove)
    }

    return (
        <div>
            <div className={styles.container}>

                <div
                    className={tab === 'module' ? styles.containerHeader1Active : styles.containerHeader1}
                    onClick={() => tabHandler('module')}
                >
                    Module (Class)
                </div>

                <div
                    className={tab === 'activity' ? styles.containerHeader2Active : styles.containerHeader2}
                    onClick={() => tabHandler('activity')}
                >
                    Activity
                </div>

                <div
                    className={tab === 'lecturer' ? styles.containerHeader3Active : styles.containerHeader3}
                    onClick={() => tabHandler('lecturer')}
                >
                    Lecturer (Staff)
                </div>

                <div
                    className={tab === 'room' ? styles.containerHeader4Active : styles.containerHeader4}
                    onClick={() => tabHandler('room')}
                >
                    Room
                </div>

                {tabContentHandler()}

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
            </div>

            {/* <div className={styles.container}>
                <div className={styles.containerHeader}>
                    Activity
                </div>
                <div className={styles.inputContainer}>
                    <ThemeProvider theme={theme}>
                        <Autocomplete
                            required
                            disableClearable

                            id="standard-required"
                            variant="standard"
                            className={styles.input}
                            options={modules}
                            renderInput={(params) => <TextField color="gray" variant='standard'{...params} label="Module ID" />}
                        />
                    </ThemeProvider>
                    <div>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.containerHeader}>
                    Lecturer (Staff)
                </div>
                <div className={styles.inputContainer}>
                    <ThemeProvider theme={theme}>
                        <TextField
                            color="gray"
                            required
                            id="standard-required"
                            label="Name"
                            variant="standard"
                            className={styles.input}
                        />
                    </ThemeProvider>
                    <div>

                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.containerHeader}>
                    Room
                </div>
                <div className={styles.inputContainer}>
                    <ThemeProvider theme={theme}>
                        <TextField
                            color="gray"
                            required
                            id="standard-required"
                            label="Name"
                            variant="standard"
                            className={styles.input}
                        />
                    </ThemeProvider>
                    <div>

                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default GeneratePage;