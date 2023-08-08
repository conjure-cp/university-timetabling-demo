import {
  Button,
  ThemeProvider,
  Tooltip
} from "@mui/material";

import { Done, DoneAll, Info, Close } 
                          from "@mui/icons-material";

import styles             from "../../assets/pages/GeneratePage.module.css";
import { theme }          from "../../utils/theme";

/**
 * Time-slot Selector component for create page.
 * 
 * Note: Replacing the TimeButton and TimeSlotButton 
 * for each row will break the layout. 
 */
const TimeslotSelector = ({ timeSlotRowHandler, timeSlotColumnHandler, timeSlotHandler, activityTimeSlotStatus }) => {

  return (
    <>
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
          
          <div/>
          <div />

          <DayButton onClickDay={() => timeSlotColumnHandler(1)} day="Monday"    />
          <DayButton onClickDay={() => timeSlotColumnHandler(2)} day="Tuesday"   />
          <DayButton onClickDay={() => timeSlotColumnHandler(3)} day="Wednesday" />
          <DayButton onClickDay={() => timeSlotColumnHandler(4)} day="Thursday"  />
          <DayButton onClickDay={() => timeSlotColumnHandler(5)} day="Friday"    />

          <TimeButton onClickTime={() => timeSlotRowHandler(9)} time="9.00" styles={styles} />
          <div className={styles.borderLine} />
            {[1, 2, 3, 4, 5].map((day) => (
                <TimeSlotButton 
                    key={day} 
                    day={day} 
                    time={9} 
                    timeSlotHandler={timeSlotHandler} 
                    activityTimeSlotStatus={activityTimeSlotStatus} 
                    styles={styles} 
                />
            ))}

          <TimeButton onClickTime={() => timeSlotRowHandler(10)} time="10.00" styles={styles} />
          <div className={styles.borderLine} />
            {[1, 2, 3, 4, 5].map((day) => (
                <TimeSlotButton 
                    key={day} 
                    day={day} 
                    time={10} 
                    timeSlotHandler={timeSlotHandler} 
                    activityTimeSlotStatus={activityTimeSlotStatus} 
                    styles={styles} 
                />
            ))}

          <TimeButton onClickTime={() => timeSlotRowHandler(11)} time="11.00" styles={styles} />
          <div className={styles.borderLine} />
            {[1, 2, 3, 4, 5].map((day) => (
                <TimeSlotButton 
                    key={day} 
                    day={day} 
                    time={11} 
                    timeSlotHandler={timeSlotHandler} 
                    activityTimeSlotStatus={activityTimeSlotStatus} 
                    styles={styles} 
                />
            ))}

          <TimeButton onClickTime={() => timeSlotRowHandler(12)} time="12.00" styles={styles} />
          <div className={styles.borderLine} />
            {[1, 2, 3, 4, 5].map((day) => (
                <TimeSlotButton 
                    key={day} 
                    day={day} 
                    time={12} 
                    timeSlotHandler={timeSlotHandler} 
                    activityTimeSlotStatus={activityTimeSlotStatus} 
                    styles={styles} 
                />
            ))}

          <TimeButton onClickTime={() => timeSlotRowHandler(13)} time="13.00" styles={styles} />
          <div className={styles.borderLine} />
            {[1, 2, 3, 4, 5].map((day) => (
                <TimeSlotButton 
                    key={day} 
                    day={day} 
                    time={13} 
                    timeSlotHandler={timeSlotHandler} 
                    activityTimeSlotStatus={activityTimeSlotStatus} 
                    styles={styles} 
                />
            ))}

          <TimeButton onClickTime={() => timeSlotRowHandler(14)} time="14.00" styles={styles} />
          <div className={styles.borderLine} />
            {[1, 2, 3, 4, 5].map((day) => (
                <TimeSlotButton 
                    key={day} 
                    day={day} 
                    time={14} 
                    timeSlotHandler={timeSlotHandler} 
                    activityTimeSlotStatus={activityTimeSlotStatus} 
                    styles={styles} 
                />
            ))}

          <TimeButton onClickTime={() => timeSlotRowHandler(15)} time="15.00" styles={styles} />
          <div className={styles.borderLine} />
            {[1, 2, 3, 4, 5].map((day) => (
                <TimeSlotButton 
                    key={day} 
                    day={day} 
                    time={15} 
                    timeSlotHandler={timeSlotHandler} 
                    activityTimeSlotStatus={activityTimeSlotStatus} 
                    styles={styles} 
                />
            ))}

          <TimeButton onClickTime={() => timeSlotRowHandler(16)} time="16.00" styles={styles} />
          <div className={styles.borderLine} />
            {[1, 2, 3, 4, 5].map((day) => (
                <TimeSlotButton 
                    key={day} 
                    day={day} 
                    time={16} 
                    timeSlotHandler={timeSlotHandler} 
                    activityTimeSlotStatus={activityTimeSlotStatus} 
                    styles={styles} 
                />
            ))}

          </div>
      </ThemeProvider>
    </>
  );
};


/**
 * Day Column Button Component. For selecting the 
 * entire timeslot for the day.
 */
const DayButton = ({ onClickDay, day }) => (
  <Button
    onClick={onClickDay}
    color="gray"
    className={styles.timeSlotHeader}
  >
    {day}
  </Button>
);

/**
 * Time Row Button Component. For selecting the 
 * same timeslot for each day.
 */
const TimeButton = ({ onClickTime, time }) => (
  <div className={styles.timeHeader}>
    <Button
      color="gray"
      onClick={onClickTime}
      className={styles.timeHeaderValue}
    >
      {time}
    </Button>
  </div>
);


/**
 * Time slot Button Component.
 */
const TimeSlotButton = ({ day, time, timeSlotHandler, activityTimeSlotStatus }) => {

    const status = activityTimeSlotStatus[day][time];
    
    const getColor = (status) => {
        if (status === 0) {
            return "white";
        } else if (status === 1) {
            return "allowed";
        } else {
            return "preferred";
        }
    };

    const getIcon = (status) => {
        if (status === 0) {
            return <Close />;
        } else if (status === 1) {
            return <Done />;
        } else {
            return <DoneAll />;
        }
    };

    const getClassName = (status) => {
        if (status === 0) {
            return day === 5 ? styles.timeSlotLastCellNone : styles.timeSlotCellNone;
        } else {
            return day === 5 ? styles.timeSlotLastCell     : styles.timeSlotCell;
        }
    }

    return (
        <Button
            onClick={() => timeSlotHandler(day, time)}
            variant={status === 0 ? "" : "contained"}
            color={getColor(status)}
            className={getClassName(status)}
        >
            {getIcon(status)}
        </Button>
    );
};

export const map_timeslot = (newTimeSlotStatus) => {

  let newAllowedTimeSlot = [];
  let newPreferredTimeSlot = [];

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

  return { newAllowedTimeSlot,newPreferredTimeSlot }
}

export default TimeslotSelector;