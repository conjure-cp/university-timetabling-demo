import * as React from 'react';

import { Autocomplete, TextField, Checkbox, ThemeProvider, ListItem, ListItemText, ListItemIcon, List, Modal, Button, FormGroup, FormControlLabel } from "@mui/material";
import { createTheme } from '@mui/material/styles';

import moment from 'moment/moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import styles from "../assets/pages/GeneratePage.module.css";

/**
 * Color theme for the components
 */
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



/**
 * View for Generate Page .../generate
 * @returns Generate Page
 */
const GeneratePage = () => {
    const [tab, setTab] = React.useState("module");
    const [activityModule, setActivityModule] = React.useState("");
    const [activityActivities, setActivityActivities] = React.useState([]);
    const [activityActivity, setActivityActivity] = React.useState([]);
    const [activityDuration, setActivityDuration] = React.useState();
    const [activityDays, setActivityDays] = React.useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    })
    const [open, setOpen] = React.useState(false);
    const [activities, setActivities] = React.useState([
        "Lecture",
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
    const [userInputActivity, setUserInputActivity] = React.useState({
        activityModule: {},
        activity: "",
        duration: 0,
        days: {}
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

    const [prefStartTime, setPrefStartTime] = React.useState(
        {
            monday: moment({ hour: 9, minute: 0 }),
            tuesday: moment({ hour: 9, minute: 0 }),
            wednesday: moment({ hour: 9, minute: 0 }),
            thursday: moment({ hour: 9, minute: 0 }),
            friday: moment({ hour: 9, minute: 0 }),
            saturday: moment({ hour: 9, minute: 0 }),
            sunday: moment({ hour: 9, minute: 0 })
        }
    )

    const [prefEndTime, setPrefEndTime] = React.useState(
        {
            monday: moment({ hour: 9, minute: 0 }),
            tuesday: moment({ hour: 9, minute: 0 }),
            wednesday: moment({ hour: 9, minute: 0 }),
            thursday: moment({ hour: 9, minute: 0 }),
            friday: moment({ hour: 9, minute: 0 }),
            saturday: moment({ hour: 9, minute: 0 }),
            sunday: moment({ hour: 9, minute: 0 })
        }
    )

    const [unavailableStartTime, setUnavailableStartTime] = React.useState(
        {
            monday: moment({ hour: 9, minute: 0 }),
            tuesday: moment({ hour: 9, minute: 0 }),
            wednesday: moment({ hour: 9, minute: 0 }),
            thursday: moment({ hour: 9, minute: 0 }),
            friday: moment({ hour: 9, minute: 0 }),
            saturday: moment({ hour: 9, minute: 0 }),
            sunday: moment({ hour: 9, minute: 0 })
        }
    )

    const [unavailableEndtTime, setUnavailableEndTime] = React.useState(
        {
            monday: moment({ hour: 9, minute: 0 }),
            tuesday: moment({ hour: 9, minute: 0 }),
            wednesday: moment({ hour: 9, minute: 0 }),
            thursday: moment({ hour: 9, minute: 0 }),
            friday: moment({ hour: 9, minute: 0 }),
            saturday: moment({ hour: 9, minute: 0 }),
            sunday: moment({ hour: 9, minute: 0 })
        }
    )

    const [lecturerName, setLecturerName] = React.useState("");
    const [lecturerModule, setLecturerModule] = React.useState("");
    /**
     * Set prefer time (start)
     * @param {*} newValue 
     * @param {*} day 
     */
    const prefStartTimeHandler = (newValue, day) => {
        setPrefStartTime({
            ...prefStartTime,
            [day]: newValue
        })
    }

    /**
     * Set prefer time (end)
     * @param {*} newValue 
     * @param {*} day 
     */
    const prefEndTimeHandler = (newValue, day) => {
        setPrefEndTime({
            ...prefEndTime,
            [day]: newValue
        })
    }

    const unavailableStartTimeHandler = (newValue, day) => {
        setUnavailableStartTime({
            ...unavailableStartTime,
            [day]: newValue
        })
    }

    const unavailableEndTimeHandler = (newValue, day) => {
        setUnavailableEndTime({
            ...unavailableEndtTime,
            [day]: newValue
        })
    }

    // Set module id in activity tab
    const activityModuleHandler = (value) => {
        setUserInputActivity({
            ...userInputActivity,
            activityModule: value
        })
        setActivityModule(value)
        setActivityActivities(userInput.umodules[value].activities)
    }

    const activityActivityHandler = (value) => {
        setUserInputActivity({
            ...userInputActivity,
            activity: value
        })
        setActivityActivity(value)
    }

    const activityDurationHandler = (event) => {
        setUserInputActivity({
            ...userInputActivity,
            duration: event.target.value
        })
        setActivityDuration(event.target.value)
    }

    const setActivityDaysHandler = (event) => {
        setUserInputActivity({
            ...userInputActivity,
            days: {
                ...activityDays,
                [event.target.name]: event.target.checked
            }
        })

        console.log(event.target.name)
        setActivityDays({
            ...activityDays,
            [event.target.name]: event.target.checked
        })

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

    const lecturerModuleHandler = (value) => {
        setUserInputActivity({
            ...userInputActivity,
            lecturerModule: value
        })
        setActivityModule(value)
        setActivityActivities(userInput.umodules[value].activities)
    }

    const addModule = () => {

        switch (tab) {
            case 'module':
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

                alert("Module has been added.\nModule: " + umodule.id + "\nStudent Number: " + umodule.studentNo + "\nActivities: " + umodule.activities);

                setTab('activity');
                break;
            case 'activity':
                setUserInput(
                    {
                        ...userInput,
                        activities: {
                            ...userInput.activities,
                            [activityModule]: userInputActivity
                        }
                    }
                )

                setUserInputActivity(
                    {
                        activityModule: {},
                        activity: "",
                        duration: 0,
                        days: {}
                    }
                )

                setActivityModule("")
                setActivityActivities([])
                setActivityActivity("")
                setActivityDuration()
                setActivityDays({
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                })

                alert(activityActivity + " for " + activityModule + " has been added.\nDuration: " + activityDuration + " (" + activityDuration * 15 + " mins)\nDays: " + activityDays);
                setTab('lecturer');
                break;
            case 'lecturer':
                break;
            case 'room':
                break;
        }

    }


    const tabContentHandler = () => {
        switch (tab) {
            /**
             * Module Tab
             */
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
                    </List>
                </div>

            /**
             * Activity Tab
             */
            case 'activity':
                return <div className={styles.activityInputContainer}>
                    <div className={styles.inputContainer}>
                        <ThemeProvider theme={theme}>
                            <Autocomplete

                                required
                                disableClearable
                                // inputValue={activityModule}

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


                        <ThemeProvider theme={theme}>
                            <Autocomplete
                                required
                                disableClearable

                                id="standard-required"
                                variant="standard"
                                className={styles.input}
                                options={activityActivities}
                                // inputValue={activityActivity}

                                renderInput={(params) => <TextField color="gray" variant='standard'{...params} label="Activity" />}
                                onInputChange={(event, newInputValue) => {
                                    activityActivityHandler(newInputValue);
                                }}
                            />
                        </ThemeProvider>
                        <ThemeProvider theme={theme}>
                            <TextField
                                color="gray"
                                required
                                id="standard-required"
                                label="Duration (15 mins per 1)"
                                variant="standard"
                                type="number"
                                onInput={(e) => {
                                    e.target.value = e.target.value < 1 ? 1 : e.target.value
                                }}
                                className={styles.input}
                                onChange={activityDurationHandler}
                            />
                        </ThemeProvider>
                    </div>
                    <div className={styles.dayPicker}>
                        <FormGroup>
                            <FormControlLabel control={

                                <Checkbox sx={{
                                    color: 'black',
                                    '&.Mui-checked': {
                                        color: 'black',
                                    },
                                }}
                                    name="monday"
                                    onChange={setActivityDaysHandler}
                                />

                            } label="Monday" />

                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }}
                                name="tuesday"
                                onChange={setActivityDaysHandler}
                            />} label="Tuesday" />
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }}
                                name="wednesday"
                                onChange={setActivityDaysHandler}
                            />} label="Wednesday" />
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }}
                                name="thursday"
                                onChange={setActivityDaysHandler}
                            />} label="Thursday" />
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }}
                                name="friday"
                                onChange={setActivityDaysHandler}
                            />} label="Friday" />
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }}
                                name="saturdayy"
                                onChange={setActivityDaysHandler}
                            />} label="Saturday" />
                            <FormControlLabel control={<Checkbox sx={{
                                color: 'black',
                                '&.Mui-checked': {
                                    color: 'black',
                                },
                            }}
                                name="sunday"
                                onChange={setActivityDaysHandler}
                            />} label="Sunday" />
                        </FormGroup>
                    </div>
                </div >




            /**
             * Lecturer Tab
             */
            case 'lecturer':
                return <div className={styles.inputContainer}>
                    <ThemeProvider theme={theme}>
                        <TextField
                            color="gray"
                            required
                            id="standard-required"
                            label="Lecturer (Staff) Name"
                            variant="standard"
                            className={styles.input}
                            value={lecturerName}
                            onChange={(event) => setLecturerName(event.target.value)}
                        />
                        <Autocomplete
                            required
                            disableClearable

                            id="standard-required"
                            variant="standard"
                            className={styles.input}
                            options={modules}
                            renderInput={(params) => <TextField color="gray" variant='standard'{...params} label="Module ID" />}
                            onInputChange={(event, newInputValue) => {
                                // activityModuleHandler(newInputValue);
                            }}
                        />

                    </ThemeProvider>

                    <div
                        className={styles.unavailableHeader}
                    >
                        Unavailable Time Slots
                    </div>
                    <div className={styles.dayPicker}>
                        <FormGroup>
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={
                                    <div className={styles.lecturerDayContainer}>
                                        <Checkbox sx={{
                                            color: 'black',
                                            '&.Mui-checked': {
                                                color: 'black',
                                            },
                                        }}
                                            name="monday"
                                            onChange={setActivityDaysHandler}
                                        />
                                        <div className={styles.lecturerTimePickerContainer}>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <TimePicker
                                                    label="Start Time"
                                                    value={unavailableStartTime.monday}
                                                    onChange={(event) => unavailableStartTimeHandler(event, "monday")}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />

                                                <TimePicker
                                                    label="End Time"
                                                    value={unavailableEndtTime.monday}
                                                    onChange={(event) => unavailableEndTimeHandler(event, "monday")}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                } label="Monday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="tuesday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.tuesday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "tuesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.tuesday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "tuesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Tuesday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="wednesday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.wednesday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "wednesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.wednesday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "wednesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Wednesday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="thursday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.thursday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "thursday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.thursday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "thursday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Thursday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="friday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.friday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "friday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.friday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "friday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Friday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="saturday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.saturday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "saturday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.saturday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "saturday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Saturday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="sunday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.sunday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "sunday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.sunday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "sunday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Sunday" />
                        </FormGroup>
                    </div>

                    <div
                        className={styles.unavailableHeader}
                    >
                        Perference Time Slots
                    </div>
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
                                // activityModuleHandler(newInputValue);
                            }}
                        />
                    </ThemeProvider>
                    {/* This part has to be erased */}
                    <div />


                    <ThemeProvider theme={theme}>
                        <Autocomplete
                            required
                            disableClearable

                            id="standard-required"
                            variant="standard"
                            className={styles.input}
                            options={activityActivities}
                            renderInput={(params) => <TextField color="gray" variant='standard'{...params} label="Activity" />}
                            onInputChange={(event, newInputValue) => {
                                // activityActivityHandler(newInputValue);
                            }}
                        />
                    </ThemeProvider>

                    <div className={styles.dayPicker}>
                        <FormGroup>
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={
                                    <div className={styles.lecturerDayContainer}>
                                        <Checkbox sx={{
                                            color: 'black',
                                            '&.Mui-checked': {
                                                color: 'black',
                                            },
                                        }}
                                            name="monday"
                                            onChange={setActivityDaysHandler}
                                        />
                                        <div className={styles.lecturerTimePickerContainer}>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <TimePicker
                                                    label="Start Time"
                                                    value={prefStartTime.monday}
                                                    onChange={(event) => prefStartTimeHandler(event, "monday")}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />

                                                <TimePicker
                                                    label="End Time"
                                                    value={prefEndTime.monday}
                                                    onChange={(event) => prefEndTimeHandler(event, "monday")}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                } label="Monday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="tuesday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={prefStartTime.tuesday}
                                                onChange={(event) => prefStartTimeHandler(event, "tuesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={prefEndTime.monday}
                                                onChange={(event) => prefEndTimeHandler(event, "tuesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Tuesday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="wednesday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={prefStartTime.wednesday}
                                                onChange={(event) => prefStartTimeHandler(event, "wednesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={prefEndTime.monday}
                                                onChange={(event) => prefEndTimeHandler(event, "wednesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Wednesday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="thursday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={prefStartTime.thursday}
                                                onChange={(event) => prefStartTimeHandler(event, "thursday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={prefEndTime.thursday}
                                                onChange={(event) => prefEndTimeHandler(event, "thursday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Thursday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="friday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={prefStartTime.friday}
                                                onChange={(event) => prefStartTimeHandler(event, "friday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={prefEndTime.friday}
                                                onChange={(event) => prefEndTimeHandler(event, "friday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Friday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="saturday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={prefStartTime.thursday}
                                                onChange={(event) => prefStartTimeHandler(event, "saturday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={prefEndTime.thursday}
                                                onChange={(event) => prefEndTimeHandler(event, "saturday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Saturday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="sunday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={prefStartTime.thursday}
                                                onChange={(event) => prefStartTimeHandler(event, "sunday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={prefEndTime.thursday}
                                                onChange={(event) => prefEndTimeHandler(event, "sunday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Sunday" />
                        </FormGroup>
                    </div>

                </div>
            case 'room':
                return <div className={styles.inputContainer}>
                    <ThemeProvider theme={theme}>
                        <TextField
                            color="gray"
                            required
                            id="standard-required"
                            label="Room ID"
                            variant="standard"
                            className={styles.input}
                        />
                        <TextField
                            color="gray"
                            required
                            id="standard-required"
                            label="Capacity"
                            variant="standard"
                            type="number"
                            onInput={(e) => {
                                e.target.value = e.target.value < 1 ? 1 : e.target.value
                            }}
                            className={styles.input}
                        />
                    </ThemeProvider>
                    <div
                        className={styles.unavailableHeader}
                    >
                        Unavailable Time Slots
                    </div>
                    <div className={styles.dayPicker}>
                        <FormGroup>
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={
                                    <div className={styles.lecturerDayContainer}>
                                        <Checkbox sx={{
                                            color: 'black',
                                            '&.Mui-checked': {
                                                color: 'black',
                                            },
                                        }}
                                            name="monday"
                                            onChange={setActivityDaysHandler}
                                        />
                                        <div className={styles.lecturerTimePickerContainer}>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <TimePicker
                                                    label="Start Time"
                                                    value={unavailableStartTime.monday}
                                                    onChange={(event) => unavailableStartTimeHandler(event, "monday")}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />

                                                <TimePicker
                                                    label="End Time"
                                                    value={unavailableEndtTime.monday}
                                                    onChange={(event) => unavailableEndTimeHandler(event, "monday")}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </div>
                                } label="Monday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="tuesday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.tuesday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "tuesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.tuesday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "tuesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Tuesday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="wednesday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.wednesday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "wednesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.wednesday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "wednesday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Wednesday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="thursday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.thursday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "thursday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.thursday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "thursday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Thursday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="friday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.friday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "friday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.friday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "friday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Friday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="saturday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.saturday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "saturday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.saturday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "saturday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Saturday" />
                            <FormControlLabel
                                className={styles.lecturerLabelContainer}
                                control={<div className={styles.lecturerDayContainer}>
                                    <Checkbox sx={{
                                        color: 'black',
                                        '&.Mui-checked': {
                                            color: 'black',
                                        },
                                    }}
                                        name="sunday"
                                        onChange={setActivityDaysHandler}
                                    />
                                    <div className={styles.lecturerTimePickerContainer}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <TimePicker
                                                label="Start Time"
                                                value={unavailableStartTime.sunday}
                                                onChange={(event) => unavailableStartTimeHandler(event, "sunday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />

                                            <TimePicker
                                                label="End Time"
                                                value={unavailableEndtTime.sunday}
                                                onChange={(event) => unavailableEndTimeHandler(event, "sunday")}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>} label="Sunday" />
                        </FormGroup>
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