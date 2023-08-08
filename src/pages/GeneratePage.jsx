import { useState, useEffect, useRef } from "react";

import FileUpload         from "@mui/icons-material/FileUpload";
import Check              from "@mui/icons-material/Check";

import {
  Autocomplete,
  TextField,
  Checkbox,
  ThemeProvider,
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  Modal,
  Button,
  Chip,
} from "@mui/material";

import TimeslotSelector,{ map_timeslot }     
                            from "../components/GeneratePage/TimeslotSelector";
import { AddModuleButton,ResetButton, ImportButton, ExportButton } 
                            from "../components/GeneratePage/Button";

import { theme }            from "../utils/theme";
import { allowed_timeslot } from "../utils/allowed_timeslot";
import { timeslot_status }  from "../utils/timeslot_status";
import { column_index, row_index } 
                            from "../utils/timetable_index";

import styles               from "../assets/pages/GeneratePage.module.css";

/**
 * View for Generate Page .../generate
 * @returns Generate Page
 */
const GeneratePage = () => {
  const [tab               , setTab]                = useState("module");
  const [activityModule    , setActivityModule]     = useState("");
  const [activityActivities, setActivityActivities] = useState([]);
  const [activityActivity  , setActivityActivity]   = useState("");

  const [open              , setOpen]               = useState(false);
  const [activities        , setActivities]         = useState([
    "Lecture",
    "Exercise",
    "Lab Session",
    "Workshop",
    "Experiment",
  ]);
  const [activityName     , setActivityName]        = useState("");
  const [checked          , setChecked]             = useState([]);
  const [userInput        , setUserInput]           = useState({
    umodules: {},
    activities: {},
    lecturers: {},
    rooms: {},
    assigned: {
      lecturers: {},
      rooms: {},
    },
  });
  const [userInputActivity, setUserInputActivity] = useState({
    activityModule: "",
    activity: "",
    allowed: [],
    preferred: [],
  });
  const [umodule          , setUModule]          = useState({
    id: "",
    activities: [],
  });
  const [moduleID         , setModuleID]         = useState("");
  const [modules          , setModules]          = useState([]);

  const [activityPerWeek  , setActivityPerWeek]  = useState(1);
  const [lecturerName     , setLecturerName]     = useState("");

  const [roomID           , setRoomID]           = useState("");

  const [importModalOpen  , setImportModalOpen]   = useState(false);

  const [activityAllowedTimeSlot  , setActivityAllowedTimeSlot]   = useState(allowed_timeslot);
  const [activityPreferredTimeSlot, setActivityPreferredTimeSlot] = useState([]);
  const [activityTimeSlotStatus   , setActivityTimeSlotStatus]    = useState(timeslot_status);

  const [columnHandlerIndex       , setColumnHandlerIndex]        = useState(column_index);
  const [rowHandlerIndex          , setRowHandlerIndex]           = useState(row_index);

  const [moduleMapper             , setModuleMapper]              = useState({});
  const [lecturerMapper           , setLecturerMapper]            = useState({});
  const [roomMapper               , setRoomMapper]                = useState({});
  const [lecturerActivityAssign   , setLecturerActivityAssign]    = useState("");
  const [lecturerAssign           , setLecturerAssign]            = useState([]);
  const [roomActivityAssign       , setRoomActivityAssign]        = useState("");
  const [roomAssign               , setRoomAssign]                = useState([]);

  // Set module id in activity tab
  const activityModuleHandler = (value) => {
    setUserInputActivity({
      ...userInputActivity,
      activityModule: value,
    });

    setActivityModule(value);
    setActivityActivities(userInput.umodules[value].activities);
  };

  const activityActivityHandler = (value) => {
    setUserInputActivity({
      ...userInputActivity,
      activity: value,
    });
    setActivityActivity(value);
  };

  // STATE: open handler
  const handleOpen  = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const importModalHandleOpen  = () => setImportModalOpen(true);
  const importModalHandleClose = () => setImportModalOpen(false);

  const [dragActive, setDragActive] = useState(false);
  const [importFile, setImportFile] = useState();
  const inputRef                    = useRef(null);

  // STATE: activityName handler
  const activityNameHandler = (event) => {
    setActivityName(event.target.value);
  };

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
    setUModule({
      ...umodule,
      activities: [...newChecked],
    });
  };

  const addNewActivity = (value) => {
    setOpen(false);

    setActivities([...activities, value]);

    handleToggle(value);
  };

  const moduleIDHandler = (value) => {
    setModuleID(value);
    setUModule({
      ...umodule,
      id: value,
    });
  };

  const timeSlotRowHandler = (time) => {
    let newTimeSlotStatus = JSON.parse(JSON.stringify(activityTimeSlotStatus));

    Object.keys(newTimeSlotStatus).forEach((day) => {
      day = parseInt(day);
      switch (rowHandlerIndex[time]) {
        case 0:
          newTimeSlotStatus = {
            ...newTimeSlotStatus,
            [day]: {
              ...newTimeSlotStatus[day],
              [time]: 1,
            },
          };

          setRowHandlerIndex({
            ...rowHandlerIndex,
            [time]: 1,
          });
          break;
        case 1:
          newTimeSlotStatus = {
            ...newTimeSlotStatus,
            [day]: {
              ...newTimeSlotStatus[day],
              [time]: 2,
            },
          };

          setRowHandlerIndex({
            ...rowHandlerIndex,
            [time]: 2,
          });
          break;
        default:
          newTimeSlotStatus = {
            ...newTimeSlotStatus,
            [day]: {
              ...newTimeSlotStatus[day],
              [time]: 0,
            },
          };

          setRowHandlerIndex({
            ...rowHandlerIndex,
            [time]: 0,
          });
          break;
      }
    });

    const { newAllowedTimeSlot, newPreferredTimeSlot } = map_timeslot(newTimeSlotStatus);

    setActivityTimeSlotStatus(newTimeSlotStatus);
    setActivityAllowedTimeSlot(newAllowedTimeSlot);
    setActivityPreferredTimeSlot(newPreferredTimeSlot);
  };

  const timeSlotColumnHandler = (day) => {
    let newTimeSlotStatus = JSON.parse(JSON.stringify(activityTimeSlotStatus));

    Object.keys(newTimeSlotStatus[day]).forEach((time) => {
      time = parseInt(time);
      switch (columnHandlerIndex[day]) {
        case 0:
          newTimeSlotStatus = {
            ...newTimeSlotStatus,
            [day]: {
              ...newTimeSlotStatus[day],
              [time]: 1,
            },
          };

          setColumnHandlerIndex({
            ...columnHandlerIndex,
            [day]: 1,
          });
          break;
        case 1:
          newTimeSlotStatus = {
            ...newTimeSlotStatus,
            [day]: {
              ...newTimeSlotStatus[day],
              [time]: 2,
            },
          };

          setColumnHandlerIndex({
            ...columnHandlerIndex,
            [day]: 2,
          });
          break;
        default:
          newTimeSlotStatus = {
            ...newTimeSlotStatus,
            [day]: {
              ...newTimeSlotStatus[day],
              [time]: 0,
            },
          };

          setColumnHandlerIndex({
            ...columnHandlerIndex,
            [day]: 0,
          });
          break;
      }
    });

    const { newAllowedTimeSlot, newPreferredTimeSlot } = map_timeslot(newTimeSlotStatus);

    setActivityTimeSlotStatus(newTimeSlotStatus);
    setActivityAllowedTimeSlot(newAllowedTimeSlot);
    setActivityPreferredTimeSlot(newPreferredTimeSlot);
  };

  const timeSlotHandler = (day, time) => {
    let newTimeSlotStatus = JSON.parse(JSON.stringify(activityTimeSlotStatus));

    switch (newTimeSlotStatus[day][time]) {
      case 0:
        newTimeSlotStatus[day][time] = 1;
        break;
      case 1:
        newTimeSlotStatus[day][time] = 2;
        break;
      default:
        newTimeSlotStatus[day][time] = 0;
        break;
    }

    const { newAllowedTimeSlot, newPreferredTimeSlot } = map_timeslot(newTimeSlotStatus);

    setActivityTimeSlotStatus(newTimeSlotStatus);
    setActivityAllowedTimeSlot(newAllowedTimeSlot);
    setActivityPreferredTimeSlot(newPreferredTimeSlot);
  };

  const setModuleMapperHelper = (userInput) => {
    let moduleMapper = {};

    Object.keys(userInput.umodules).forEach((id) => {
      userInput.umodules[id].activities.forEach((activity) => {
        moduleMapper = {
          ...moduleMapper,
          [Object.keys(moduleMapper).length + 1]: id + "." + activity,
        };
      });
    });

    setModuleMapper(moduleMapper);
  };

  const setActivityTimeHelper = (userInput) => {
    let newModuleMapper = moduleMapper;

    if (Object.keys(newModuleMapper).length === 0)
      Object.keys(userInput.umodules).forEach((id) => {
        userInput.umodules[id].activities.forEach((activity) => {
          newModuleMapper = {
            ...newModuleMapper,
            [Object.keys(newModuleMapper).length + 1]: id + "." + activity,
          };
        });
      });
  };

  const setLecturerMapperHelper = (userInput) => {
    let lecturerMapper = {};

    Object.keys(userInput.lecturers).forEach((name) => {
      lecturerMapper = {
        ...lecturerMapper,
        [Object.keys(lecturerMapper).length + 1]: name,
      };
    });

    setLecturerMapper(lecturerMapper);

  };

  const setRoomMapperHelper = (userInput) => {
    let roomMapper = {};

    Object.keys(userInput.rooms).forEach((name) => {
      roomMapper = {
        ...roomMapper,
        [Object.keys(roomMapper).length + 1]: name,
      };
    });

    setRoomMapper(roomMapper);
  };

  const setAssignedMapperHelper = (userInput) => {
    let newModuleMapper = moduleMapper;
    let newLecturerMapper = lecturerMapper;
    let newRoomMapper = roomMapper;

    if (Object.keys(newModuleMapper).length === 0)
      Object.keys(userInput.umodules).forEach((id) => {
        userInput.umodules[id].activities.forEach((activity) => {
          newModuleMapper = {
            ...newModuleMapper,
            [Object.keys(newModuleMapper).length + 1]: id + "." + activity,
          };
        });
      });

    if (Object.keys(newLecturerMapper).length === 0)
      Object.keys(userInput.lecturers).forEach((name) => {
        newLecturerMapper = {
          ...newLecturerMapper,
          [Object.keys(newLecturerMapper).length + 1]: name,
        };
      });

    if (Object.keys(newRoomMapper).length === 0) {
      Object.keys(userInput.rooms).forEach((name) => {
        newRoomMapper = {
          ...newRoomMapper,
          [Object.keys(newRoomMapper).length + 1]: name,
        };
      });
    }
  };

  const exportJson = () => {
    // console.log((localStorage.getItem('userInfo')))
    const element = document.createElement("a");
    const textFile = new Blob([localStorage.getItem("userInfo")], {
      type: "application/json",
    }); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(textFile);
    element.download = "userInfo.json";
    document.body.appendChild(element);
    element.click();
  };

  const addModule = () => {
    let userInfo = {};

    switch (tab) {
      case "module":
        if (umodule.id === "" && umodule.activities.length === 0) {
          alert("You have to add any value to add module.");
          return;
        }

        if (umodule.id === "") {
          alert("You have to set the module name.");
          return;
        }

        if (umodule.activities.length === 0) {
          alert("You have to set the activity.");
          return;
        }

        if (
          window.confirm(
            "Do you want to add\nModule: " +
              umodule.id +
              "\nActivities: " +
              umodule.activities
          )
        ) {
          userInfo = {
            ...userInput,
            umodules: {
              ...userInput.umodules,
              [umodule.id]: umodule,
            },
          };

          setUserInput(userInfo);

          setUModule({
            id: "",
            activities: [],
          });
          setModuleID("");
          setChecked([]);
          setModules([...modules, umodule.id]);

          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          setModuleMapperHelper(userInfo);

          setTab("activity");
        } else {
          return;
        }

        break;
      case "activity":
        if (activityModule === "" && activityActivity === "") {
          alert("You have to add any value to add activity.");
          return;
        }

        if (activityModule === "") {
          alert("You have to select the module name.");
          return;
        }

        if (activityActivity === "") {
          alert("You have to select the activity name.");
          return;
        }

        if (
          window.confirm(
            "Do you want to add\nActivity: " +
              activityModule +
              "." +
              activityActivity
          )
        ) {
          userInfo = {
            ...userInput,
            activities: {
              ...userInput.activities,
              [activityModule]: {
                ...userInput.activities[activityModule],
                [activityActivity]: {
                  allowed: activityAllowedTimeSlot,
                  preferred: activityPreferredTimeSlot,
                  activityPerWeek: activityPerWeek,
                },
              },
            },
          };

          setUserInput(userInfo);

          setUserInputActivity({
            activityModule: "",
            activity: "",
            allowed: [],
            preferred: [],
          });

          setActivityModule("");
          setActivityActivities([]);
          setActivityActivity("");

          setActivityPerWeek(1);
          resetTimeSelector()

          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          setActivityTimeHelper(userInfo);

          setTab("lecturer");
        } else {
          return;
        }

        break;
      case "lecturer":
        if (lecturerName === "") {
          alert("You have to set the lecturer name to add lecturer.");
          return;
        }

        if (window.confirm("Do you want to add\nLecturer: " + lecturerName)) {
          let lecturerTimeSlot = {
            allowed: activityAllowedTimeSlot,
            preferred: activityPreferredTimeSlot,
          };

          userInfo = {
            ...userInput,
            lecturers: {
              ...userInput.lecturers,
              [lecturerName]: lecturerTimeSlot,
            },
          };

          setUserInput(userInfo);

          setLecturerName("");
          resetTimeSelector()

          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          setLecturerMapperHelper(userInfo);

          setTab("room");
        } else {
          return;
        }

        break;
      case "room":
        if (roomID === "") {
          alert("You have to set the room name to add room.");
          return;
        }

        if (window.confirm("Do you want to add\nRoom: " + roomID)) {
          userInfo = {
            ...userInput,
            rooms: {
              ...userInput.rooms,
              [roomID]: {
                allowed: activityAllowedTimeSlot,
                preferred: activityPreferredTimeSlot,
              },
            },
          };

          setRoomID("");
          resetTimeSelector()

          setUserInput(userInfo);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          setRoomMapperHelper(userInfo);

          setTab("assignL");
        } else {
          return;
        }

        break;
      case "assignL":
        if (
          window.confirm(
            "Do you want to add\n" +
              lecturerActivityAssign +
              ": " +
              lecturerAssign
          )
        ) {
          userInfo = {
            ...userInput,
            assigned: {
              ...userInput.assigned,
              rooms: {
                ...userInput.assigned.rooms,
              },
              lecturers: {
                ...userInput.assigned.lecturers,
                [lecturerActivityAssign]: lecturerAssign,
              },
            },
          };

          setUserInput(userInfo);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          setAssignedMapperHelper(userInfo);

          setTab("assignR");
        } else {
          return;
        }

        break;
      case "assignR":
        if (
          window.confirm(
            "Do you want to add\n" +
              lecturerActivityAssign +
              ": " +
              lecturerAssign +
              "\n" +
              roomActivityAssign +
              ": " +
              roomAssign
          )
        ) {
          userInfo = {
            ...userInput,
            assigned: {
              ...userInput.assigned,
              lecturers: {
                ...userInput.assigned.lecturers,
              },
              rooms: {
                ...userInput.assigned.rooms,
                [roomActivityAssign]: roomAssign,
              },
            },
          };

          setUserInput(userInfo);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          setAssignedMapperHelper(userInfo);
        } else {
          return;
        }

        break;
      default:
        alert("Error!");
        setTab("module");
        break;
    }
  };

  const resetTimeSelector = () => {
    setActivityAllowedTimeSlot(allowed_timeslot);
    setActivityPreferredTimeSlot([]);
    setActivityTimeSlotStatus(timeslot_status);
  }

  const inputDragHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const inputDropHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    if (event.dataTransfer.files[0]) {
      setImportFile(event.dataTransfer.files[0]);
      // handleFiles(e.dataTransfer.files);
    }
  };

  const loadFileToLocalStorage = () => {
    const fileReader = new FileReader();

    fileReader.readAsText(importFile, "UTF-8");
    fileReader.onload = (e) => {
      localStorage.setItem("userInfo", e.target.result);

      let newUserInfo = JSON.parse(e.target.result);

      setActivityActivities([]);
      setModuleMapperHelper(newUserInfo);
      setActivityTimeHelper(newUserInfo);
      setLecturerMapperHelper(newUserInfo);
      setRoomMapperHelper(newUserInfo);
      setAssignedMapperHelper(newUserInfo);

      setUserInput(newUserInfo);

      let newModules = [];
      for (let key in newUserInfo.umodules) {
        newModules = [...newModules, key];
      }

      setModules(newModules);

      alert(
        Object.keys(newUserInfo.umodules).length +
          " modules\n" +
          Object.keys(newUserInfo.lecturers).length +
          " lecturers\n" +
          Object.keys(newUserInfo.rooms).length +
          " rooms added"
      );

      importModalHandleClose();

      setImportFile();
      setTab("module");
    };
  };

  // triggers when file is selected with click
  const inputChangeHandler = (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      setImportFile(event.target.files[0]);
    }
  };

  // triggers the input when the button is clicked
  const inputClickButtonHandler = () => {
    inputRef.current.click();
  };

  const resetInputButton = () => {
    if (
      window.confirm(
        "This will remove all data in the browser.\n\nIt cannot be undo.\n\n Are you sure want to proceed?"
      )
    ) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("mapper");
      localStorage.removeItem("jobID");
      localStorage.removeItem("solution");

      setUserInput({
        umodules: {},
        activities: {},
        lecturers: {},
        rooms: {},
        assigned: {
          lecturers: {},
          rooms: {},
        },
      });

      setModules([]);
      setActivityActivities([]);

      setModuleMapper({});
      setLecturerMapper({});
      setRoomMapper({});

      setLecturerActivityAssign(null);
      setLecturerAssign([]);
      setRoomActivityAssign(null);
      setRoomAssign([]);

      setTab("module");
    }
  };

  const tabContentHandler = () => {
    let moduleOptions = [];
    let lecturerOptions = [];
    let roomOptions = [];

    switch (tab) {
      /**
       * Module Tab
       */
      case "module":
        return (
          <div className={styles.listWithInputContainer}>
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
              </ThemeProvider>
            </div>
            <List
              sx={{
                width: 400,
                height: 230,
                bgcolor: "#F8F8F8",
                overflow: "auto",
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
                          "aria-labelledby": labelId,
                        }}
                        sx={{
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value} />
                  </ListItem>
                );
              })}

              <ListItem role="listitem" button onClick={handleOpen}>
                <ListItemIcon></ListItemIcon>
                <ListItemText id="AddNew" primary="Add new Activity" />
              </ListItem>
              <Modal open={open} onClose={handleClose}>
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
        );

      /**
       * Activity Tab
       */
      case "activity":
        return (
          <div className={styles.activityInputContainer}>
            <div className={styles.inputContainer}>
              <ThemeProvider theme={theme}>
                <Autocomplete
                  required
                  onChange={(event, newValue) => {
                    activityModuleHandler(newValue);
                  }}
                  id="standard-required"
                  variant="standard"
                  disableClearable
                  className={styles.input}
                  options={modules}
                  renderInput={(params) => (
                    <TextField
                      color="gray"
                      variant="standard"
                      {...params}
                      label="Module ID"
                    />
                  )}
                />
              </ThemeProvider>
              <div />

              <ThemeProvider theme={theme}>
                <Autocomplete
                  required
                  disableClearable
                  id="activity"
                  variant="standard"
                  className={styles.input}
                  options={activityActivities}
                  // inputValue={activityActivity}

                  renderInput={(params) => (
                    <TextField
                      color="gray"
                      variant="standard"
                      {...params}
                      label="Activity"
                    />
                  )}
                  onInputChange={(event, newInputValue) => {
                    activityActivityHandler(newInputValue);
                  }}
                />
                <TextField
                  color="gray"
                  required
                  id="standard-required"
                  label="Class per week"
                  variant="standard"
                  className={styles.input}
                  type="number"
                  value={activityPerWeek}
                  InputProps={{ inputProps: { min: 1, max: 5 } }}
                  onChange={(event) =>
                    setActivityPerWeek(parseInt(event.target.value))
                  }
                />
              </ThemeProvider>
            </div>

            <TimeslotSelector 
              timeSlotRowHandler={timeSlotRowHandler}
              timeSlotColumnHandler={timeSlotColumnHandler}
              timeSlotHandler={timeSlotHandler}
              activityTimeSlotStatus={activityTimeSlotStatus}
            />
          </div>
        );

      /**
       * Lecturer Tab
       */
      case "lecturer":
        return (
          <div className={styles.inputContainer}>
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
            </ThemeProvider>
            <TimeslotSelector 
              timeSlotRowHandler={timeSlotRowHandler}
              timeSlotColumnHandler={timeSlotColumnHandler}
              timeSlotHandler={timeSlotHandler}
              activityTimeSlotStatus={activityTimeSlotStatus}
            />
          </div>
        );
      case "room":
        return (
          <div className={styles.inputContainer}>
            <ThemeProvider theme={theme}>
              <TextField
                color="gray"
                required
                id="standard-required"
                label="Room ID"
                variant="standard"
                className={styles.input}
                value={roomID}
                onChange={(event) => setRoomID(event.target.value)}
              />
            </ThemeProvider>
            <TimeslotSelector 
              timeSlotRowHandler={timeSlotRowHandler}
              timeSlotColumnHandler={timeSlotColumnHandler}
              timeSlotHandler={timeSlotHandler}
              activityTimeSlotStatus={activityTimeSlotStatus}
            />
          </div>
        );
      case "assignL":
        moduleOptions = [];
        lecturerOptions = [];
        roomOptions = [];

        if (moduleMapper)
          Object.keys(moduleMapper).forEach((key) => {
            let activitiesAssign = moduleMapper[key].split(".");
            let moduleIDAssign = "";

            activitiesAssign.forEach((value, index) => {
              if (index < activitiesAssign.length - 1) {
                moduleIDAssign += value;
                moduleIDAssign += ".";
              }
            });

            moduleIDAssign = moduleIDAssign.slice(0, -1);

            let activityAssign = activitiesAssign[activitiesAssign.length - 1];

            if (userInput.activities[moduleIDAssign]) {
              if (userInput.activities[moduleIDAssign][activityAssign]) {
                moduleOptions = [...moduleOptions, moduleMapper[key]];
              }
            }
          });

        if (lecturerMapper)
          Object.keys(lecturerMapper).forEach((key) => {
            lecturerOptions = [...lecturerOptions, lecturerMapper[key]];
          });

        return (
          <div>
            <div>
              <div>
                <ThemeProvider theme={theme}>
                  <Autocomplete
                    // value={lecturerActivityAssign}
                    onChange={(event, newValue) => {
                      setLecturerActivityAssign(newValue);
                    }}
                    disableClearable
                    className={styles.assignInput}
                    options={moduleOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Select an activity to assign"
                        color="gray"
                        variant="standard"
                      />
                    )}
                  />
                  <Autocomplete
                    className={styles.assignInput}
                    options={lecturerOptions}
                    multiple
                    value={lecturerAssign}
                    onChange={(event, newValue) => {
                      setLecturerAssign(newValue);
                    }}
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((value, index) => (
                        <Chip
                          sx={{
                            borderRadius: "0px !important",
                          }}
                          color="gray"
                          className={styles.chip}
                          label={value}
                          {...getTagProps({ index })}
                        />
                      ));
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Assign a lecturer for the activity"
                        color="gray"
                        variant="standard"
                      />
                    )}
                  />
                </ThemeProvider>
              </div>
            </div>
          </div>
        );
      case "assignR":
        moduleOptions = [];
        lecturerOptions = [];
        roomOptions = [];

        if (moduleMapper)
          Object.keys(moduleMapper).forEach((key) => {
            let activitiesAssign = moduleMapper[key].split(".");
            let moduleIDAssign = "";

            activitiesAssign.forEach((value, index) => {
              if (index < activitiesAssign.length - 1) {
                moduleIDAssign += value;
                moduleIDAssign += ".";
              }
            });

            moduleIDAssign = moduleIDAssign.slice(0, -1);

            let activityAssign = activitiesAssign[activitiesAssign.length - 1];

            if (userInput.activities[moduleIDAssign]) {
              if (userInput.activities[moduleIDAssign][activityAssign]) {
                moduleOptions = [...moduleOptions, moduleMapper[key]];
              }
            }
          });

        if (roomMapper)
          Object.keys(roomMapper).forEach((key) => {
            roomOptions = [...roomOptions, roomMapper[key]];
          });

        return (
          <div>
            <div>
              <div>
                <div>
                  <ThemeProvider theme={theme}>
                    <Autocomplete
                      // value={roomActivityAssign}
                      onChange={(event, newValue) => {
                        setRoomActivityAssign(newValue);
                      }}
                      disableClearable
                      className={styles.assignInput}
                      options={moduleOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select an activity to assign"
                          color="gray"
                          variant="standard"
                        />
                      )}
                    />
                    <Autocomplete
                      value={roomAssign}
                      multiple
                      onChange={(event, newValue) => {
                        setRoomAssign(newValue);
                      }}
                      renderTags={(tagValue, getTagProps) => {
                        return tagValue.map((value, index) => (
                          <Chip
                            sx={{
                              borderRadius: "0px !important",
                            }}
                            color="gray"
                            className={styles.chip}
                            label={value}
                            {...getTagProps({ index })}
                          />
                        ));
                      }}
                      className={styles.assignInput}
                      options={roomOptions}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Assign a room for the activity"
                          color="gray"
                          variant="standard"
                        />
                      )}
                    />
                  </ThemeProvider>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const tabHandler = (tabToMove) => {
    switch (tabToMove) {
      case "umodule":
        break;
      case "activity":
        setActivityModule("");
        setLecturerAssign([]);
        setLecturerActivityAssign("");
        setRoomAssign([]);
      case "lecturer":
      case "room":
        setLecturerName("");
        setRoomID("");
        resetTimeSelector()
        setRowHandlerIndex(row_index);
        setColumnHandlerIndex(column_index);
        break;
      case "assignL":
        setActivityModule(null);
        setLecturerAssign([]);
        setLecturerActivityAssign(null);
        break;

      case "assignR":
        setActivityModule(null);
        setRoomAssign([]);
        setRoomActivityAssign(null);

        break;
      default:
        break;
    }
    setTab(tabToMove);
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    let stringUserInfo = localStorage.getItem("userInfo");

    if (stringUserInfo) {
      let userInfo = JSON.parse(stringUserInfo);

      // console.log(userInfo)

      if (userInfo) {
        setUserInput(userInfo);

        let newModules = [];
        for (let key in userInfo.umodules) {
          newModules = [...newModules, key];
        }

        setModules(newModules);
        setActivityTimeHelper(userInfo);
        setModuleMapperHelper(userInfo);
        setLecturerMapperHelper(userInfo);
        setRoomMapperHelper(userInfo);
        setAssignedMapperHelper(userInfo);
      }
    }
  }, []);

  return (
    <div>

      <div className={styles.container}>
        <div
          className={
            tab === "module"
              ? styles.containerHeader1Active
              : styles.containerHeader1
          }
          onClick={() => tabHandler("module")}
        >
          Module (Class)
        </div>

        <div
          className={
            tab === "activity"
              ? styles.containerHeader2Active
              : styles.containerHeader2
          }
          onClick={() => tabHandler("activity")}
        >
          Activity
        </div>

        <div
          className={
            tab === "lecturer"
              ? styles.containerHeader3Active
              : styles.containerHeader3
          }
          onClick={() => tabHandler("lecturer")}
        >
          Lecturer (Staff)
        </div>

        <div
          className={
            tab === "room"
              ? styles.containerHeader4Active
              : styles.containerHeader4
          }
          onClick={() => tabHandler("room")}
        >
          Room
        </div>

        <div
          className={
            tab === "assignL"
              ? styles.containerHeader5Active
              : styles.containerHeader5
          }
          onClick={() => tabHandler("assignL")}
        >
          Assign Lecutrer
        </div>

        <div
          className={
            tab === "assignR"
              ? styles.containerHeader6Active
              : styles.containerHeader6
          }
          onClick={() => tabHandler("assignR")}
        >
          Assign Room
        </div>

        {tabContentHandler()}

        <AddModuleButton addModule={addModule}/>
      </div>

      <Modal open={importModalOpen} onClose={importModalHandleClose}>
        <div className={styles.modal}>
          <div>
            <form
              className={styles.formFileUpload}
              onDragEnter={inputDragHandler}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                ref={inputRef}
                type="file"
                className={styles.inputFileUpload}
                onChange={inputChangeHandler}
              />
              <label
                className={
                  dragActive
                    ? styles.dragActive
                    : importFile
                    ? styles.labelFileUploaded
                    : styles.labelFileUpload
                }
              >
                <div>
                  {importFile ? (
                    <Check className={styles.fileUploadIcon} />
                  ) : (
                    <FileUpload className={styles.fileUploadIcon} />
                  )}
                  <p>
                    {importFile
                      ? "File has been selected!"
                      : "Drag and drop your file here or"}
                  </p>
                  {importFile ? (
                    <button
                      className={styles.uploadButton}
                      onClick={loadFileToLocalStorage}
                    >
                      Load the file
                    </button>
                  ) : (
                    <button
                      className={styles.uploadButton}
                      onClick={inputClickButtonHandler}
                    >
                      Upload a file
                    </button>
                  )}
                </div>
              </label>
              {dragActive && (
                <div
                  className={styles.dragFileElement}
                  onDragEnter={inputDragHandler}
                  onDragLeave={inputDragHandler}
                  onDragOver={inputDragHandler}
                  onDrop={inputDropHandler}
                ></div>
              )}
            </form>
          </div>
          <div className={styles.buttonContainer}>
            <ThemeProvider theme={theme}>
              <Button
                color="gray"
                className={styles.closeButton}
                onClick={importModalHandleClose}
              >
                Close
              </Button>
            </ThemeProvider>
          </div>
        </div>
      </Modal>

      <ResetButton  resetInputButton      ={resetInputButton}     />
      <ImportButton importModalHandleOpen ={importModalHandleOpen}/>
      <ExportButton exportJson            ={exportJson}           />

    </div>
  );
};

export default GeneratePage;