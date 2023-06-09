import * as React from "react";

import IconButton from "@mui/material/IconButton";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import styles from "../assets/pages/EditPage.module.css";
import { ExpandLess, ExpandMore, ModeEdit, Delete } from "@mui/icons-material";
import { Autocomplete, Chip, TextField, Button } from "@mui/material";
import Timeslot from "../components/Timeslot/Timeslot";

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
      contrastText: "#fff",
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

class EditPage extends React.Component {
  constructor() {
    super();

    let stringUserInfo = localStorage.getItem("userInfo");
    let userInfo = {};
    let editState = {
      module: {},
      activity: {},
      lecturer: {},
      room: {},
      assigned: {},
    };

    let originalUserInfo = {};

    if (stringUserInfo) {
      userInfo = JSON.parse(stringUserInfo);
      originalUserInfo = JSON.parse(stringUserInfo);

      if (userInfo) {
        Object.keys(userInfo).forEach((key) => {
          switch (key) {
            case "umodules":
              Object.keys(userInfo[key]).forEach((moduleID) => {
                editState = {
                  ...editState,
                  module: {
                    ...editState.module,
                    [moduleID]: false,
                  },
                };
              });
              break;
            case "activities":
              Object.keys(userInfo[key]).forEach((moduleID) => {
                Object.keys(userInfo[key][moduleID]).forEach((activity) => {
                  editState = {
                    ...editState,
                    activity: {
                      ...editState.activity,
                      [moduleID + "." + activity]: false,
                    },
                  };
                });
              });
              break;
            case "lecturers":
              Object.keys(userInfo[key]).forEach((lecturer) => {
                editState = {
                  ...editState,
                  lecturer: {
                    ...editState.lecturer,
                    [lecturer]: false,
                  },
                };
              });
              break;
            case "rooms":
              Object.keys(userInfo[key]).forEach((room) => {
                editState = {
                  ...editState,
                  room: {
                    ...editState.room,
                    [room]: false,
                  },
                };
              });
              break;
            case "assigned":
              Object.keys(userInfo[key]).forEach((type) => {
                Object.keys(userInfo[key][type]).forEach((activity) => {
                  editState = {
                    ...editState,
                    assigned: {
                      ...editState.assigned,
                      [activity + ":" + type]: false,
                    },
                  };
                });
              });
              break;
          }
        });
      }
    }

    this.state = {
      userInput: userInfo,
      moduleEditStatus: editState,
      expandState: {
        modules: true,
        activities: true,
        lecturers: true,
        rooms: true,
        assigned: true,
      },
      tempText: "",
      timeslot: {},
      originalUserInfo: originalUserInfo,
    };
  }

