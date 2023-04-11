import * as React from "react";

import FileUpload from "@mui/icons-material/FileUpload";
import Check from "@mui/icons-material/Check";

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
  Tooltip,
  Chip,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";

import styles from "../assets/pages/GeneratePage.module.css";
import { Done, DoneAll, Info, Close } from "@mui/icons-material";

/**
 * Color theme for the components
 */
const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    gray: {
      main: "#64748B",
      contrastText: "#fff",
    },
    white: {
      main: "#64748B",
      contrastText: "#64748B",
    },

    allowed: {
      main: "#64748B",
      contrastText: "#fff",
    },
    preferred: {
      main: "#152D4F",
      contrastText: "#fff",
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
  const [activityActivity, setActivityActivity] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [activities, setActivities] = React.useState([
    "Lecture",
    "Exercise",
    "Lab Session",
    "Workshop",
    "Experiment",
  ]);
  const [activityName, setActivityName] = React.useState("");
  const [checked, setChecked] = React.useState([]);
  const [userInput, setUserInput] = React.useState({
    umodules: {},
    activities: {},
    lecturers: {},
    rooms: {},
    assigned: {
      lecturers: {},
      rooms: {},
    },
  });
  const [userInputActivity, setUserInputActivity] = React.useState({
    activityModule: "",
    activity: "",
    allowed: [],
    preferred: [],
  });
  const [umodule, setUModule] = React.useState({
    id: "",
    activities: [],
  });
  const [moduleID, setModuleID] = React.useState("");
  const [modules, setModules] = React.useState([]);

  const [activityPerWeek, setActivityPerWeek] = React.useState(1);
  const [lecturerName, setLecturerName] = React.useState("");

  const [roomID, setRoomID] = React.useState("");
  // const [roomCapacity, setRoomCapacity] = React.useState(1);

  const [importModalOpen, setImportModalOpen] = React.useState(false);
  const [activityAllowedTimeSlot, setActivityAllowedTimeSlot] = React.useState([
    ["1", "9"],
    ["1", "10"],
    ["1", "11"],
    ["1", "12"],
    ["1", "13"],
    ["1", "14"],
    ["1", "15"],
    ["1", "16"],
    ["2", "9"],
    ["2", "10"],
    ["2", "11"],
    ["2", "12"],
    ["2", "13"],
    ["2", "14"],
    ["2", "15"],
    ["2", "16"],
    ["3", "9"],
    ["3", "10"],
    ["3", "11"],
    ["3", "12"],
    ["3", "13"],
    ["3", "14"],
    ["3", "15"],
    ["3", "16"],
    ["4", "9"],
    ["4", "10"],
    ["4", "11"],
    ["4", "12"],
    ["4", "13"],
    ["4", "14"],
    ["4", "15"],
    ["4", "16"],
    ["5", "9"],
    ["5", "10"],
    ["5", "11"],
    ["5", "12"],
    ["5", "13"],
    ["5", "14"],
    ["5", "15"],
    ["5", "16"],
  ]);

  const [activityPreferredTimeSlot, setActivityPreferredTimeSlot] =
    React.useState([]);

  const [activityTimeSlotStatus, setActivityTimeSlotStatus] = React.useState({
    1: {
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      // '17': 0,
      // '18': 0
    },
    2: {
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      // '17': 1,
      // '18': 0
    },
    3: {
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      // '17': 1,
      // '18': 0
    },
    4: {
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      // '17': 1,
      // '18': 0
    },
    5: {
      9: 1,
      10: 1,
      11: 1,
      12: 1,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      // '17': 1,
      // '18': 0
    },
  });

  const [columnHandlerIndex, setColumnHandlerIndex] = React.useState({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
  });
  const [rowHandlerIndex, setRowHandlerIndex] = React.useState({
    9: 1,
    10: 1,
    11: 1,
    12: 1,
    13: 1,
    14: 1,
    15: 1,
    16: 1,
  });

  const [moduleMapper, setModuleMapper] = React.useState({});
  const [lecturerMapper, setLecturerMapper] = React.useState({});
  const [roomMapper, setRoomMapper] = React.useState({});
  const [activityAllowedTime, setActivityAllowedTime] = React.useState({});
  const [activityPreferredTime, setActivityPreferredTime] = React.useState({});
  const [lecturerAllowedTime, setLecturerAllowedTime] = React.useState({});
  const [lecturerPreferredTime, setLecturerPreferredTime] = React.useState({});
  const [roomAllowedTime, setRoomAllowedTime] = React.useState({});
  const [roomPreferredTime, setRoomPreferredTime] = React.useState({});
  const [lecturerActivityAssign, setLecturerActivityAssign] =
    React.useState("");
  const [lecturerAssign, setLecturerAssign] = React.useState([]);
  const [roomActivityAssign, setRoomActivityAssign] = React.useState("");
  const [roomAssign, setRoomAssign] = React.useState([]);
  const [activityAllowedLecturers, setActivityAllowedLecturers] =
    React.useState({});
  const [activityAllowedRooms, setActivityAllowedRooms] = React.useState({});

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const importModalHandleOpen = () => setImportModalOpen(true);
  const importModalHandleClose = () => setImportModalOpen(false);

  const [dragActive, setDragActive] = React.useState(false);
  const [importFile, setImportFile] = React.useState();
  const inputRef = React.useRef(null);

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
    let newTimeSlotStatus = activityTimeSlotStatus;
    let newAllowedTimeSlot = [];
    let newPreferredTimeSlot = [];

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

    Object.keys(newTimeSlotStatus).forEach((day) => {
      Object.keys(newTimeSlotStatus[day]).forEach((time) => {
        switch (newTimeSlotStatus[day][time]) {
          case 1:
            newAllowedTimeSlot = [...newAllowedTimeSlot, [day, time]];
            break;
          case 2:
            newPreferredTimeSlot = [...newPreferredTimeSlot, [day, time]];
            break;
          default:
            break;
        }
      });
    });

    setActivityTimeSlotStatus(newTimeSlotStatus);
    setActivityAllowedTimeSlot(newAllowedTimeSlot);
    setActivityPreferredTimeSlot(newPreferredTimeSlot);
  };

  const timeSlotColumnHandler = (day) => {
    let newTimeSlotStatus = activityTimeSlotStatus;
    let newAllowedTimeSlot = [];
    let newPreferredTimeSlot = [];

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

    Object.keys(newTimeSlotStatus).forEach((day) => {
      Object.keys(newTimeSlotStatus[day]).forEach((time) => {
        switch (newTimeSlotStatus[day][time]) {
          case 1:
            newAllowedTimeSlot = [...newAllowedTimeSlot, [day, time]];
            break;
          case 2:
            newPreferredTimeSlot = [...newPreferredTimeSlot, [day, time]];
            break;
          default:
            break;
        }
      });
    });

    setActivityTimeSlotStatus(newTimeSlotStatus);
    setActivityAllowedTimeSlot(newAllowedTimeSlot);
    setActivityPreferredTimeSlot(newPreferredTimeSlot);
  };

  const timeSlotHandler = (day, time) => {
    // console.log(activityTimeSlotStatus)
    // console.log(activityAllowedTimeSlot)
    // console.log(activityPreferredTimeSlot)
    let newTimeSlotStatus = activityTimeSlotStatus;
    let newAllowedTimeSlot = [];
    let newPreferredTimeSlot = [];

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

    Object.keys(newTimeSlotStatus).forEach((day) => {
      Object.keys(newTimeSlotStatus[day]).forEach((time) => {
        switch (newTimeSlotStatus[day][time]) {
          case 1:
            newAllowedTimeSlot = [...newAllowedTimeSlot, [day, time]];
            break;
          case 2:
            newPreferredTimeSlot = [...newPreferredTimeSlot, [day, time]];
            break;
          default:
            break;
        }
      });
    });

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

    let activityAllowedTime = {};
    let activityPreferredTime = {};

    Object.keys(userInput.activities).forEach((id) => {
      Object.keys(userInput.activities[id]).forEach((activity) => {
        if (userInput.activities[id][activity].allowed.length !== 0)
          activityAllowedTime = {
            ...activityAllowedTime,
            [Object.keys(newModuleMapper).find(
              (key) => newModuleMapper[key] === id + "." + activity
            )]: userInput.activities[id][activity].allowed,
          };

        if (userInput.activities[id][activity].preferred.length !== 0)
          activityPreferredTime = {
            ...activityPreferredTime,
            [Object.keys(newModuleMapper).find(
              (key) => newModuleMapper[key] === id + "." + activity
            )]: userInput.activities[id][activity].preferred,
          };
      });
    });

    setActivityAllowedTime(activityAllowedTime);
    setActivityPreferredTime(activityPreferredTime);
  };

  const setLecturerMapperHelper = (userInput) => {
    let lecturerMapper = {};

    let lecturerAllowedTime = {};
    let lecturerPreferredTime = {};

    Object.keys(userInput.lecturers).forEach((name) => {
      lecturerMapper = {
        ...lecturerMapper,
        [Object.keys(lecturerMapper).length + 1]: name,
      };

      if (userInput.lecturers[name].allowed.length !== 0)
        lecturerAllowedTime = {
          ...lecturerAllowedTime,
          [Object.keys(lecturerMapper).length]:
            userInput.lecturers[name].allowed,
        };

      if (userInput.lecturers[name].preferred.length !== 0)
        lecturerPreferredTime = {
          ...lecturerPreferredTime,
          [Object.keys(lecturerMapper).length]:
            userInput.lecturers[name].preferred,
        };
    });

    setLecturerMapper(lecturerMapper);
    setLecturerAllowedTime(lecturerAllowedTime);
    setLecturerPreferredTime(lecturerPreferredTime);
  };

  const setRoomMapperHelper = (userInput) => {
    let roomMapper = {};

    let roomAllowedTime = {};
    let roomPreferredTime = {};

    Object.keys(userInput.rooms).forEach((name) => {
      roomMapper = {
        ...roomMapper,
        [Object.keys(roomMapper).length + 1]: name,
      };

      if (userInput.rooms[name].allowed.length !== 0)
        roomAllowedTime = {
          ...roomAllowedTime,
          [Object.keys(roomMapper).length]: userInput.rooms[name].allowed,
        };

      if (userInput.rooms[name].preferred.length !== 0)
        roomPreferredTime = {
          ...roomPreferredTime,
          [Object.keys(roomMapper).length]: userInput.rooms[name].preferred,
        };
    });

    setRoomMapper(roomMapper);
    setRoomAllowedTime(roomAllowedTime);
    setRoomPreferredTime(roomPreferredTime);
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

    let activityAllowedLecturers = {};

    Object.keys(userInput.assigned.lecturers).forEach((id) => {
      let lecturerActivityNumber = Object.keys(newModuleMapper).find(
        (key) => newModuleMapper[key] === id
      );

      let assignedLecutrer = [];

      Object.keys(newLecturerMapper).forEach((key) => {
        if (userInput.assigned.lecturers[id].includes(newLecturerMapper[key])) {
          assignedLecutrer = [...assignedLecutrer, key];
        }
      });

      activityAllowedLecturers = {
        ...activityAllowedLecturers,
        [lecturerActivityNumber]: assignedLecutrer,
      };
    });

    let activityAllowedRooms = {};

    Object.keys(userInput.assigned.rooms).forEach((id) => {
      let roomActivityNumber = Object.keys(newModuleMapper).find(
        (key) => newModuleMapper[key] === id
      );

      let assignedRoom = [];

      Object.keys(newRoomMapper).forEach((key) => {
        if (userInput.assigned.rooms[id].includes(newRoomMapper[key])) {
          assignedRoom = [...assignedRoom, key];
        }
      });

      activityAllowedRooms = {
        ...activityAllowedRooms,
        [roomActivityNumber]: assignedRoom,
      };
    });

    setActivityAllowedLecturers(activityAllowedLecturers);
    setActivityAllowedRooms(activityAllowedRooms);
  };

  const parseUserInputToSolverData = () => {
    setModuleMapperHelper(userInput);
    setActivityTimeHelper(userInput);
    setLecturerMapperHelper(userInput);
    setRoomMapperHelper(userInput);
    setAssignedMapperHelper(userInput);

    let data = {
      nb_activities: Object.keys(moduleMapper).length,
      nb_lecturers: Object.keys(lecturerMapper).length,
      nb_rooms: Object.keys(roomMapper).length,
      activity_allowed_times: activityAllowedTime,
      activity_preferred_times: activityPreferredTime,
      lecturer_allowed_times: lecturerAllowedTime,
      lecturer_preferred_times: lecturerPreferredTime,
      activity_allowed_rooms: activityAllowedLecturers,
      room_allowed_times: roomAllowedTime,
      room_preferred_times: roomPreferredTime,
      activity_allowed_lecturers: activityAllowedRooms,
      activities_on_seperate_days: [],
    };

    // console.log(data)
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

          setActivityAllowedTimeSlot([
            ["1", "9"],
            ["1", "10"],
            ["1", "11"],
            ["1", "12"],
            ["1", "13"],
            ["1", "14"],
            ["1", "15"],
            ["1", "16"],
            ["2", "9"],
            ["2", "10"],
            ["2", "11"],
            ["2", "12"],
            ["2", "13"],
            ["2", "14"],
            ["2", "15"],
            ["2", "16"],
            ["3", "9"],
            ["3", "10"],
            ["3", "11"],
            ["3", "12"],
            ["3", "13"],
            ["3", "14"],
            ["3", "15"],
            ["3", "16"],
            ["4", "9"],
            ["4", "10"],
            ["4", "11"],
            ["4", "12"],
            ["4", "13"],
            ["4", "14"],
            ["4", "15"],
            ["4", "16"],
            ["5", "9"],
            ["5", "10"],
            ["5", "11"],
            ["5", "12"],
            ["5", "13"],
            ["5", "14"],
            ["5", "15"],
            ["5", "16"],
          ]);
          setActivityPreferredTimeSlot([]);
          setActivityTimeSlotStatus({
            1: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            2: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            3: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            4: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            5: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
          });

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
          setActivityAllowedTimeSlot([
            ["1", "9"],
            ["1", "10"],
            ["1", "11"],
            ["1", "12"],
            ["1", "13"],
            ["1", "14"],
            ["1", "15"],
            ["1", "16"],
            ["2", "9"],
            ["2", "10"],
            ["2", "11"],
            ["2", "12"],
            ["2", "13"],
            ["2", "14"],
            ["2", "15"],
            ["2", "16"],
            ["3", "9"],
            ["3", "10"],
            ["3", "11"],
            ["3", "12"],
            ["3", "13"],
            ["3", "14"],
            ["3", "15"],
            ["3", "16"],
            ["4", "9"],
            ["4", "10"],
            ["4", "11"],
            ["4", "12"],
            ["4", "13"],
            ["4", "14"],
            ["4", "15"],
            ["4", "16"],
            ["5", "9"],
            ["5", "10"],
            ["5", "11"],
            ["5", "12"],
            ["5", "13"],
            ["5", "14"],
            ["5", "15"],
            ["5", "16"],
          ]);
          setActivityPreferredTimeSlot([]);
          setActivityTimeSlotStatus({
            1: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            2: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            3: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            4: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            5: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
          });

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
          setActivityAllowedTimeSlot([
            ["1", "9"],
            ["1", "10"],
            ["1", "11"],
            ["1", "12"],
            ["1", "13"],
            ["1", "14"],
            ["1", "15"],
            ["1", "16"],
            ["2", "9"],
            ["2", "10"],
            ["2", "11"],
            ["2", "12"],
            ["2", "13"],
            ["2", "14"],
            ["2", "15"],
            ["2", "16"],
            ["3", "9"],
            ["3", "10"],
            ["3", "11"],
            ["3", "12"],
            ["3", "13"],
            ["3", "14"],
            ["3", "15"],
            ["3", "16"],
            ["4", "9"],
            ["4", "10"],
            ["4", "11"],
            ["4", "12"],
            ["4", "13"],
            ["4", "14"],
            ["4", "15"],
            ["4", "16"],
            ["5", "9"],
            ["5", "10"],
            ["5", "11"],
            ["5", "12"],
            ["5", "13"],
            ["5", "14"],
            ["5", "15"],
            ["5", "16"],
          ]);
          setActivityPreferredTimeSlot([]);
          setActivityTimeSlotStatus({
            1: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            2: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            3: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            4: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
            5: {
              9: 1,
              10: 1,
              11: 1,
              12: 1,
              13: 1,
              14: 1,
              15: 1,
              16: 1,
              // '17': 1,
              // '18': 0
            },
          });

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

  const timeSlotRender = () => {
    return (
      <ThemeProvider theme={theme}>
        <div className={styles.timeSlot}>
          <div className={styles.helper}>
            <div className={styles.helperWrapper}>
              <div className={styles.allowed} />
              <div className={styles.helperText}>Allowed Time Slot</div>
              <Tooltip
                title={
                  "Allowed timeslot is the number of hours during which classes are available. Preferred timeslot is the preferred timeslot. Since the preferred timeslot is more important than the allowed timeslot, there is a high probability that the class will be assigned to the preferred timeslot."
                }
              >
                <Info />
              </Tooltip>
            </div>
            <div className={styles.helperWrapper}>
              <div className={styles.preferred} />
              <div className={styles.helperText}>Preferred Time Slot</div>
              <div />
            </div>
          </div>
          <div></div>
          <div />
          <Button
            onClick={() => timeSlotColumnHandler(1)}
            color="gray"
            className={styles.timeSlotHeader}
          >
            Monday
          </Button>
          <Button
            onClick={() => timeSlotColumnHandler(2)}
            color="gray"
            className={styles.timeSlotHeader}
          >
            Tuesday
          </Button>
          <Button
            onClick={() => timeSlotColumnHandler(3)}
            color="gray"
            className={styles.timeSlotHeader}
          >
            Wednesday
          </Button>
          <Button
            onClick={() => timeSlotColumnHandler(4)}
            color="gray"
            className={styles.timeSlotHeader}
          >
            Thursday
          </Button>
          <Button
            onClick={() => timeSlotColumnHandler(5)}
            color="gray"
            className={styles.timeSlotHeader}
          >
            Friday
          </Button>

          <div className={styles.timeHeader}>
            <Button
              color="gray"
              onClick={() => timeSlotRowHandler(9)}
              className={styles.timeHeaderValue}
            >
              9.00
            </Button>
          </div>
          <div className={styles.borderLine} />
          <Button
            onClick={() => timeSlotHandler(1, 9)}
            variant={activityTimeSlotStatus[1][9] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[1][9] === 0
                ? "white"
                : activityTimeSlotStatus[1][9] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[1][9] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[1][9] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[1][9] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(2, 9)}
            variant={activityTimeSlotStatus[2][9] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[2][9] === 0
                ? "white"
                : activityTimeSlotStatus[2][9] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[2][9] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[2][9] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[2][9] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(3, 9)}
            variant={activityTimeSlotStatus[3][9] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[3][9] === 0
                ? "white"
                : activityTimeSlotStatus[3][9] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[3][9] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[3][9] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[3][9] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(4, 9)}
            variant={activityTimeSlotStatus[4][9] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[4][9] === 0
                ? "white"
                : activityTimeSlotStatus[4][9] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[4][9] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[4][9] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[4][9] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(5, 9)}
            variant={activityTimeSlotStatus[5][9] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[5][9] === 0
                ? "white"
                : activityTimeSlotStatus[5][9] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[5][9] === 0
                ? styles.timeSlotLastCellNone
                : styles.timeSlotLastCell
            }
          >
            {activityTimeSlotStatus[5][9] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[5][9] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>

          <div className={styles.timeHeader}>
            <Button
              color="gray"
              onClick={() => timeSlotRowHandler(10)}
              className={styles.timeHeaderValue}
            >
              10.00
            </Button>
          </div>
          <div className={styles.borderLine} />
          <Button
            onClick={() => timeSlotHandler(1, 10)}
            variant={activityTimeSlotStatus[1][10] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[1][10] === 0
                ? "white"
                : activityTimeSlotStatus[1][10] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[1][10] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[1][10] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[1][10] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(2, 10)}
            variant={activityTimeSlotStatus[2][10] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[2][10] === 0
                ? "white"
                : activityTimeSlotStatus[2][10] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[2][10] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[2][10] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[2][10] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(3, 10)}
            variant={activityTimeSlotStatus[3][10] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[3][10] === 0
                ? "white"
                : activityTimeSlotStatus[3][10] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[3][10] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[3][10] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[3][10] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(4, 10)}
            variant={activityTimeSlotStatus[4][10] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[4][10] === 0
                ? "white"
                : activityTimeSlotStatus[4][10] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[4][10] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[4][10] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[4][10] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(5, 10)}
            variant={activityTimeSlotStatus[5][10] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[5][10] === 0
                ? "white"
                : activityTimeSlotStatus[5][10] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[5][10] === 0
                ? styles.timeSlotLastCellNone
                : styles.timeSlotLastCell
            }
          >
            {activityTimeSlotStatus[5][10] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[5][10] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>

          <div className={styles.timeHeader}>
            <Button
              color="gray"
              onClick={() => timeSlotRowHandler(11)}
              className={styles.timeHeaderValue}
            >
              11.00
            </Button>
          </div>
          <div className={styles.borderLine} />
          <Button
            onClick={() => timeSlotHandler(1, 11)}
            variant={activityTimeSlotStatus[1][11] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[1][11] === 0
                ? "white"
                : activityTimeSlotStatus[1][11] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[1][11] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[1][11] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[1][11] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(2, 11)}
            variant={activityTimeSlotStatus[2][11] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[2][11] === 0
                ? "white"
                : activityTimeSlotStatus[2][11] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[2][11] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[2][11] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[2][11] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(3, 11)}
            variant={activityTimeSlotStatus[3][11] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[3][11] === 0
                ? "white"
                : activityTimeSlotStatus[3][11] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[3][11] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[3][11] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[3][11] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(4, 11)}
            variant={activityTimeSlotStatus[4][11] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[4][11] === 0
                ? "white"
                : activityTimeSlotStatus[4][11] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[4][11] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[4][11] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[4][11] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(5, 11)}
            variant={activityTimeSlotStatus[5][11] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[5][11] === 0
                ? "white"
                : activityTimeSlotStatus[5][11] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[5][11] === 0
                ? styles.timeSlotLastCellNone
                : styles.timeSlotLastCell
            }
          >
            {activityTimeSlotStatus[5][11] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[5][11] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>

          <div className={styles.timeHeader}>
            <Button
              color="gray"
              onClick={() => timeSlotRowHandler(12)}
              className={styles.timeHeaderValue}
            >
              12.00
            </Button>
          </div>
          <div className={styles.borderLine} />
          <Button
            onClick={() => timeSlotHandler(1, 12)}
            variant={activityTimeSlotStatus[1][12] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[1][12] === 0
                ? "white"
                : activityTimeSlotStatus[1][12] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[1][12] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[1][12] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[1][12] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(2, 12)}
            variant={activityTimeSlotStatus[2][12] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[2][12] === 0
                ? "white"
                : activityTimeSlotStatus[2][12] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[2][12] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[2][12] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[2][12] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(3, 12)}
            variant={activityTimeSlotStatus[3][12] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[3][12] === 0
                ? "white"
                : activityTimeSlotStatus[3][12] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[3][12] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[3][12] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[3][12] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(4, 12)}
            variant={activityTimeSlotStatus[4][12] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[4][12] === 0
                ? "white"
                : activityTimeSlotStatus[4][12] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[4][12] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[4][12] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[4][12] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(5, 12)}
            variant={activityTimeSlotStatus[5][12] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[5][12] === 0
                ? "white"
                : activityTimeSlotStatus[5][12] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[5][12] === 0
                ? styles.timeSlotLastCellNone
                : styles.timeSlotLastCell
            }
          >
            {activityTimeSlotStatus[5][12] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[5][12] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>

          <div className={styles.timeHeader}>
            <Button
              color="gray"
              onClick={() => timeSlotRowHandler(13)}
              className={styles.timeHeaderValue}
            >
              13.00
            </Button>
          </div>
          <div className={styles.borderLine} />
          <Button
            onClick={() => timeSlotHandler(1, 13)}
            variant={activityTimeSlotStatus[1][13] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[1][13] === 0
                ? "white"
                : activityTimeSlotStatus[1][13] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[1][13] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[1][13] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[1][13] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(2, 13)}
            variant={activityTimeSlotStatus[2][13] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[2][13] === 0
                ? "white"
                : activityTimeSlotStatus[2][13] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[2][13] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[2][13] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[2][13] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(3, 13)}
            variant={activityTimeSlotStatus[3][13] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[3][13] === 0
                ? "white"
                : activityTimeSlotStatus[3][13] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[3][13] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[3][13] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[3][13] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(4, 13)}
            variant={activityTimeSlotStatus[4][13] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[4][13] === 0
                ? "white"
                : activityTimeSlotStatus[4][13] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[4][13] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[4][13] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[4][13] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(5, 13)}
            variant={activityTimeSlotStatus[5][13] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[5][13] === 0
                ? "white"
                : activityTimeSlotStatus[5][13] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[5][13] === 0
                ? styles.timeSlotLastCellNone
                : styles.timeSlotLastCell
            }
          >
            {activityTimeSlotStatus[5][13] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[5][13] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>

          <div className={styles.timeHeader}>
            <Button
              color="gray"
              onClick={() => timeSlotRowHandler(14)}
              className={styles.timeHeaderValue}
            >
              14.00
            </Button>
          </div>
          <div className={styles.borderLine} />
          <Button
            onClick={() => timeSlotHandler(1, 14)}
            variant={activityTimeSlotStatus[1][14] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[1][14] === 0
                ? "white"
                : activityTimeSlotStatus[1][14] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[1][14] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[1][14] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[1][14] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(2, 14)}
            variant={activityTimeSlotStatus[2][14] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[2][14] === 0
                ? "white"
                : activityTimeSlotStatus[2][14] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[2][14] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[2][14] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[2][14] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(3, 14)}
            variant={activityTimeSlotStatus[3][14] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[3][14] === 0
                ? "white"
                : activityTimeSlotStatus[3][14] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[3][14] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[3][14] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[3][14] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(4, 14)}
            variant={activityTimeSlotStatus[4][14] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[4][14] === 0
                ? "white"
                : activityTimeSlotStatus[4][14] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[4][14] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[4][14] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[4][14] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(5, 14)}
            variant={activityTimeSlotStatus[5][14] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[5][14] === 0
                ? "white"
                : activityTimeSlotStatus[5][14] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[5][14] === 0
                ? styles.timeSlotLastCellNone
                : styles.timeSlotLastCell
            }
          >
            {activityTimeSlotStatus[5][14] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[5][14] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>

          <div className={styles.timeHeader}>
            <Button
              color="gray"
              onClick={() => timeSlotRowHandler(15)}
              className={styles.timeHeaderValue}
            >
              15.00
            </Button>
          </div>
          <div className={styles.borderLine} />
          <Button
            onClick={() => timeSlotHandler(1, 15)}
            variant={activityTimeSlotStatus[1][15] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[1][15] === 0
                ? "white"
                : activityTimeSlotStatus[1][15] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[1][15] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[1][15] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[1][15] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(2, 15)}
            variant={activityTimeSlotStatus[2][15] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[2][15] === 0
                ? "white"
                : activityTimeSlotStatus[2][15] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[2][15] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[2][15] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[2][15] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(3, 15)}
            variant={activityTimeSlotStatus[3][15] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[3][15] === 0
                ? "white"
                : activityTimeSlotStatus[3][15] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[3][15] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[3][15] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[3][15] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(4, 15)}
            variant={activityTimeSlotStatus[4][15] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[4][15] === 0
                ? "white"
                : activityTimeSlotStatus[4][15] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[4][15] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[4][15] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[4][15] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(5, 15)}
            variant={activityTimeSlotStatus[5][15] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[5][15] === 0
                ? "white"
                : activityTimeSlotStatus[5][15] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[5][15] === 0
                ? styles.timeSlotLastCellNone
                : styles.timeSlotLastCell
            }
          >
            {activityTimeSlotStatus[5][15] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[5][15] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>

          <div className={styles.timeHeader}>
            <Button
              color="gray"
              onClick={() => timeSlotRowHandler(16)}
              className={styles.timeHeaderValue}
            >
              16.00
            </Button>
          </div>
          <div className={styles.borderLine} />
          <Button
            onClick={() => timeSlotHandler(1, 16)}
            variant={activityTimeSlotStatus[1][16] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[1][16] === 0
                ? "white"
                : activityTimeSlotStatus[1][16] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[1][16] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[1][16] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[1][16] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(2, 16)}
            variant={activityTimeSlotStatus[2][16] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[2][16] === 0
                ? "white"
                : activityTimeSlotStatus[2][16] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[2][16] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[2][16] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[2][16] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(3, 16)}
            variant={activityTimeSlotStatus[3][16] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[3][16] === 0
                ? "white"
                : activityTimeSlotStatus[3][16] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[3][16] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[3][16] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[3][16] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(4, 16)}
            variant={activityTimeSlotStatus[4][16] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[4][16] === 0
                ? "white"
                : activityTimeSlotStatus[4][16] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[4][16] === 0
                ? styles.timeSlotCellNone
                : styles.timeSlotCell
            }
          >
            {activityTimeSlotStatus[4][16] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[4][16] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>
          <Button
            onClick={() => timeSlotHandler(5, 16)}
            variant={activityTimeSlotStatus[5][16] === 0 ? "" : "contained"}
            color={
              activityTimeSlotStatus[5][16] === 0
                ? "white"
                : activityTimeSlotStatus[5][16] === 1
                ? "allowed"
                : "preferred"
            }
            className={
              activityTimeSlotStatus[5][16] === 0
                ? styles.timeSlotLastCellNone
                : styles.timeSlotLastCell
            }
          >
            {activityTimeSlotStatus[5][16] === 0 ? (
              <Close />
            ) : activityTimeSlotStatus[5][16] === 1 ? (
              <Done />
            ) : (
              <DoneAll />
            )}
          </Button>

          {/* <div className={styles.timeHeader}>
                        <Button color='gray' onClick={() => timeSlotRowHandler(17)} className={styles.timeHeaderValue}>17.00</Button>
                    </div>
                    <div className={styles.borderLine} />
                    <Button
                        onClick={() => timeSlotHandler(1, 17)}
                        variant={activityTimeSlotStatus[1][17] === 0 ? '' : "contained"}
                        color={activityTimeSlotStatus[1][17] === 0 ? 'white' : (activityTimeSlotStatus[1][17] === 1 ? 'allowed' : 'preferred')}
                        className={styles.timeSlotCell}>
                        {activityTimeSlotStatus[1][17] === 0 ? <Close /> : (activityTimeSlotStatus[1][17] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button
                        onClick={() => timeSlotHandler(2, 17)}
                        variant={activityTimeSlotStatus[2][17] === 0 ? '' : "contained"}
                        color={activityTimeSlotStatus[2][17] === 0 ? 'white' : (activityTimeSlotStatus[2][17] === 1 ? 'allowed' : 'preferred')}
                        className={styles.timeSlotCell}>
                        {activityTimeSlotStatus[2][17] === 0 ? <Close /> : (activityTimeSlotStatus[2][17] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button
                        onClick={() => timeSlotHandler(3, 17)}
                        variant={activityTimeSlotStatus[3][17] === 0 ? '' : "contained"}
                        color={activityTimeSlotStatus[3][17] === 0 ? 'white' : (activityTimeSlotStatus[3][17] === 1 ? 'allowed' : 'preferred')}
                        className={styles.timeSlotCell}>
                        {activityTimeSlotStatus[3][17] === 0 ? <Close /> : (activityTimeSlotStatus[3][17] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button
                        onClick={() => timeSlotHandler(4, 17)}
                        variant={activityTimeSlotStatus[4][17] === 0 ? '' : "contained"}
                        color={activityTimeSlotStatus[4][17] === 0 ? 'white' : (activityTimeSlotStatus[4][17] === 1 ? 'allowed' : 'preferred')}
                        className={styles.timeSlotCell}>
                        {activityTimeSlotStatus[4][17] === 0 ? <Close /> : (activityTimeSlotStatus[4][17] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button
                        onClick={() => timeSlotHandler(5, 17)}
                        variant={activityTimeSlotStatus[5][17] === 0 ? '' : "contained"}
                        color={activityTimeSlotStatus[5][17] === 0 ? 'white' : (activityTimeSlotStatus[5][17] === 1 ? 'allowed' : 'preferred')}
                        className={activityTimeSlotStatus[1][9] === 0 ? styles.timeSlotLastCellNone : styles.timeSlotLastCell}>
                        {activityTimeSlotStatus[5][17] === 0 ? <Close /> : (activityTimeSlotStatus[5][17] === 1 ? <Done /> : <DoneAll />)}
                    </Button> */}
        </div>
      </ThemeProvider>
    );
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

            {timeSlotRender()}
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
            {timeSlotRender()}
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
              {/* <TextField
                            color="gray"
                            required
                            id="standard-required"
                            label="Capacity"
                            variant="standard"
                            type="number"
                            value={roomCapacity}
                            onInput={(e) => {
                                e.target.value = e.target.value < 1 ? 1 : e.target.value
                            }}
                            onChange={(event) => setRoomCapacity(event.target.value)}
                            className={styles.input}
                        /> */}
            </ThemeProvider>
            {timeSlotRender()}
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
        setActivityAllowedTimeSlot([
          ["1", "9"],
          ["1", "10"],
          ["1", "11"],
          ["1", "12"],
          ["1", "13"],
          ["1", "14"],
          ["1", "15"],
          ["1", "16"],
          ["2", "9"],
          ["2", "10"],
          ["2", "11"],
          ["2", "12"],
          ["2", "13"],
          ["2", "14"],
          ["2", "15"],
          ["2", "16"],
          ["3", "9"],
          ["3", "10"],
          ["3", "11"],
          ["3", "12"],
          ["3", "13"],
          ["3", "14"],
          ["3", "15"],
          ["3", "16"],
          ["4", "9"],
          ["4", "10"],
          ["4", "11"],
          ["4", "12"],
          ["4", "13"],
          ["4", "14"],
          ["4", "15"],
          ["4", "16"],
          ["5", "9"],
          ["5", "10"],
          ["5", "11"],
          ["5", "12"],
          ["5", "13"],
          ["5", "14"],
          ["5", "15"],
          ["5", "16"],
        ]);
        setActivityPreferredTimeSlot([]);
        setActivityTimeSlotStatus({
          1: {
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            // '17': 1,
            // '18': 0
          },
          2: {
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            // '17': 1,
            // '18': 0
          },
          3: {
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            // '17': 1,
            // '18': 0
          },
          4: {
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            // '17': 1,
            // '18': 0
          },
          5: {
            9: 1,
            10: 1,
            11: 1,
            12: 1,
            13: 1,
            14: 1,
            15: 1,
            16: 1,
            // '17': 1,
            // '18': 0
          },
        });
        setRowHandlerIndex({
          9: 1,
          10: 1,
          11: 1,
          12: 1,
          13: 1,
          14: 1,
          15: 1,
          16: 1,
        });
        setColumnHandlerIndex({
          1: 1,
          2: 1,
          3: 1,
          4: 1,
          5: 1,
        });
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

  React.useEffect(() => {
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
    // return () => {
    //     // Anything in here is fired on component unmount.
    // }
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
              {/* <Button
                                color="gray"
                                className={styles.addButton}
                                variant="contained"
                                onClick={() => addNewActivity(activityName)}
                            >
                                Add
                            </Button> */}
            </ThemeProvider>
          </div>
        </div>
      </Modal>
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
      <ThemeProvider theme={theme}>
        <Button
          className={styles.containerImportButton}
          color="gray"
          variant="contained"
          onClick={importModalHandleOpen}
        >
          Import
        </Button>
        <Button
          className={styles.containerExportButton}
          color="gray"
          variant="contained"
          onClick={exportJson}
        >
          Export
        </Button>
      </ThemeProvider>
    </div>
  );
};

export default GeneratePage;
