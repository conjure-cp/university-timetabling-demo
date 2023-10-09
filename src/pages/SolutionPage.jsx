import * as React from "react";

import {
  Button,
  Skeleton,
  ThemeProvider,
  Tooltip,
  IconButton,
  Modal,
} from "@mui/material";
import {
  Apps,
  School,
  Person,
  MeetingRoom,
  Check,
  FileUpload,
} from "@mui/icons-material";

import { Stack } from "@mui/system";

import { model } from "../utils/model";
import { theme } from "../utils/theme";

import styles from "../assets/pages/SolutionPage.module.css";

const SolutionPage = () => {
  const [newIntervalID, setNewIntervalID] = React.useState(null);
  const [result, setResult] = React.useState(null);
  const [solutionDiv, setSolutionDiv] = React.useState(null);

  const [combinedDiv, setCombinedDiv] = React.useState(null);
  const [moduleDiv, setModuleDiv] = React.useState(null);
  const [lecturerDiv, setLecturerDiv] = React.useState(null);
  const [roomDiv, setRoomDiv] = React.useState(null);

  const [importModalOpen, setImportModalOpen] = React.useState(false);
  const [dragActive, setDragActive] = React.useState(false);
  const [importFile, setImportFile] = React.useState();

  const [showState, setShowState] = React.useState({
    all: true,
    activities: false,
    lecturers: false,
    rooms: false,
  });

  const inputRef = React.useRef(null);

  const importModalHandleOpen = () => setImportModalOpen(true);
  const importModalHandleClose = () => setImportModalOpen(false);

  const inputDragHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  const inputChangeHandler = (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      setImportFile(event.target.files[0]);
    }
  };

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
      let importFile = JSON.parse(e.target.result);
      let newResult = {
        status: "ok",
        solution: importFile.solution,
      };

      localStorage.setItem("userInfo", JSON.stringify(importFile.userInfo));
      localStorage.setItem("mapper", JSON.stringify(importFile.mapper));
      localStorage.setItem("solution", JSON.stringify(importFile.solution));
      setResult(newResult);
      solutionHandler(importFile.solution);
      importModalHandleClose();

      setImportFile();
    };
  };

  const inputClickButtonHandler = () => {
    inputRef.current.click();
  };

  const solutionHandler = (solution) => {
    let moduleDivHelper = [];
    let lecturerDivHelper = [];
    let roomDivHelper = [];

    let mapper = localStorage.getItem("mapper");

    if (!mapper) {
      let userInput = JSON.parse(localStorage.getItem("userInfo"));

      let moduleMapper = setModuleMapperHelper(userInput);
      let activityTime = setActivityTimeHelper(userInput, moduleMapper);

      let lecturerInfo = setLecturerMapperHelper(userInput);
      let roomInfo = setRoomMapperHelper(userInput);
      let assignedInfo = setAssignedMapperHelper(
        userInput,
        moduleMapper,
        lecturerInfo.lecturerMapper,
        roomInfo.roomMapper
      );

      let finalizedData = setSeperateDaysHelper(
        userInput.activities,
        moduleMapper,
        activityTime,
        assignedInfo
      );

      let mapper = {
        moduleMapper: finalizedData.moduleMapper,
        lecturerMapper: lecturerInfo.lecturerMapper,
        roomMapper: roomInfo.roomMapper,
        sameModule: finalizedData.seperateDays,
      };

      localStorage.setItem("mapper", JSON.stringify(mapper));
    } else {
      mapper = JSON.parse(mapper);
    }

    let lecturerState = {};
    let roomState = {};
    let generateState = {};

    Object.keys(solution[0].assignment).forEach((moduleMapIndex) => {
      moduleMapIndex = parseInt(moduleMapIndex);

      if (!lecturerState[solution[0].assignment[moduleMapIndex].lecturer]) {
        lecturerState = {
          ...lecturerState,
          [solution[0].assignment[moduleMapIndex].lecturer]: {
            ...lecturerState[solution[0].assignment[moduleMapIndex].lecturer],
            activities: {
              [moduleMapIndex]: {
                day: solution[0].assignment[moduleMapIndex].day,
                hour: solution[0].assignment[moduleMapIndex].hour,
                room: solution[0].assignment[moduleMapIndex].room,
              },
            },
          },
        };
      } else {
        lecturerState = {
          ...lecturerState,
          [solution[0].assignment[moduleMapIndex].lecturer]: {
            ...lecturerState[solution[0].assignment[moduleMapIndex].lecturer],
            activities: {
              ...lecturerState[solution[0].assignment[moduleMapIndex].lecturer]
                .activities,
              [moduleMapIndex]: {
                day: solution[0].assignment[moduleMapIndex].day,
                hour: solution[0].assignment[moduleMapIndex].hour,
                room: solution[0].assignment[moduleMapIndex].room,
              },
            },
          },
        };
      }

      if (!roomState[solution[0].assignment[moduleMapIndex].room]) {
        roomState = {
          ...roomState,
          [solution[0].assignment[moduleMapIndex].room]: {
            ...roomState[solution[0].assignment[moduleMapIndex].room],
            activities: {
              [moduleMapIndex]: {
                day: solution[0].assignment[moduleMapIndex].day,
                hour: solution[0].assignment[moduleMapIndex].hour,
                lecturer: solution[0].assignment[moduleMapIndex].lecturer,
              },
            },
          },
        };
      } else {
        roomState = {
          ...roomState,
          [solution[0].assignment[moduleMapIndex].room]: {
            ...roomState[solution[0].assignment[moduleMapIndex].room],
            activities: {
              ...roomState[solution[0].assignment[moduleMapIndex].room]
                .activities,
              [moduleMapIndex]: {
                day: solution[0].assignment[moduleMapIndex].day,
                hour: solution[0].assignment[moduleMapIndex].hour,
                lecturer: solution[0].assignment[moduleMapIndex].lecturer,
              },
            },
          },
        };
      }

      if (mapper.sameModule.length === 0) {
        generateState = {
          ...generateState,
          [moduleMapIndex]: [moduleMapIndex],
        };
      } else {
        if (generateState[moduleMapIndex] === undefined) {
          let isMultipleActivity = false;
          Object.keys(mapper.sameModule).forEach((sameModuleIndex) => {
            if (mapper.sameModule[sameModuleIndex].includes(moduleMapIndex)) {
              isMultipleActivity = true;
              for (const element of mapper.sameModule[sameModuleIndex]) {
                generateState = {
                  ...generateState,
                  [element]: [0],
                };
              }

              generateState = {
                ...generateState,
                [moduleMapIndex]: mapper.sameModule[sameModuleIndex],
              };
            }
          });

          if (!isMultipleActivity) {
            generateState = {
              ...generateState,
              [moduleMapIndex]: [moduleMapIndex],
            };
          }
        }
      }
    });

    if (lecturerState) {
      Object.keys(lecturerState).forEach((lecturerMapIndex) => {
        let timeslotDiv = [];
        let timeslot = [
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
        ]; // timeslot[hour][day]

        let cellActivityValue = [
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
        ]; // timeslot[hour][day]

        let cellRoomValue = [
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
        ]; // timeslot[hour][day]

        Object.keys(lecturerState[lecturerMapIndex].activities).forEach(
          (moduleMapIndex) => {
            let moduleText = "";
            if (generateState[moduleMapIndex][0] === 0) {
              Object.keys(generateState).forEach((generateStateModule) => {
                if (
                  generateState[generateStateModule].includes(
                    parseInt(moduleMapIndex)
                  )
                ) {
                  moduleText = mapper.moduleMapper[generateStateModule];
                }
              });
            } else {
              moduleText = mapper.moduleMapper[moduleMapIndex];
            }
            timeslot[
              lecturerState[lecturerMapIndex].activities[moduleMapIndex].hour -
                9
            ][
              lecturerState[lecturerMapIndex].activities[moduleMapIndex].day - 1
            ] = true;
            cellActivityValue[
              lecturerState[lecturerMapIndex].activities[moduleMapIndex].hour -
                9
            ][
              lecturerState[lecturerMapIndex].activities[moduleMapIndex].day - 1
            ] = moduleText;
            cellRoomValue[
              lecturerState[lecturerMapIndex].activities[moduleMapIndex].hour -
                9
            ][
              lecturerState[lecturerMapIndex].activities[moduleMapIndex].day - 1
            ] =
              mapper.roomMapper[
                lecturerState[lecturerMapIndex].activities[moduleMapIndex].room
              ];
          }
        );

        // append DIV
        for (let hour = 0; hour < 8; hour++) {
          for (let day = 0; day < 5; day++) {
            let newStyles = null;
            let moduleIndex = Object.keys(mapper.moduleMapper).find(
              (key) => mapper.moduleMapper[key] === cellActivityValue[hour][day]
            );

            if (moduleIndex !== undefined) {
              switch (moduleIndex % 5) {
                case 1:
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCellChecked2;
                  } else {
                    newStyles = styles.timeSlotCellChecked2;
                  }
                  break;
                case 2:
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCellChecked3;
                  } else {
                    newStyles = styles.timeSlotCellChecked3;
                  }
                  break;
                case 3:
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCellChecked4;
                  } else {
                    newStyles = styles.timeSlotCellChecked4;
                  }
                  break;
                case 4:
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCellChecked5;
                  } else {
                    newStyles = styles.timeSlotCellChecked5;
                  }
                  break;
                default:
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCellChecked;
                  } else {
                    newStyles = styles.timeSlotCellChecked;
                  }
                  break;
              }
            } else {
              if (day === 4) {
                newStyles = styles.timeSlotLastCell;
              } else {
                newStyles = styles.timeSlotCell;
              }
            }

            timeslotDiv = [
              ...timeslotDiv,
              <div key={day + "." + hour} className={newStyles}>
                {cellActivityValue[hour][day] ? (
                  <div>
                    <div className={styles.activityHeader}>Activity</div>
                    <div className={styles.activityValue}>
                      {cellActivityValue[hour][day]}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div>
                  {cellRoomValue[hour][day] ? (
                    <div>
                      <div className={styles.roomHeader}>Room</div>
                      <div className={styles.roomValue}>
                        {cellRoomValue[hour][day]}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>,
            ];
          }
        }

        let lecturerTimeSlot = (
          <div key={mapper.moduleMapper[lecturerMapIndex]}>
            <div className={styles.titlesContainer}>
              <div className={styles.moduleTitle}>
                {mapper.lecturerMapper[lecturerMapIndex]}
              </div>
            </div>
            <div className={styles.timeslot}>
              <div />
              <div />
              <div className={styles.timeSlotHeader}>Monday</div>
              <div className={styles.timeSlotHeader}>Tuesday</div>
              <div className={styles.timeSlotHeader}>Wednesday</div>
              <div className={styles.timeSlotHeader}>Thursday</div>
              <div className={styles.timeSlotHeader}>Friday</div>

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>9.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[0]}
              {timeslotDiv[1]}
              {timeslotDiv[2]}
              {timeslotDiv[3]}
              {timeslotDiv[4]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>10.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[5]}
              {timeslotDiv[6]}
              {timeslotDiv[7]}
              {timeslotDiv[8]}
              {timeslotDiv[9]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>11.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[10]}
              {timeslotDiv[11]}
              {timeslotDiv[12]}
              {timeslotDiv[13]}
              {timeslotDiv[14]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>12.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[15]}
              {timeslotDiv[16]}
              {timeslotDiv[17]}
              {timeslotDiv[18]}
              {timeslotDiv[19]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>13.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[20]}
              {timeslotDiv[21]}
              {timeslotDiv[22]}
              {timeslotDiv[23]}
              {timeslotDiv[24]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>14.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[25]}
              {timeslotDiv[26]}
              {timeslotDiv[27]}
              {timeslotDiv[28]}
              {timeslotDiv[29]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>15.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[30]}
              {timeslotDiv[31]}
              {timeslotDiv[32]}
              {timeslotDiv[33]}
              {timeslotDiv[34]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>16.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[35]}
              {timeslotDiv[36]}
              {timeslotDiv[37]}
              {timeslotDiv[38]}
              {timeslotDiv[39]}
            </div>
          </div>
        );

        lecturerDivHelper = [...lecturerDivHelper, lecturerTimeSlot];
      });

      setLecturerDiv(lecturerDivHelper);
    }

    if (roomState) {
      Object.keys(roomState).forEach((roomMapIndex) => {
        let timeslotDiv = [];
        let timeslot = [
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
        ]; // timeslot[hour][day]

        let cellActivityValue = [
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
        ]; // timeslot[hour][day]

        let cellLecturerValue = [
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
        ]; // timeslot[hour][day]

        Object.keys(roomState[roomMapIndex].activities).forEach(
          (moduleMapIndex) => {
            let moduleText = "";

            if (generateState[moduleMapIndex][0] === 0) {
              Object.keys(generateState).forEach((generateStateModule) => {
                if (
                  generateState[generateStateModule].includes(
                    parseInt(moduleMapIndex)
                  )
                ) {
                  moduleText = mapper.moduleMapper[generateStateModule];
                }
              });
            } else {
              moduleText = mapper.moduleMapper[moduleMapIndex];
            }

            timeslot[
              roomState[roomMapIndex].activities[moduleMapIndex].hour - 9
            ][
              roomState[roomMapIndex].activities[moduleMapIndex].day - 1
            ] = true;
            cellActivityValue[
              roomState[roomMapIndex].activities[moduleMapIndex].hour - 9
            ][roomState[roomMapIndex].activities[moduleMapIndex].day - 1] =
              moduleText;
            cellLecturerValue[
              roomState[roomMapIndex].activities[moduleMapIndex].hour - 9
            ][roomState[roomMapIndex].activities[moduleMapIndex].day - 1] =
              mapper.lecturerMapper[
                roomState[roomMapIndex].activities[moduleMapIndex].lecturer
              ];
          }
        );

        // append DIV
        for (let hour = 0; hour < 8; hour++) {
          for (let day = 0; day < 5; day++) {
            let newStyles = null;
            let moduleIndex = Object.keys(mapper.moduleMapper).find(
              (key) => mapper.moduleMapper[key] === cellActivityValue[hour][day]
            );

            if (moduleIndex !== undefined) {
              switch (moduleIndex % 5) {
                case 1:
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCellChecked2;
                  } else {
                    newStyles = styles.timeSlotCellChecked2;
                  }
                  break;
                case 2:
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCellChecked3;
                  } else {
                    newStyles = styles.timeSlotCellChecked3;
                  }
                  break;
                case 3:
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCellChecked4;
                  } else {
                    newStyles = styles.timeSlotCellChecked4;
                  }
                  break;
                case 4:
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCellChecked5;
                  } else {
                    newStyles = styles.timeSlotCellChecked5;
                  }
                  break;
                default:
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCellChecked;
                  } else {
                    newStyles = styles.timeSlotCellChecked;
                  }
                  break;
              }
            } else {
              if (day === 4) {
                newStyles = styles.timeSlotLastCell;
              } else {
                newStyles = styles.timeSlotCell;
              }
            }

            timeslotDiv = [
              ...timeslotDiv,
              <div key={day + "." + hour} className={newStyles}>
                {cellActivityValue[hour][day] ? (
                  <div>
                    <div className={styles.activityHeader}>Activity</div>
                    <div className={styles.activityValue}>
                      {cellActivityValue[hour][day]}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div>
                  {cellLecturerValue[hour][day] ? (
                    <div>
                      <div className={styles.roomHeader}>Lecturer</div>
                      <div className={styles.roomValue}>
                        {cellLecturerValue[hour][day]}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>,
            ];
          }
        }

        let roomTimeSlot = (
          <div key={mapper.moduleMapper[roomMapIndex]}>
            <div className={styles.titlesContainer}>
              <div className={styles.moduleTitle}>
                {mapper.roomMapper[roomMapIndex]}
              </div>
            </div>
            <div className={styles.timeslot}>
              <div />
              <div />
              <div className={styles.timeSlotHeader}>Monday</div>
              <div className={styles.timeSlotHeader}>Tuesday</div>
              <div className={styles.timeSlotHeader}>Wednesday</div>
              <div className={styles.timeSlotHeader}>Thursday</div>
              <div className={styles.timeSlotHeader}>Friday</div>

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>9.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[0]}
              {timeslotDiv[1]}
              {timeslotDiv[2]}
              {timeslotDiv[3]}
              {timeslotDiv[4]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>10.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[5]}
              {timeslotDiv[6]}
              {timeslotDiv[7]}
              {timeslotDiv[8]}
              {timeslotDiv[9]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>11.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[10]}
              {timeslotDiv[11]}
              {timeslotDiv[12]}
              {timeslotDiv[13]}
              {timeslotDiv[14]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>12.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[15]}
              {timeslotDiv[16]}
              {timeslotDiv[17]}
              {timeslotDiv[18]}
              {timeslotDiv[19]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>13.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[20]}
              {timeslotDiv[21]}
              {timeslotDiv[22]}
              {timeslotDiv[23]}
              {timeslotDiv[24]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>14.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[25]}
              {timeslotDiv[26]}
              {timeslotDiv[27]}
              {timeslotDiv[28]}
              {timeslotDiv[29]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>15.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[30]}
              {timeslotDiv[31]}
              {timeslotDiv[32]}
              {timeslotDiv[33]}
              {timeslotDiv[34]}

              <div className={styles.timeHeader}>
                <div className={styles.timeHeaderValue}>16.00</div>
              </div>
              <div className={styles.borderLine} />
              {timeslotDiv[35]}
              {timeslotDiv[36]}
              {timeslotDiv[37]}
              {timeslotDiv[38]}
              {timeslotDiv[39]}
            </div>
          </div>
        );

        roomDivHelper = [...roomDivHelper, roomTimeSlot];
      });

      setRoomDiv(roomDivHelper);
    }

    if (generateState) {
      Object.keys(generateState).forEach((moduleMapIndex) => {
        if (generateState[moduleMapIndex][0] !== 0) {
          let timeslotDiv = [];
          let timeslot = [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
          ]; // timeslot[hour][day]

          let cellRoomValue = [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
          ]; // timeslot[hour][day]

          let cellLecturerValue = [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
          ]; // timeslot[hour][day]

          if (generateState[moduleMapIndex].length > 1) {
            for (
              let index = 0;
              index < generateState[moduleMapIndex].length;
              index++
            ) {
              let assignment =
                solution[0].assignment[generateState[moduleMapIndex][index]];
              timeslot[assignment.hour - 9][assignment.day - 1] = true;
              cellRoomValue[assignment.hour - 9][assignment.day - 1] =
                mapper.roomMapper[solution[0].assignment[moduleMapIndex].room];
              cellLecturerValue[assignment.hour - 9][assignment.day - 1] =
                mapper.lecturerMapper[
                  solution[0].assignment[moduleMapIndex].lecturer
                ];
            }

            //append DIV

            for (let hour = 0; hour < 8; hour++) {
              for (let day = 0; day < 5; day++) {
                let newStyles = null;
                let moduleIndex = Object.keys(mapper.moduleMapper).find(
                  (key) =>
                    mapper.moduleMapper[key] ===
                    mapper.moduleMapper[moduleMapIndex]
                );

                if (timeslot[hour][day]) {
                  switch (moduleIndex % 5) {
                    case 1:
                      if (day === 4) {
                        newStyles = styles.timeSlotLastCellChecked2;
                      } else {
                        newStyles = styles.timeSlotCellChecked2;
                      }
                      break;
                    case 2:
                      if (day === 4) {
                        newStyles = styles.timeSlotLastCellChecked3;
                      } else {
                        newStyles = styles.timeSlotCellChecked3;
                      }
                      break;
                    case 3:
                      if (day === 4) {
                        newStyles = styles.timeSlotLastCellChecked4;
                      } else {
                        newStyles = styles.timeSlotCellChecked4;
                      }
                      break;
                    case 4:
                      if (day === 4) {
                        newStyles = styles.timeSlotLastCellChecked5;
                      } else {
                        newStyles = styles.timeSlotCellChecked5;
                      }
                      break;
                    default:
                      if (day === 4) {
                        newStyles = styles.timeSlotLastCellChecked;
                      } else {
                        newStyles = styles.timeSlotCellChecked;
                      }
                      break;
                  }
                } else {
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCell;
                  } else {
                    newStyles = styles.timeSlotCell;
                  }
                }

                timeslotDiv = [
                  ...timeslotDiv,
                  <div key={day + "." + hour} className={newStyles}>
                    {cellLecturerValue[hour][day] ? (
                      <div>
                        <div className={styles.activityHeader}>Lecturer</div>
                        <div className={styles.activityValue}>
                          {cellLecturerValue[hour][day]}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div>
                      {cellRoomValue[hour][day] ? (
                        <div>
                          <div className={styles.roomHeader}>Room</div>
                          <div className={styles.roomValue}>
                            {cellRoomValue[hour][day]}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>,
                ];
              }
            }

            let moduleTimeslot = (
              <div key={mapper.moduleMapper[moduleMapIndex]}>
                <div className={styles.titlesContainer}>
                  <div className={styles.moduleTitle}>
                    {mapper.moduleMapper[moduleMapIndex]}
                  </div>
                </div>
                <div className={styles.timeslot}>
                  <div />
                  <div />
                  <div className={styles.timeSlotHeader}>Monday</div>
                  <div className={styles.timeSlotHeader}>Tuesday</div>
                  <div className={styles.timeSlotHeader}>Wednesday</div>
                  <div className={styles.timeSlotHeader}>Thursday</div>
                  <div className={styles.timeSlotHeader}>Friday</div>

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>9.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[0]}
                  {timeslotDiv[1]}
                  {timeslotDiv[2]}
                  {timeslotDiv[3]}
                  {timeslotDiv[4]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>10.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[5]}
                  {timeslotDiv[6]}
                  {timeslotDiv[7]}
                  {timeslotDiv[8]}
                  {timeslotDiv[9]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>11.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[10]}
                  {timeslotDiv[11]}
                  {timeslotDiv[12]}
                  {timeslotDiv[13]}
                  {timeslotDiv[14]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>12.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[15]}
                  {timeslotDiv[16]}
                  {timeslotDiv[17]}
                  {timeslotDiv[18]}
                  {timeslotDiv[19]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>13.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[20]}
                  {timeslotDiv[21]}
                  {timeslotDiv[22]}
                  {timeslotDiv[23]}
                  {timeslotDiv[24]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>14.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[25]}
                  {timeslotDiv[26]}
                  {timeslotDiv[27]}
                  {timeslotDiv[28]}
                  {timeslotDiv[29]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>15.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[30]}
                  {timeslotDiv[31]}
                  {timeslotDiv[32]}
                  {timeslotDiv[33]}
                  {timeslotDiv[34]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>16.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[35]}
                  {timeslotDiv[36]}
                  {timeslotDiv[37]}
                  {timeslotDiv[38]}
                  {timeslotDiv[39]}
                </div>
              </div>
            );

            moduleDivHelper = [...moduleDivHelper, moduleTimeslot];
          } else {
            let assignment =
              solution[0].assignment[generateState[moduleMapIndex][0]];
            timeslot[assignment.hour - 9][assignment.day - 1] = true;
            cellRoomValue[assignment.hour - 9][assignment.day - 1] =
              mapper.roomMapper[solution[0].assignment[moduleMapIndex].room];
            cellLecturerValue[assignment.hour - 9][assignment.day - 1] =
              mapper.lecturerMapper[
                solution[0].assignment[moduleMapIndex].lecturer
              ];

            //append DIV
            for (let hour = 0; hour < 8; hour++) {
              for (let day = 0; day < 5; day++) {
                let newStyles = null;
                let moduleIndex = Object.keys(mapper.moduleMapper).find(
                  (key) =>
                    mapper.moduleMapper[key] ===
                    mapper.moduleMapper[moduleMapIndex]
                );

                if (timeslot[hour][day]) {
                  switch (moduleIndex % 5) {
                    case 1:
                      if (day === 4) {
                        newStyles = styles.timeSlotLastCellChecked2;
                      } else {
                        newStyles = styles.timeSlotCellChecked2;
                      }
                      break;
                    case 2:
                      if (day === 4) {
                        newStyles = styles.timeSlotLastCellChecked3;
                      } else {
                        newStyles = styles.timeSlotCellChecked3;
                      }
                      break;
                    case 3:
                      if (day === 4) {
                        newStyles = styles.timeSlotLastCellChecked4;
                      } else {
                        newStyles = styles.timeSlotCellChecked4;
                      }
                      break;
                    case 4:
                      if (day === 4) {
                        newStyles = styles.timeSlotLastCellChecked5;
                      } else {
                        newStyles = styles.timeSlotCellChecked5;
                      }
                      break;
                    default:
                      if (day === 4) {
                        newStyles = styles.timeSlotLastCellChecked;
                      } else {
                        newStyles = styles.timeSlotCellChecked;
                      }
                      break;
                  }
                } else {
                  if (day === 4) {
                    newStyles = styles.timeSlotLastCell;
                  } else {
                    newStyles = styles.timeSlotCell;
                  }
                }

                timeslotDiv = [
                  ...timeslotDiv,
                  <div key={day + "." + hour} className={newStyles}>
                    {cellLecturerValue[hour][day] ? (
                      <div>
                        <div className={styles.activityHeader}>Lecturer</div>
                        <div className={styles.activityValue}>
                          {cellLecturerValue[hour][day]}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div>
                      {cellRoomValue[hour][day] ? (
                        <div>
                          <div className={styles.roomHeader}>Room</div>
                          <div className={styles.roomValue}>
                            {cellRoomValue[hour][day]}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>,
                ];
              }
            }

            let moduleTimeslot = (
              <div key={mapper.moduleMapper[moduleMapIndex]}>
                <div className={styles.titlesContainer}>
                  <div className={styles.moduleTitle}>
                    {mapper.moduleMapper[moduleMapIndex]}
                  </div>
                </div>
                <div className={styles.timeslot}>
                  <div />
                  <div />
                  <div className={styles.timeSlotHeader}>Monday</div>
                  <div className={styles.timeSlotHeader}>Tuesday</div>
                  <div className={styles.timeSlotHeader}>Wednesday</div>
                  <div className={styles.timeSlotHeader}>Thursday</div>
                  <div className={styles.timeSlotHeader}>Friday</div>

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>9.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[0]}
                  {timeslotDiv[1]}
                  {timeslotDiv[2]}
                  {timeslotDiv[3]}
                  {timeslotDiv[4]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>10.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[5]}
                  {timeslotDiv[6]}
                  {timeslotDiv[7]}
                  {timeslotDiv[8]}
                  {timeslotDiv[9]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>11.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[10]}
                  {timeslotDiv[11]}
                  {timeslotDiv[12]}
                  {timeslotDiv[13]}
                  {timeslotDiv[14]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>12.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[15]}
                  {timeslotDiv[16]}
                  {timeslotDiv[17]}
                  {timeslotDiv[18]}
                  {timeslotDiv[19]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>13.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[20]}
                  {timeslotDiv[21]}
                  {timeslotDiv[22]}
                  {timeslotDiv[23]}
                  {timeslotDiv[24]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>14.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[25]}
                  {timeslotDiv[26]}
                  {timeslotDiv[27]}
                  {timeslotDiv[28]}
                  {timeslotDiv[29]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>15.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[30]}
                  {timeslotDiv[31]}
                  {timeslotDiv[32]}
                  {timeslotDiv[33]}
                  {timeslotDiv[34]}

                  <div className={styles.timeHeader}>
                    <div className={styles.timeHeaderValue}>16.00</div>
                  </div>
                  <div className={styles.borderLine} />
                  {timeslotDiv[35]}
                  {timeslotDiv[36]}
                  {timeslotDiv[37]}
                  {timeslotDiv[38]}
                  {timeslotDiv[39]}
                </div>
              </div>
            );

            moduleDivHelper = [...moduleDivHelper, moduleTimeslot];
          }
        }
      });
    }

    setModuleDiv(moduleDivHelper);

    if (generateState && lecturerState && roomState) {
      let timeslotDiv = [];
      let timeslot = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]; // timeslot[hour][day]
      let cellActivityValue = [
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
      ];

      let cellRoomValue = [
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
      ]; // timeslot[hour][day]

      let cellLecturerValue = [
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
        [[], [], [], [], []],
      ]; // timeslot[hour][day]
      Object.keys(generateState).forEach((moduleMapIndex) => {
        if (generateState[moduleMapIndex][0] !== 0) {
          if (generateState[moduleMapIndex].length > 1) {
            for (
              let index = 0;
              index < generateState[moduleMapIndex].length;
              index++
            ) {
              let assignment =
                solution[0].assignment[generateState[moduleMapIndex][index]];
              timeslot[assignment.hour - 9][assignment.day - 1] =
                timeslot[assignment.hour - 9][assignment.day - 1] + 1;
              cellActivityValue[assignment.hour - 9][assignment.day - 1] = [
                ...cellActivityValue[assignment.hour - 9][assignment.day - 1],
                mapper.moduleMapper[moduleMapIndex],
              ];
              cellRoomValue[assignment.hour - 9][assignment.day - 1] = [
                ...cellRoomValue[assignment.hour - 9][assignment.day - 1],
                mapper.roomMapper[solution[0].assignment[moduleMapIndex].room],
              ];
              cellLecturerValue[assignment.hour - 9][assignment.day - 1] = [
                ...cellLecturerValue[assignment.hour - 9][assignment.day - 1],
                mapper.lecturerMapper[
                  solution[0].assignment[moduleMapIndex].lecturer
                ],
              ];
            }
          } else {
            let assignment =
              solution[0].assignment[generateState[moduleMapIndex][0]];
            timeslot[assignment.hour - 9][assignment.day - 1] =
              timeslot[assignment.hour - 9][assignment.day - 1] + 1;
            cellActivityValue[assignment.hour - 9][assignment.day - 1] = [
              ...cellActivityValue[assignment.hour - 9][assignment.day - 1],
              mapper.moduleMapper[moduleMapIndex],
            ];
            cellRoomValue[assignment.hour - 9][assignment.day - 1] = [
              ...cellRoomValue[assignment.hour - 9][assignment.day - 1],
              mapper.roomMapper[solution[0].assignment[moduleMapIndex].room],
            ];
            cellLecturerValue[assignment.hour - 9][assignment.day - 1] = [
              ...cellLecturerValue[assignment.hour - 9][assignment.day - 1],
              mapper.lecturerMapper[
                solution[0].assignment[moduleMapIndex].lecturer
              ],
            ];
          }
        }
      });

      for (let hour = 0; hour < 8; hour++) {
        for (let day = 0; day < 5; day++) {
          let newStyles =
            day === 4 ? styles.timeSlotLastCell : styles.timeSlotCell;
          let innerDiv = [];
          let moduleIndex = 0;
          if (timeslot[hour][day] > 1) {
            newStyles = styles.multipleCell;
            for (let index = 0; index < timeslot[hour][day]; index++) {
              let combinedNewStyles = null;
              moduleIndex = Object.keys(mapper.moduleMapper).find(
                (key) =>
                  mapper.moduleMapper[key] ===
                  cellActivityValue[hour][day][index]
              );

              switch (moduleIndex % 5) {
                case 1:
                  if (day === 4) {
                    combinedNewStyles = styles.timeSlotLastCellCheckedCombined2;
                  } else {
                    combinedNewStyles = styles.timeSlotCellCheckedCombined2;
                  }
                  break;
                case 2:
                  if (day === 4) {
                    combinedNewStyles = styles.timeSlotLastCellCheckedCombined3;
                  } else {
                    combinedNewStyles = styles.timeSlotCellCheckedCombined3;
                  }
                  break;
                case 3:
                  if (day === 4) {
                    combinedNewStyles = styles.timeSlotLastCellCheckedCombined4;
                  } else {
                    combinedNewStyles = styles.timeSlotCellCheckedCombined4;
                  }
                  break;
                case 4:
                  if (day === 4) {
                    combinedNewStyles = styles.timeSlotLastCellCheckedCombined5;
                  } else {
                    combinedNewStyles = styles.timeSlotCellCheckedCombined5;
                  }
                  break;
                default:
                  if (day === 4) {
                    combinedNewStyles = styles.timeSlotLastCellCheckedCombined;
                  } else {
                    combinedNewStyles = styles.timeSlotCellCheckedCombined;
                  }
                  break;
              }
              innerDiv = [
                ...innerDiv,
                <div
                  key={day + "." + hour + "." + moduleIndex}
                  style={{
                    zIndex: 20 - day * 5 + 5 - (innerDiv.length % 5),
                    borderRight:
                      innerDiv.length % 5 !== 4
                        ? "1px solid rgb(218, 220, 224)"
                        : "0px",
                  }}
                  className={combinedNewStyles}
                >
                  {cellActivityValue[hour][day] ? (
                    <div>
                      <div className={styles.activityHeader}>Activity</div>
                      <div className={styles.activityValue}>
                        {cellActivityValue[hour][day][index]}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {cellLecturerValue[hour][day] ? (
                    <div>
                      <div className={styles.activityHeader}>Lecturer</div>
                      <div className={styles.activityValue}>
                        {cellLecturerValue[hour][day][index]}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {cellRoomValue[hour][day] ? (
                    <div>
                      <div className={styles.roomHeader}>Room</div>
                      <div className={styles.roomValue}>
                        {cellRoomValue[hour][day][index]}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>,
              ];
            }
          } else if (timeslot[hour][day] === 1) {
            moduleIndex = Object.keys(mapper.moduleMapper).find(
              (key) =>
                mapper.moduleMapper[key] === cellActivityValue[hour][day][0]
            );

            switch (moduleIndex % 5) {
              case 1:
                if (day === 4) {
                  newStyles = styles.timeSlotLastCellChecked2;
                } else {
                  newStyles = styles.timeSlotCellChecked2;
                }
                break;
              case 2:
                if (day === 4) {
                  newStyles = styles.timeSlotLastCellChecked3;
                } else {
                  newStyles = styles.timeSlotCellChecked3;
                }
                break;
              case 3:
                if (day === 4) {
                  newStyles = styles.timeSlotLastCellChecked4;
                } else {
                  newStyles = styles.timeSlotCellChecked4;
                }
                break;
              case 4:
                if (day === 4) {
                  newStyles = styles.timeSlotLastCellChecked5;
                } else {
                  newStyles = styles.timeSlotCellChecked5;
                }
                break;
              default:
                if (day === 4) {
                  newStyles = styles.timeSlotLastCellChecked;
                } else {
                  newStyles = styles.timeSlotCellChecked;
                }
                break;
            }
            innerDiv = [
              <div key={day + "." + hour}>
                {cellActivityValue[hour][day] ? (
                  <div>
                    <div className={styles.activityHeader}>Activity</div>
                    <div className={styles.activityValue}>
                      {cellActivityValue[hour][day]}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {cellLecturerValue[hour][day] ? (
                  <div>
                    <div className={styles.activityHeader}>Lecturer</div>
                    <div className={styles.activityValue}>
                      {cellLecturerValue[hour][day]}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {cellRoomValue[hour][day] ? (
                  <div>
                    <div className={styles.roomHeader}>Room</div>
                    <div className={styles.roomValue}>
                      {cellRoomValue[hour][day]}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>,
            ];
          }

          timeslotDiv = [
            ...timeslotDiv,
            <div key={day + "." + hour} className={newStyles}>
              {innerDiv}
            </div>,
          ];
        }
      }

      let combinedTimeslot = (
        <div>
          <div className={styles.titlesContainer}>
            <div className={styles.moduleTitle}>Combined Timetable</div>
          </div>
          <div className={styles.timeslot}>
            <div />
            <div />
            <div className={styles.timeSlotHeader}>Monday</div>
            <div className={styles.timeSlotHeader}>Tuesday</div>
            <div className={styles.timeSlotHeader}>Wednesday</div>
            <div className={styles.timeSlotHeader}>Thursday</div>
            <div className={styles.timeSlotHeader}>Friday</div>

            <div className={styles.timeHeader}>
              <div className={styles.timeHeaderValue}>9.00</div>
            </div>
            <div className={styles.borderLine} />
            {timeslotDiv[0]}
            {timeslotDiv[1]}
            {timeslotDiv[2]}
            {timeslotDiv[3]}
            {timeslotDiv[4]}

            <div className={styles.timeHeader}>
              <div className={styles.timeHeaderValue}>10.00</div>
            </div>
            <div className={styles.borderLine} />
            {timeslotDiv[5]}
            {timeslotDiv[6]}
            {timeslotDiv[7]}
            {timeslotDiv[8]}
            {timeslotDiv[9]}

            <div className={styles.timeHeader}>
              <div className={styles.timeHeaderValue}>11.00</div>
            </div>
            <div className={styles.borderLine} />
            {timeslotDiv[10]}
            {timeslotDiv[11]}
            {timeslotDiv[12]}
            {timeslotDiv[13]}
            {timeslotDiv[14]}

            <div className={styles.timeHeader}>
              <div className={styles.timeHeaderValue}>12.00</div>
            </div>
            <div className={styles.borderLine} />
            {timeslotDiv[15]}
            {timeslotDiv[16]}
            {timeslotDiv[17]}
            {timeslotDiv[18]}
            {timeslotDiv[19]}

            <div className={styles.timeHeader}>
              <div className={styles.timeHeaderValue}>13.00</div>
            </div>
            <div className={styles.borderLine} />
            {timeslotDiv[20]}
            {timeslotDiv[21]}
            {timeslotDiv[22]}
            {timeslotDiv[23]}
            {timeslotDiv[24]}

            <div className={styles.timeHeader}>
              <div className={styles.timeHeaderValue}>14.00</div>
            </div>
            <div className={styles.borderLine} />
            {timeslotDiv[25]}
            {timeslotDiv[26]}
            {timeslotDiv[27]}
            {timeslotDiv[28]}
            {timeslotDiv[29]}

            <div className={styles.timeHeader}>
              <div className={styles.timeHeaderValue}>15.00</div>
            </div>
            <div className={styles.borderLine} />
            {timeslotDiv[30]}
            {timeslotDiv[31]}
            {timeslotDiv[32]}
            {timeslotDiv[33]}
            {timeslotDiv[34]}

            <div className={styles.timeHeader}>
              <div className={styles.timeHeaderValue}>16.00</div>
            </div>
            <div className={styles.borderLine} />
            {timeslotDiv[35]}
            {timeslotDiv[36]}
            {timeslotDiv[37]}
            {timeslotDiv[38]}
            {timeslotDiv[39]}
          </div>
        </div>
      );

      setCombinedDiv(combinedTimeslot);
      setSolutionDiv(combinedTimeslot);
    }
  };

  React.useEffect(() => {
    let solution = JSON.parse(localStorage.getItem("solution"));

    if (solution) {
      if (solution.length === 0) {
        setSolutionDiv(
          <div className={styles.noSolution}>
            <div>Cannot find any solution</div>
            <div className={styles.noSolutionSub}>
              Please rearrange the timeslot to get a solution
            </div>
          </div>
        );
      } else {
        let newResult = { solution: null, status: "ok" };
        newResult.solution = solution;
        setResult(newResult);

        solutionHandler(solution);
      }
    } else {
      setSolutionDiv(
        <div className={styles.noSolution}>
          <div>Solution has never been generated</div>
          <div className={styles.noSolutionSub}>
            Please click the solve button to get a solution
          </div>
        </div>
      );
    }
  }, []);

  React.useEffect(() => {
    if (result) {
      if (result.status !== "ok") {
        if (result.status === "wait") {
          // setTimeout(getResult, 1000); // execute getResult again after 1 second
        } else {
          alert("Parsing error: Please check the value");
          clearInterval(newIntervalID);

          setSolutionDiv(<div>Error</div>);
        }
      } else {
        localStorage.setItem("solution", JSON.stringify(result.solution));
        clearInterval(newIntervalID); // remove the interval when the status is "ok"

        if (result.solution.length === 0) {
          setSolutionDiv(
            <div className={styles.noSolution}>
              <div>Cannot find any solution</div>
              <div className={styles.noSolutionSub}>
                Please rearrange the timeslot to get a solution
              </div>
            </div>
          );
        } else {
          solutionHandler(result.solution);
        }
      }
    }
  }, [result, newIntervalID]);

  const getResultHadnler = () => {
    // Call getResult every second and store the interval ID in state
    let intervalID = setInterval(getResult, 1000);
    setNewIntervalID(intervalID);
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

    return moduleMapper;
  };

  const setActivityTimeHelper = (userInput, moduleMapper) => {
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
        // if (userInput.activities[id][activity].allowed.length !== 0)
        activityAllowedTime = {
          ...activityAllowedTime,
          [Object.keys(newModuleMapper).find(
            (key) => newModuleMapper[key] === id + "." + activity
          )]: userInput.activities[id][activity].allowed,
        };

        // if (userInput.activities[id][activity].preferred.length !== 0)
        activityPreferredTime = {
          ...activityPreferredTime,
          [Object.keys(newModuleMapper).find(
            (key) => newModuleMapper[key] === id + "." + activity
          )]: userInput.activities[id][activity].preferred,
        };
      });
    });

    Object.keys(newModuleMapper).forEach((index) => {
      if (!activityAllowedTime[index]) {
        activityAllowedTime[index] = [];
      }

      if (!activityPreferredTime[index]) {
        activityPreferredTime[index] = [];
      }
    });

    return {
      activityAllowedTime: activityAllowedTime,
      activityPreferredTime: activityPreferredTime,
    };
  };

  const showOptionsHandler = (optionToShow) => {
    let newShowState = showState;

    Object.keys(newShowState).forEach((option) => {
      newShowState[option] = option === optionToShow;
    });

    setShowState({
      ...newShowState,
    });

    switch (optionToShow) {
      case "activities":
        setSolutionDiv(moduleDiv);
        break;
      case "lecturers":
        setSolutionDiv(lecturerDiv);
        break;
      case "rooms":
        setSolutionDiv(roomDiv);
        break;
      default:
        setSolutionDiv(combinedDiv);
        break;
    }
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

      // if (userInput.lecturers[name].allowed.length !== 0)
      lecturerAllowedTime = {
        ...lecturerAllowedTime,
        [Object.keys(lecturerMapper).length]: userInput.lecturers[name].allowed,
      };

      // if (userInput.lecturers[name].preferred.length !== 0)
      lecturerPreferredTime = {
        ...lecturerPreferredTime,
        [Object.keys(lecturerMapper).length]:
          userInput.lecturers[name].preferred,
      };
    });

    return {
      lecturerMapper: lecturerMapper,
      lecturerAllowedTime: lecturerAllowedTime,
      lecturerPreferredTime: lecturerPreferredTime,
    };
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

      // if (userInput.rooms[name].allowed.length !== 0)
      roomAllowedTime = {
        ...roomAllowedTime,
        [Object.keys(roomMapper).length]: userInput.rooms[name].allowed,
      };

      // if (userInput.rooms[name].preferred.length !== 0)
      roomPreferredTime = {
        ...roomPreferredTime,
        [Object.keys(roomMapper).length]: userInput.rooms[name].preferred,
      };
    });

    return {
      roomMapper: roomMapper,
      roomAllowedTime: roomAllowedTime,
      roomPreferredTime: roomPreferredTime,
    };
  };

  const setAssignedMapperHelper = (
    userInput,
    moduleMapper,
    lecturerMapper,
    roomMapper
  ) => {
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
          assignedLecutrer = [...assignedLecutrer, parseInt(key)];
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
          assignedRoom = [...assignedRoom, parseInt(key)];
        }
      });

      activityAllowedRooms = {
        ...activityAllowedRooms,
        [roomActivityNumber]: assignedRoom,
      };
    });

    Object.keys(newModuleMapper).forEach((index) => {
      if (!activityAllowedLecturers[index]) {
        activityAllowedLecturers[index] = [];
      }

      if (!activityAllowedRooms[index]) {
        activityAllowedRooms[index] = [];
      }
    });

    return {
      activityAllowedLecturers: activityAllowedLecturers,
      activityAllowedRooms: activityAllowedRooms,
    };
  };

  const setSeperateDaysHelper = (
    activities,
    moduleMapper,
    activityTime,
    assignedInfo
  ) => {
    let seperateDays = [];
    Object.keys(activities).forEach((moduleID) => {
      Object.keys(activities[moduleID]).forEach((activity) => {
        if (activities[moduleID][activity].activityPerWeek > 1) {
          let firstActivityIndex = parseInt(
            Object.keys(moduleMapper).find(
              (key) => moduleMapper[key] === moduleID + "." + activity
            )
          );
          let newElement = [firstActivityIndex];
          for (
            let index = 1;
            index < activities[moduleID][activity].activityPerWeek;
            index++
          ) {
            let newIndex = Object.keys(moduleMapper).length + 1;
            newElement.push(newIndex);
            moduleMapper = {
              ...moduleMapper,
              [newIndex]: moduleID + "." + activity + index,
            };
            activityTime = {
              ...activityTime,
              activityAllowedTime: {
                ...activityTime.activityAllowedTime,
                [newIndex]:
                  activityTime.activityAllowedTime[firstActivityIndex],
              },
              activityPreferredTime: {
                ...activityTime.activityPreferredTime,
                [newIndex]:
                  activityTime.activityPreferredTime[firstActivityIndex],
              },
            };
            assignedInfo = {
              ...assignedInfo,
              activityAllowedLecturers: {
                ...assignedInfo.activityAllowedLecturers,
                [newIndex]:
                  assignedInfo.activityAllowedLecturers[firstActivityIndex],
              },
              activityAllowedRooms: {
                ...assignedInfo.activityAllowedRooms,
                [newIndex]:
                  assignedInfo.activityAllowedRooms[firstActivityIndex],
              },
            };
          }
          seperateDays.push(newElement);
        }
      });
    });

    let finalizedData = {
      moduleMapper: moduleMapper,
      activityTime: activityTime,
      assignedInfo: assignedInfo,
      seperateDays: seperateDays,
    };

    return finalizedData;
  };

  const parseUserInputToSolverData = () => {
    let userInput = JSON.parse(localStorage.getItem("userInfo"));

    let moduleMapper = setModuleMapperHelper(userInput);
    let activityTime = setActivityTimeHelper(userInput, moduleMapper);

    let lecturerInfo = setLecturerMapperHelper(userInput);
    let roomInfo = setRoomMapperHelper(userInput);
    let assignedInfo = setAssignedMapperHelper(
      userInput,
      moduleMapper,
      lecturerInfo.lecturerMapper,
      roomInfo.roomMapper
    );

    let finalizedData = setSeperateDaysHelper(
      userInput.activities,
      moduleMapper,
      activityTime,
      assignedInfo
    );

    let mapper = {
      moduleMapper: finalizedData.moduleMapper,
      lecturerMapper: lecturerInfo.lecturerMapper,
      roomMapper: roomInfo.roomMapper,
      sameModule: finalizedData.seperateDays,
    };

    let newActivityAllowedTime = finalizedData.activityTime.activityAllowedTime;
    let newLecturerAllowedTime = lecturerInfo.lecturerAllowedTime;
    let newRoomAllowedTime = roomInfo.roomAllowedTime;

    // console.log(newActivityAllowedTime)
    Object.keys(newActivityAllowedTime).forEach((activityID) => {
      newActivityAllowedTime[activityID] = [
        ...newActivityAllowedTime[activityID],
        ...finalizedData.activityTime.activityPreferredTime[activityID],
      ];
    });
    // console.log(newActivityAllowedTime)

    // console.log(newLecturerAllowedTime)
    Object.keys(newLecturerAllowedTime).forEach((activityID) => {
      newLecturerAllowedTime[activityID] = [
        ...newLecturerAllowedTime[activityID],
        ...lecturerInfo.lecturerPreferredTime[activityID],
      ];
    });
    // console.log(newLecturerAllowedTime)

    Object.keys(newRoomAllowedTime).forEach((activityID) => {
      newRoomAllowedTime[activityID] = [
        ...newRoomAllowedTime[activityID],
        ...roomInfo.roomPreferredTime[activityID],
      ];
    });
    // console.log(newRoomAllowedTime)

    localStorage.setItem("mapper", JSON.stringify(mapper));

    let data = {
      nb_activities: Object.keys(finalizedData.moduleMapper).length,
      nb_lecturers: Object.keys(lecturerInfo.lecturerMapper).length,
      nb_rooms: Object.keys(roomInfo.roomMapper).length,
      activity_allowed_times: newActivityAllowedTime,
      activity_preferred_times:
        finalizedData.activityTime.activityPreferredTime,
      lecturer_allowed_times: newLecturerAllowedTime,
      lecturer_preferred_times: lecturerInfo.lecturerPreferredTime,
      activity_allowed_rooms: finalizedData.assignedInfo.activityAllowedRooms,
      room_allowed_times: newRoomAllowedTime,
      room_preferred_times: roomInfo.roomPreferredTime,
      activity_allowed_lecturers:
        finalizedData.assignedInfo.activityAllowedLecturers,
      activities_on_seperate_days: finalizedData.seperateDays,
    };

    return data;
  };

  const giveWorkSlover = () => {
    let data = parseUserInputToSolverData();
    let jobID = localStorage.getItem("jobID");
    if (!jobID) {
      fetch("https://conjure-aas.cs.st-andrews.ac.uk/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          solver: "cadical",
          model: model,
          data: JSON.stringify(data),
          conjure_options: ["--number-of-solutions", "1"],
          appName: "university-timetabling",
        }),
      }).then((response) => {
        setSolutionDiv(
          <Stack spacing={2}>
            <Skeleton variant="rectangular" height={40} width={120} />
            <Skeleton variant="rectangular" height={480} />
          </Stack>
        );

        response.text().then((data) => {
          let job = JSON.parse(data);
          localStorage.setItem("jobID", job.jobid);
          getResultHadnler();
        });
      });
    } else {
      if (
        window.confirm(
          "You already got the timetable, Do you want to regenerate the timetable?"
        )
      ) {
        fetch("https://conjure-aas.cs.st-andrews.ac.uk/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            solver: "cadical",
            model: model,
            data: JSON.stringify(data),
            conjure_options: ["--number-of-solutions", "1"],
            appName: "university-timetabling",
          }),
        }).then((response) => {
          setSolutionDiv(
            <Stack spacing={2}>
              <Skeleton variant="rectangular" height={40} width={120} />
              <Skeleton variant="rectangular" height={480} />
            </Stack>
          );

          response.text().then((data) => {
            let job = JSON.parse(data);
            localStorage.setItem("jobID", job.jobid);
            getResultHadnler();
          });
        });
      }
    }
  };

  const getResult = () => {
    fetch("https://conjure-aas.cs.st-andrews.ac.uk/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobid: localStorage.getItem("jobID"),
        appName: "university-timetabling",
      }),
    }).then((response) => {
      response.text().then((data) => {
        let result = JSON.parse(data);

        setResult(result);
      });
    });
  };

  const exportSolution = () => {
    // console.log((localStorage.getItem('userInfo')))
    let solutionJSON = JSON.parse(localStorage.getItem("solution"));
    let mapperJSON = JSON.parse(localStorage.getItem("mapper"));
    let userInfoJSON = JSON.parse(localStorage.getItem("userInfo"));

    if (solutionJSON.length === 0) {
      alert("There is no solution!");
      return;
    }

    let exportJSON = {
      solution: solutionJSON,
      mapper: mapperJSON,
      userInfo: userInfoJSON,
    };

    const element = document.createElement("a");
    const textFile = new Blob([JSON.stringify(exportJSON)], {
      type: "application/json",
    }); //pass data from localStorage API to blob
    element.href = URL.createObjectURL(textFile);
    element.download = "solution.json";
    document.body.appendChild(element);
    element.click();
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

      setResult(null);
      setSolutionDiv(
        <div className={styles.noSolution}>
          <div>Solution has never been generated</div>
          <div className={styles.noSolutionSub}>
            Please click the solve button to get a solution
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.solutionPage}>
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
      <ThemeProvider theme={theme}>
        {result ? (
          result.solution ? (
            result.solution.length !== 0 ? (
              <div>
                <Button
                  className={styles.exportButton}
                  color="gray"
                  variant="contained"
                  onClick={exportSolution}
                >
                  EXPORT
                </Button>
                <Button
                  className={styles.containerResetButton}
                  color="gray"
                  variant="contained"
                  onClick={resetInputButton}
                >
                  RESET
                </Button>
              </div>
            ) : null
          ) : null
        ) : null}
        <Button
          className={styles.importButton}
          color="gray"
          variant="contained"
          onClick={importModalHandleOpen}
        >
          IMPORT
        </Button>
        <Button
          className={styles.solveButton}
          color="gray"
          variant="contained"
          onClick={giveWorkSlover}
        >
          GET SOLUTION
        </Button>

        <div>
          {result ? (
            result.solution ? (
              result.solution.length !== 0 ? (
                <div className={styles.optionsContainer}>
                  <div>Show options</div>
                  <ThemeProvider theme={theme}>
                    <Tooltip title="Combine all">
                      <IconButton
                        onClick={() => showOptionsHandler("all")}
                        color={showState.all ? "preferred" : "gray"}
                      >
                        <Apps />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Show by activities">
                      <IconButton
                        onClick={() => showOptionsHandler("activities")}
                        color={showState.activities ? "preferred" : "gray"}
                      >
                        <School />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Show by lecturers">
                      <IconButton
                        onClick={() => showOptionsHandler("lecturers")}
                        color={showState.lecturers ? "preferred" : "gray"}
                      >
                        <Person />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Show by rooms">
                      <IconButton
                        onClick={() => showOptionsHandler("rooms")}
                        color={showState.rooms ? "preferred" : "gray"}
                      >
                        <MeetingRoom />
                      </IconButton>
                    </Tooltip>
                  </ThemeProvider>
                </div>
              ) : null
            ) : null
          ) : null}
          {solutionDiv}
        </div>
      </ThemeProvider>
    </div>
  );
};

export default SolutionPage;