  deleteState = (tab, id) => {
    if (window.confirm("This will remove other contents as well")) {
      if (tab === "module") {
        let moduleState = this.state.userInput.umodules;
        delete moduleState[id];

        let activityState = this.state.userInput.activities;

        let assignedLecturer = this.state.userInput.assigned.lecturers;
        let assignedRoom = this.state.userInput.assigned.rooms;

        Object.keys(activityState).forEach((moduleID) => {
          if (id === moduleID) {
            Object.keys(activityState[moduleID]).forEach((activity) => {
              delete assignedLecturer[moduleID + "." + activity];
              delete assignedRoom[moduleID + "." + activity];
            });
          }
        });

        delete activityState[id];

        this.setState({
          userInput: {
            ...this.state.userInput,
            umodules: {
              ...moduleState,
            },
            activities: {
              ...activityState,
            },
            assigned: {
              lecturers: {
                ...assignedLecturer,
              },
              rooms: {
                ...assignedRoom,
              },
            },
          },
        });
      } else if (tab === "activity") {
        let activityState = this.state.userInput.activities;

        let assignedLecturer = this.state.userInput.assigned.lecturers;
        let assignedRoom = this.state.userInput.assigned.rooms;

        Object.keys(activityState).forEach((moduleID) => {
          Object.keys(activityState[moduleID]).forEach((activity) => {
            if (id === moduleID + "." + activity) {
              delete assignedLecturer[moduleID + "." + activity];
              delete assignedRoom[moduleID + "." + activity];
              delete activityState[moduleID][activity];
            }
          });
        });

        delete activityState[id];

        this.setState({
          userInput: {
            ...this.state.userInput,
            activities: {
              ...activityState,
            },
            assigned: {
              lecturers: {
                ...assignedLecturer,
              },
              rooms: {
                ...assignedRoom,
              },
            },
          },
        });
      } else if (tab === "lecturer") {
        let assignedLecturer = this.state.userInput.assigned.lecturers;
        let lecturers = this.state.userInput.lecturers;

        Object.keys(lecturers).forEach((lecturer) => {
          if (id === lecturer) {
            delete lecturers[lecturer];
          }
        });

        Object.keys(assignedLecturer).forEach((moduleActivity) => {
          if (assignedLecturer[moduleActivity].includes(id)) {
            assignedLecturer[moduleActivity].splice(
              assignedLecturer[moduleActivity].indexOf(id),
              1
            );
          }
        });

        this.setState({
          userInput: {
            ...this.state.userInput,
            lecturers: {
              ...lecturers,
            },
            assigned: {
              ...this.state.userInput.assigned,
              lecturers: {
                ...assignedLecturer,
              },
            },
          },
        });
      } else if (tab === "room") {
        let assignedRoom = this.state.userInput.assigned.rooms;
        let rooms = this.state.userInput.rooms;

        Object.keys(rooms).forEach((room) => {
          if (id === room) {
            delete rooms[room];
          }
        });

        Object.keys(assignedRoom).forEach((moduleActivity) => {
          if (assignedRoom[moduleActivity].includes(id)) {
            assignedRoom[moduleActivity].splice(
              assignedRoom[moduleActivity].indexOf(id),
              1
            );
          }
        });

        this.setState({
          userInput: {
            ...this.state.userInput,
            rooms: {
              ...rooms,
            },
            assigned: {
              ...this.state.userInput.assigned,
              rooms: {
                ...assignedRoom,
              },
            },
          },
        });
      } else if (tab === "assigned") {
        let assignedState = this.state.userInput.assigned;

        delete assignedState["lecturers"][id];
        delete assignedState["rooms"][id];

        this.setState({
          userInput: {
            ...this.state.userInput,
            assigned: {
              ...assignedState,
            },
          },
        });
      }
    }
  };

  editState = (tab, id) => {
    // if true localstorage 값 변경하기
    if (this.state.moduleEditStatus[tab][id]) {
      // module
      if (tab === "module") {
        let changedValue = this.state.userInput.umodules[id].id;

        if (changedValue === id) {
          let moduleEditStatus = this.state.moduleEditStatus;
          Object.keys(moduleEditStatus).forEach((eachTab) => {
            Object.keys(moduleEditStatus[eachTab]).forEach((eachID) => {
              if (id === eachID && tab === eachTab) {
                moduleEditStatus[eachTab][eachID] =
                  !moduleEditStatus[eachTab][eachID];
              } else {
                moduleEditStatus[eachTab][eachID] = false;
              }
            });
          });

          this.setState({
            moduleEditStatus: moduleEditStatus,
          });
          return;
        }

        let outterModuleEditStatus = this.state.moduleEditStatus;
        let innerModuleEditStatus = this.state.moduleEditStatus[tab];
        let moduleState = this.state.userInput.umodules;
        let activityState = this.state.userInput.activities;

        let assignedLecturer = this.state.userInput.assigned.lecturers;
        let assignedRoom = this.state.userInput.assigned.rooms;

        Object.keys(activityState).forEach((moduleID) => {
          if (id === moduleID) {
            if (activityState[moduleID]) {
              Object.keys(activityState[moduleID]).forEach((activity) => {
                assignedLecturer[
                  this.state.userInput.umodules[id].id + "." + activity
                ] = assignedLecturer[id + "." + activity];
                delete assignedLecturer[moduleID + "." + activity];

                assignedRoom[
                  this.state.userInput.umodules[id].id + "." + activity
                ] = assignedRoom[id + "." + activity];
                delete assignedRoom[moduleID + "." + activity];
              });
            }
          }
        });

        moduleState[changedValue] = moduleState[id];
        delete moduleState[id];

        activityState[this.state.userInput.umodules[changedValue].id] =
          activityState[id];
        delete activityState[id];

        outterModuleEditStatus[tab][changedValue] =
          outterModuleEditStatus[tab][id];
        delete outterModuleEditStatus[tab][id];

        Object.keys(outterModuleEditStatus.activity).forEach((key) => {
          if (key.includes(id)) {
            let newKey = key.replace(id, changedValue);

            outterModuleEditStatus.activity[newKey] =
              outterModuleEditStatus.activity[key];
            delete outterModuleEditStatus.activity[key];
          }
        });
        Object.keys(outterModuleEditStatus.assigned).forEach((key) => {
          if (key.includes(id)) {
            let newKey = key.replace(id, changedValue);

            outterModuleEditStatus.assigned[newKey] =
              outterModuleEditStatus.assigned[key];
            delete outterModuleEditStatus.assigned[key];
          }
        });
      } else if (tab === "lecturer") {
        if (this.state.tempText) {
          let lecturerState = this.state.userInput.lecturers;
          let innerModuleEditStatus = this.state.moduleEditStatus[tab];

          let assignedLecturer = this.state.userInput.assigned.lecturers;

          lecturerState[this.state.tempText] = lecturerState[id];
          delete lecturerState[id];

          innerModuleEditStatus[this.state.tempText] =
            innerModuleEditStatus[id];
          delete innerModuleEditStatus[id];

          Object.keys(assignedLecturer).forEach((key) => {
            let index = assignedLecturer[key].indexOf(id);

            if (index >= 0) {
              assignedLecturer[key][index] = this.state.tempText;
            }
          });

          this.setState({
            userInput: {
              ...this.state.userInput,
              lecturers: {
                ...lecturerState,
              },
              assigned: {
                lecturers: {
                  ...assignedLecturer,
                },
                rooms: {
                  ...this.state.userInput.assigned.rooms,
                },
              },
            },
            tempText: "",
          });
        }
      } else if (tab === "room") {
        if (this.state.tempText) {
          let roomState = this.state.userInput.rooms;
          let innerModuleEditStatus = this.state.moduleEditStatus[tab];

          let assignedRoom = this.state.userInput.assigned.rooms;

          roomState[this.state.tempText] = roomState[id];
          delete roomState[id];

          innerModuleEditStatus[this.state.tempText] =
            innerModuleEditStatus[id];
          delete innerModuleEditStatus[id];

          Object.keys(assignedRoom).forEach((key) => {
            let index = assignedRoom[key].indexOf(id);

            if (index >= 0) {
              assignedRoom[key][index] = this.state.tempText;
            }
          });

          this.setState({
            userInput: {
              ...this.state.userInput,
              rooms: {
                ...roomState,
              },
              assigned: {
                lecturers: {
                  ...this.state.userInput.assigned.lecturers,
                },
                rooms: {
                  ...assignedRoom,
                },
              },
            },
            tempText: "",
          });
        }
      } else if (tab === "assigned") {
      }
    }

    let moduleEditStatus = this.state.moduleEditStatus;

    Object.keys(moduleEditStatus).forEach((eachTab) => {
      Object.keys(moduleEditStatus[eachTab]).forEach((eachID) => {
        if (id === eachID && tab === eachTab) {
          moduleEditStatus[eachTab][eachID] =
            !moduleEditStatus[eachTab][eachID];
        } else {
          moduleEditStatus[eachTab][eachID] = false;
        }
      });
    });

    this.setState({
      moduleEditStatus: moduleEditStatus,
    });
  };

  editMoudleHandler = (event, tab, id) => {
    switch (tab) {
      case "module":
        this.setState({
          userInput: {
            ...this.state.userInput,
            umodules: {
              ...this.state.userInput.umodules,
              [id]: {
                ...this.state.userInput.umodules[id],
                id: event.target.value,
              },
            },
          },
        });
        break;
      case "lecturer":
        this.setState({
          tempText: event.target.value,
        });
        break;
      case "room":
        this.setState({
          tempText: event.target.value,
        });
        break;
    }
  };

  setActivityPerWeek = (value, moduleID, activity) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        activities: {
          ...this.state.userInput.activities,
          [moduleID]: {
            ...this.state.userInput.activities[moduleID],
            [activity]: {
              ...this.state.userInput.activities[moduleID][activity],
              activityPerWeek: value,
            },
          },
        },
      },
    });
  };

  setTimeslot = (tab, index, value) => {
    let activities = this.state.userInput.activities;
    // console.log(activities)
    let lecturers = this.state.userInput.lecturers;
    let rooms = this.state.userInput.rooms;

    switch (tab) {
      case "activities":
        let positions = index.split(".");
        Object.keys(activities).forEach((moduleID) => {
          if (moduleID === positions[0]) {
            Object.keys(activities[moduleID]).forEach((activity) => {
              if (activity === positions[1]) {
                activities[moduleID][activity] = value;
              }
            });
          }
        });
        // console.log(activities)
        break;
      case "lecturers":
        Object.keys(lecturers).forEach((lecturer) => {
          if (lecturer === index) {
            lecturers[lecturer] = value;
          }
        });
        break;
      case "rooms":
        Object.keys(rooms).forEach((room) => {
          if (room === index) {
            rooms[room] = value;
          }
        });
        break;
    }

    this.setState({
      userInput: {
        ...this.state.userInput,
        activities: {
          ...activities,
        },
        lecturers: {
          ...lecturers,
        },
        rooms: {
          ...rooms,
        },
      },
    });
  };

  renderMoudle = () => {
    let tempDiv = [];

    if (this.state.userInput) {
      if (this.state.userInput.umodules) {
        Object.keys(this.state.userInput.umodules).forEach((moduleID) => {
          let tempActivitiesDiv = [];

          this.state.userInput.umodules[moduleID].activities.forEach(
            (activity) => {
              tempActivitiesDiv = [
                ...tempActivitiesDiv,
                <div className={styles.activityBox} key={activity}>
                  {activity}
                </div>,
              ];
            }
          );
          tempDiv = [
            ...tempDiv,
            <ThemeProvider key={"Theme:" + moduleID} theme={theme}>
              <div key={moduleID.id} className={styles.module}>
                <div className={styles.moduleID}>
                  {this.state.moduleEditStatus.module[moduleID] ? (
                    <TextField
                      color="gray"
                      size="small"
                      defaultValue={this.state.userInput.umodules[moduleID].id}
                      onChange={(event) =>
                        this.editMoudleHandler(event, "module", moduleID)
                      }
                    />
                  ) : (
                    this.state.userInput.umodules[moduleID].id
                  )}
                </div>
                <IconButton
                  className={styles.iconButton}
                  onClick={() => this.editState("module", moduleID)}
                  aria-label="delete"
                >
                  <ModeEdit />
                </IconButton>
                <IconButton
                  className={styles.deleteButton}
                  onClick={() => this.deleteState("module", moduleID)}
                  aria-label="delete"
                >
                  <Delete />
                </IconButton>
                <div>
                  <div className={styles.activityTitle}>Activities:</div>
                  <div className={styles.activitiesContainer}>
                    {tempActivitiesDiv}
                  </div>
                </div>
              </div>
            </ThemeProvider>,
          ];
        });
      }

      return tempDiv;
    }
  };

  renderActivity = () => {
    let tempDiv = [];
    let newTimeslot = {};
    // console.log(this.state.userInput.activities)

    if (this.state.userInput) {
      if (this.state.userInput.activities) {
        Object.keys(this.state.userInput.activities).forEach((moduleID) => {
          if (this.state.userInput.activities[moduleID]) {
            Object.keys(this.state.userInput.activities[moduleID]).forEach(
              (activity) => {
                newTimeslot = {
                  ...newTimeslot,
                  [moduleID + "." + activity]:
                    this.state.userInput.activities[moduleID][activity],
                };

                tempDiv = [
                  ...tempDiv,
                  <ThemeProvider
                    key={"Theme:" + moduleID + "." + activity}
                    theme={theme}
                  >
                    <div
                      key={moduleID + "." + activity}
                      className={styles.timeslotContainer}
                    >
                      <TextField
                        color="gray"
                        required
                        id="standard-required"
                        label="Class per week"
                        variant="standard"
                        className={styles.input}
                        type="number"
                        value={
                          this.state.userInput.activities[moduleID][activity]
                            .activityPerWeek
                        }
                        disabled={
                          !this.state.moduleEditStatus.activity[
                            moduleID + "." + activity
                          ]
                        }
                        InputProps={{ inputProps: { min: 1, max: 5 } }}
                        onChange={(event) =>
                          this.setActivityPerWeek(
                            event.target.value,
                            moduleID,
                            activity
                          )
                        }
                      />
                      <div className={styles.timeslotHeader}>
                        {moduleID}:{activity}
                      </div>
                      <IconButton
                        className={styles.timeslotIconButton}
                        onClick={() =>
                          this.editState("activity", moduleID + "." + activity)
                        }
                        aria-label="delete"
                      >
                        <ModeEdit />
                      </IconButton>
                      <IconButton
                        className={styles.timeslotDeleteIconButton}
                        onClick={() =>
                          this.deleteState(
                            "activity",
                            moduleID + "." + activity
                          )
                        }
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                      <Timeslot
                        disabled={
                          !this.state.moduleEditStatus.activity[
                            moduleID + "." + activity
                          ]
                        }
                        setTimeslot={this.setTimeslot}
                        tab="activities"
                        index={moduleID + "." + activity}
                        timeslot={
                          this.state.userInput.activities[moduleID][activity]
                        }
                      />
                    </div>
                  </ThemeProvider>,
                ];
              }
            );
          }
        });
      }

      return tempDiv;
    }
  };

  renderLecturer = () => {
    let tempDiv = [];

    if (this.state.userInput) {
      if (this.state.userInput.lecturers) {
        Object.keys(this.state.userInput.lecturers).forEach((lecturer) => {
          tempDiv = [
            ...tempDiv,
            <ThemeProvider key={"Theme:" + lecturer} theme={theme}>
              <div key={lecturer} className={styles.timeslotContainer}>
                <div className={styles.timeslotHeader}>
                  {this.state.moduleEditStatus.lecturer[lecturer] ? (
                    <TextField
                      color="gray"
                      size="small"
                      defaultValue={lecturer}
                      onChange={(event) =>
                        this.editMoudleHandler(event, "lecturer", lecturer)
                      }
                    />
                  ) : (
                    lecturer
                  )}
                </div>
                <IconButton
                  className={styles.timeslotIconButton}
                  onClick={() => this.editState("lecturer", lecturer)}
                  aria-label="delete"
                >
                  <ModeEdit />
                </IconButton>
                <IconButton
                  className={styles.timeslotDeleteIconButton}
                  onClick={() => this.deleteState("lecturer", lecturer)}
                  aria-label="delete"
                >
                  <Delete />
                </IconButton>
                <Timeslot
                  setTimeslot={this.setTimeslot}
                  disabled={!this.state.moduleEditStatus.lecturer[lecturer]}
                  tab="lecturers"
                  index={lecturer}
                  timeslot={this.state.userInput.lecturers[lecturer]}
                />
              </div>
            </ThemeProvider>,
          ];
        });
      }
    }

    return tempDiv;
    // }
  };

  renderRoom = () => {
    let tempDiv = [];

    if (this.state.userInput) {
      if (this.state.userInput.rooms) {
        Object.keys(this.state.userInput.rooms).forEach((room) => {
          tempDiv = [
            ...tempDiv,
            <ThemeProvider key={"Theme:" + room} theme={theme}>
              <div key={room} className={styles.timeslotContainer}>
                <div className={styles.timeslotHeader}>
                  {this.state.moduleEditStatus.room[room] ? (
                    <TextField
                      color="gray"
                      size="small"
                      defaultValue={room}
                      onChange={(event) =>
                        this.editMoudleHandler(event, "room", room)
                      }
                    />
                  ) : (
                    room
                  )}
                </div>
                <IconButton
                  className={styles.timeslotIconButton}
                  onClick={() => this.editState("room", room)}
                  aria-label="delete"
                >
                  <ModeEdit />
                </IconButton>
                <IconButton
                  className={styles.timeslotDeleteIconButton}
                  onClick={() => this.deleteState("room", room)}
                  aria-label="delete"
                >
                  <Delete />
                </IconButton>
                <Timeslot
                  setTimeslot={this.setTimeslot}
                  disabled={!this.state.moduleEditStatus.room[room]}
                  tab="rooms"
                  index={room}
                  timeslot={this.state.userInput.rooms[room]}
                />
              </div>
            </ThemeProvider>,
          ];
        });
      }
    }

    return tempDiv;
  };

  renderAssigned = () => {
    let tempDiv = [];

    let lecturers = [];
    let rooms = [];

    if (!this.state.userInput.lecturers) {
      return;
    }

    Object.keys(this.state.userInput.lecturers).forEach((lecturer) => {
      lecturers.push(lecturer);
    });

    Object.keys(this.state.userInput.rooms).forEach((room) => {
      rooms.push(room);
    });

    let assignedLecturers = this.state.userInput.assigned.lecturers;
    let assignedRooms = this.state.userInput.assigned.rooms;

    Object.keys(assignedLecturers).forEach((activity) => {
      tempDiv = [
        ...tempDiv,
        <div key={activity} className={styles.module}>
          <IconButton
            className={styles.iconButton}
            onClick={() => this.editState("assigned", activity + ":lecturers")}
            aria-label="delete"
          >
            <ModeEdit />
          </IconButton>
          <IconButton
            className={styles.deleteButton}
            onClick={() =>
              this.deleteState("assigned", activity + ":lecturers")
            }
            aria-label="delete"
          >
            <Delete />
          </IconButton>
          <div className={styles.assignedID}>{activity}</div>
          <div className={styles.assignedType}>Lecturers</div>
          <ThemeProvider theme={theme}>
            <Autocomplete
              className={styles.assignInput}
              options={lecturers}
              multiple
              disabled={
                !this.state.moduleEditStatus.assigned[activity + ":lecturers"]
              }
              value={assignedLecturers[activity]}
              onChange={(event, newValue) => {
                this.editAssignedLecturer(activity, newValue);
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
        </div>,
      ];
    });

    Object.keys(assignedRooms).forEach((activity) => {
      tempDiv = [
        ...tempDiv,
        <div key={"room:" + activity} className={styles.module}>
          <IconButton
            className={styles.iconButton}
            onClick={() => this.editState("assigned", activity + ":rooms")}
            aria-label="delete"
          >
            <ModeEdit />
          </IconButton>
          <IconButton
            className={styles.deleteButton}
            onClick={() => this.deleteState("assigned", activity + ":rooms")}
            aria-label="delete"
          >
            <Delete />
          </IconButton>
          <div className={styles.assignedID}>{activity}</div>
          <div className={styles.assignedType}>Rooms</div>
          <ThemeProvider theme={theme}>
            <Autocomplete
              className={styles.assignInput}
              options={rooms}
              multiple
              value={assignedRooms[activity]}
              disabled={
                !this.state.moduleEditStatus.assigned[activity + ":rooms"]
              }
              onChange={(event, newValue) => {
                this.editAssignedRoom(activity, newValue);
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
                  label="Assign a room for the activity"
                  color="gray"
                  variant="standard"
                />
              )}
            />
          </ThemeProvider>
        </div>,
      ];
    });
    return tempDiv;
  };

  editAssignedLecturer = (activity, newValue) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        assigned: {
          ...this.state.userInput.assigned,
          lecturers: {
            ...this.state.userInput.assigned.lecturers,
            [activity]: newValue,
          },
        },
      },
    });
  };

  editAssignedRoom = (activity, newValue) => {
    this.setState({
      userInput: {
        ...this.state.userInput,
        assigned: {
          ...this.state.userInput.assigned,
          rooms: {
            ...this.state.userInput.assigned.rooms,
            [activity]: newValue,
          },
        },
      },
    });
  };

  expand = (value) => {
    this.setState({
      expandState: {
        ...this.state.expandState,
        [value]: !this.state.expandState[value],
      },
    });
  };

  saveChange = () => {
    if (window.confirm("Do you want to save the changes?")) {
      localStorage.setItem("userInfo", JSON.stringify(this.state.userInput));

      let newModuleEditStatus = this.state.moduleEditStatus;

      Object.keys(newModuleEditStatus).forEach((tab) => {
        Object.keys(newModuleEditStatus[tab]).forEach((index) => {
          newModuleEditStatus[tab][index] = false;
        });
      });

      this.setState({
        originalUserInfo: this.state.userInput,
        tempText: "",
        moduleEditStatus: newModuleEditStatus,
      });
    }
  };

  render() {
    return (
      <div className={styles.page}>
        <ThemeProvider theme={theme}>
          <Button
            disabled={
              JSON.stringify(this.state.userInput) ===
              JSON.stringify(this.state.originalUserInfo)
            }
            variant="contained"
            color="gray"
            className={styles.saveButton}
            onClick={this.saveChange}
          >
            SAVE CHANGE
          </Button>
          <div className={styles.header}>
            <div className={styles.headerTitle}>Modules (Classes)</div>
            <IconButton
              className={styles.iconButton}
              onClick={() => this.expand("modules")}
              aria-label="delete"
            >
              {this.state.expandState.modules ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <div
              className={
                this.state.expandState.modules ? styles.expand : styles.shrink
              }
            >
              {this.renderMoudle()}
            </div>
          </div>
          <div className={styles.header}>
            <div className={styles.headerTitle}>Activities</div>
            <IconButton
              className={styles.iconButton}
              onClick={() => this.expand("activities")}
              aria-label="delete"
            >
              {this.state.expandState.activities ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </IconButton>
            <div
              className={
                this.state.expandState.activities
                  ? styles.expandActivity
                  : styles.shrinkActivity
              }
            >
              {this.renderActivity()}
            </div>
          </div>
          <div className={styles.header}>
            <div className={styles.headerTitle}>Lecturers (Staffs)</div>
            <IconButton
              className={styles.iconButton}
              onClick={() => this.expand("lecturers")}
              aria-label="delete"
            >
              {this.state.expandState.lecturers ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </IconButton>
            <div
              className={
                this.state.expandState.lecturers
                  ? styles.expandActivity
                  : styles.shrinkActivity
              }
            >
              {this.renderLecturer()}
            </div>
          </div>
          <div className={styles.header}>
            <div className={styles.headerTitle}>Rooms</div>
            <IconButton
              className={styles.iconButton}
              onClick={() => this.expand("rooms")}
              aria-label="delete"
            >
              {this.state.expandState.rooms ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <div
              className={
                this.state.expandState.rooms
                  ? styles.expandActivity
                  : styles.shrinkActivity
              }
            >
              {this.renderRoom()}
            </div>
          </div>

          <div className={styles.header}>
            <div className={styles.headerTitle}>Assigned</div>
            <IconButton
              className={styles.iconButton}
              onClick={() => this.expand("assigned")}
              aria-label="delete"
            >
              {this.state.expandState.assigned ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </IconButton>
            <div
              className={
                this.state.expandState.assigned ? styles.expand : styles.shrink
              }
            >
              {this.renderAssigned()}
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

export default EditPage;
