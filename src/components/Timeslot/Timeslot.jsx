import * as React from 'react';
import styles from "../../assets/components/Timeslot/Timeslot.module.css";

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Button, Tooltip } from '@mui/material';
import { Done, DoneAll, Info, Close } from '@mui/icons-material';

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
        white: {
            main: '#64748B',
            contrastText: '#fff',
        },

        allowed: {
            main: '#64748B',
            contrastText: '#fff',
        },
        preferred: {
            main: '#152D4F',
            contrastText: '#fff'
        },
    },
});

class Timeslot extends React.Component {
    constructor(props) {
        super();
        let newActivityTimeSlotStatus = {
            '1': {
                '9': 0,
                '10': 0,
                '11': 0,
                '12': 0,
                '13': 0,
                '14': 0,
                '15': 0,
                '16': 0,
            },
            '2': {
                '9': 0,
                '10': 0,
                '11': 0,
                '12': 0,
                '13': 0,
                '14': 0,
                '15': 0,
                '16': 0,
            },
            '3': {
                '9': 0,
                '10': 0,
                '11': 0,
                '12': 0,
                '13': 0,
                '14': 0,
                '15': 0,
                '16': 0,
            },
            '4': {
                '9': 0,
                '10': 0,
                '11': 0,
                '12': 0,
                '13': 0,
                '14': 0,
                '15': 0,
                '16': 0,
            },
            '5': {
                '9': 0,
                '10': 0,
                '11': 0,
                '12': 0,
                '13': 0,
                '14': 0,
                '15': 0,
                '16': 0,
            },
        };

        let newActivityPreferredTimeSlot = [];
        let newActivityAllowedTimeSlot = [];

        if (props.timeslot) {

            newActivityAllowedTimeSlot = props.timeslot.allowed;
            Object.keys(props.timeslot.allowed).forEach(index => {
                newActivityTimeSlotStatus[props.timeslot.allowed[index][0]][props.timeslot.allowed[index][1]] = 1;
            })

            newActivityPreferredTimeSlot = props.timeslot.preferred;
            Object.keys(props.timeslot.preferred).forEach(index => {
                newActivityTimeSlotStatus[props.timeslot.preferred[index][0]][props.timeslot.preferred[index][1]] = 2;
            })
        }



        this.state = {
            activityTimeSlotStatus: newActivityTimeSlotStatus,
            activityPreferredTimeSlot: newActivityPreferredTimeSlot,
            activityAllowedTimeSlot: newActivityAllowedTimeSlot,
            stateFromParent: props.timeslot,
            columnHandlerIndex: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            },
            rowHandlerIndex: {
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
            }
        };
    }

    setTimeslotHelper = (newValue) => {
        this.props.setTimeslot(this.props.tab, this.props.index, newValue)
    }

    timeSlotRowHandler = (time) => {
        let newTimeSlotStatus = this.state.activityTimeSlotStatus;
        let newAllowedTimeSlot = [];
        let newPreferredTimeSlot = [];


        let toChange = 0;
        Object.keys(newTimeSlotStatus).forEach((day) => {
            day = parseInt(day)
            switch (this.state.rowHandlerIndex[time]) {

                case 0:
                    newTimeSlotStatus =
                    {
                        ...newTimeSlotStatus,
                        [day]: {
                            ...newTimeSlotStatus[day],
                            [time]: 1
                        }
                    }

                    toChange = 1;
                    break;
                case 1:
                    newTimeSlotStatus =
                    {
                        ...newTimeSlotStatus,
                        [day]: {
                            ...newTimeSlotStatus[day],
                            [time]: 2
                        }
                    }

                    toChange = 2;
                    break;
                default:
                    newTimeSlotStatus =
                    {
                        ...newTimeSlotStatus,
                        [day]: {
                            ...newTimeSlotStatus[day],
                            [time]: 0
                        }
                    }

                    toChange = 0;
                    break;
            }
        })

        Object.keys(newTimeSlotStatus).forEach((day) => {
            Object.keys(newTimeSlotStatus[day]).forEach(time => {
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
            })
        })

        this.setState({
            activityTimeSlotStatus: newTimeSlotStatus,
            activityAllowedTimeSlot: newAllowedTimeSlot,
            activityPreferredTimeSlot: newPreferredTimeSlot,
            rowHandlerIndex: {
                ...this.state.rowHandlerIndex,
                [time]: toChange
            }
        })

        let newValue = {
            ...this.state.stateFromParent
        }

        newValue = {
            ...newValue,
            allowed: newAllowedTimeSlot,
            preferred: newPreferredTimeSlot
        }

        this.setTimeslotHelper(newValue);
    }

    timeSlotColumnHandler = (day) => {

        let newTimeSlotStatus = this.state.activityTimeSlotStatus;
        let newAllowedTimeSlot = [];
        let newPreferredTimeSlot = [];

        let toChange = 0;
        Object.keys(newTimeSlotStatus[day]).forEach((time) => {
            time = parseInt(time);
            switch (this.state.columnHandlerIndex[day]) {
                case 0:

                    newTimeSlotStatus =
                    {
                        ...newTimeSlotStatus,
                        [day]: {
                            ...newTimeSlotStatus[day],
                            [time]: 1
                        }
                    }

                    toChange = 1;
                    break;
                case 1:
                    newTimeSlotStatus =
                    {
                        ...newTimeSlotStatus,
                        [day]: {
                            ...newTimeSlotStatus[day],
                            [time]: 2
                        }
                    }

                    toChange = 2;
                    break;
                default:
                    newTimeSlotStatus =
                    {
                        ...newTimeSlotStatus,
                        [day]: {
                            ...newTimeSlotStatus[day],
                            [time]: 0
                        }
                    }

                    toChange = 0;
                    break;
            }
        })

        Object.keys(newTimeSlotStatus).forEach((day) => {
            Object.keys(newTimeSlotStatus[day]).forEach(time => {
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
            })
        })

        this.setState({
            activityTimeSlotStatus: newTimeSlotStatus,
            activityAllowedTimeSlot: newAllowedTimeSlot,
            activityPreferredTimeSlot: newPreferredTimeSlot,
            columnHandlerIndex: {
                ...this.state.columnHandlerIndex,
                [day]: toChange
            }
        })

        let newValue = {
            ...this.state.stateFromParent
        }

        newValue = {
            ...newValue,
            allowed: newAllowedTimeSlot,
            preferred: newPreferredTimeSlot
        }

        this.setTimeslotHelper(newValue);
    }


    timeSlotHandler = (day, time) => {
        let newTimeSlotStatus = this.state.activityTimeSlotStatus;
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
            Object.keys(newTimeSlotStatus[day]).forEach(time => {
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
            })
        })

        this.setState({
            activityTimeSlotStatus: newTimeSlotStatus,
            activityAllowedTimeSlot: newAllowedTimeSlot,
            activityPreferredTimeSlot: newPreferredTimeSlot,
        })

        let newValue = {
            ...this.state.stateFromParent
        }

        newValue = {
            ...newValue,
            allowed: newAllowedTimeSlot,
            preferred: newPreferredTimeSlot
        }

        this.setTimeslotHelper(newValue);
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className={styles.timeSlot}>
                    <div className={styles.helper}>
                        <div className={styles.helperWrapper}>
                            <div className={styles.allowed} />
                            <div className={styles.helperText}>Allowed Time Slot</div>
                            <Tooltip title={"Allowed timeslot is the number of hours during which classes are available. Preferred timeslot is the preferred timeslot. Since the preferred timeslot is more important than the allowed timeslot, there is a high probability that the class will be assigned to the preferred timeslot."}>
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
                    <Button disabled={this.props.disabled} onClick={() => this.timeSlotColumnHandler(1)} color='gray' className={styles.timeSlotHeader}>Monday</Button>
                    <Button disabled={this.props.disabled} onClick={() => this.timeSlotColumnHandler(2)} color='gray' className={styles.timeSlotHeader}>Tuesday</Button>
                    <Button disabled={this.props.disabled} onClick={() => this.timeSlotColumnHandler(3)} color='gray' className={styles.timeSlotHeader}>Wednesday</Button>
                    <Button disabled={this.props.disabled} onClick={() => this.timeSlotColumnHandler(4)} color='gray' className={styles.timeSlotHeader}>Thursday</Button>
                    <Button disabled={this.props.disabled} onClick={() => this.timeSlotColumnHandler(5)} color='gray' className={styles.timeSlotHeader}>Friday</Button>


                    <div className={styles.timeHeader}>
                        <Button disabled={this.props.disabled} color='gray' onClick={() => this.timeSlotRowHandler(9)} className={styles.timeHeaderValue}>9.00</Button>
                    </div>
                    <div className={styles.borderLine} />
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(1, 9)}
                        variant={this.state.activityTimeSlotStatus[1][9] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[1][9] === 0 ? 'white' : (this.state.activityTimeSlotStatus[1][9] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[1][9] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[1][9] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[1][9] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(2, 9)}
                        variant={this.state.activityTimeSlotStatus[2][9] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[2][9] === 0 ? 'white' : (this.state.activityTimeSlotStatus[2][9] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[2][9] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[2][9] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[2][9] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(3, 9)}
                        variant={this.state.activityTimeSlotStatus[3][9] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[3][9] === 0 ? 'white' : (this.state.activityTimeSlotStatus[3][9] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[3][9] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[3][9] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[3][9] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(4, 9)}
                        variant={this.state.activityTimeSlotStatus[4][9] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[4][9] === 0 ? 'white' : (this.state.activityTimeSlotStatus[4][9] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[4][9] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[4][9] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[4][9] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(5, 9)}
                        variant={this.state.activityTimeSlotStatus[5][9] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[5][9] === 0 ? 'white' : (this.state.activityTimeSlotStatus[5][9] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[5][9] === 0 ? styles.timeSlotLastCellNone : styles.timeSlotLastCell}>
                        {this.state.activityTimeSlotStatus[5][9] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[5][9] === 1 ? <Done /> : <DoneAll />)}
                    </Button>

                    <div className={styles.timeHeader}>
                        <Button disabled={this.props.disabled} color='gray' onClick={() => this.timeSlotRowHandler(10)} className={styles.timeHeaderValue}>10.00</Button>
                    </div>
                    <div className={styles.borderLine} />
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(1, 10)}
                        variant={this.state.activityTimeSlotStatus[1][10] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[1][10] === 0 ? 'white' : (this.state.activityTimeSlotStatus[1][10] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[1][10] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[1][10] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[1][10] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(2, 10)}
                        variant={this.state.activityTimeSlotStatus[2][10] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[2][10] === 0 ? 'white' : (this.state.activityTimeSlotStatus[2][10] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[2][10] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[2][10] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[2][10] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(3, 10)}
                        variant={this.state.activityTimeSlotStatus[3][10] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[3][10] === 0 ? 'white' : (this.state.activityTimeSlotStatus[3][10] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[3][10] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[3][10] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[3][10] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(4, 10)}
                        variant={this.state.activityTimeSlotStatus[4][10] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[4][10] === 0 ? 'white' : (this.state.activityTimeSlotStatus[4][10] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[4][10] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[4][10] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[4][10] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(5, 10)}
                        variant={this.state.activityTimeSlotStatus[5][10] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[5][10] === 0 ? 'white' : (this.state.activityTimeSlotStatus[5][10] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[5][10] === 0 ? styles.timeSlotLastCellNone : styles.timeSlotLastCell}>
                        {this.state.activityTimeSlotStatus[5][10] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[5][10] === 1 ? <Done /> : <DoneAll />)}
                    </Button>


                    <div className={styles.timeHeader}>
                        <Button disabled={this.props.disabled} color='gray' onClick={() => this.timeSlotRowHandler(11)} className={styles.timeHeaderValue}>11.00</Button>
                    </div>
                    <div className={styles.borderLine} />
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(1, 11)}
                        variant={this.state.activityTimeSlotStatus[1][11] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[1][11] === 0 ? 'white' : (this.state.activityTimeSlotStatus[1][11] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[1][11] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[1][11] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[1][11] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(2, 11)}
                        variant={this.state.activityTimeSlotStatus[2][11] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[2][11] === 0 ? 'white' : (this.state.activityTimeSlotStatus[2][11] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[2][11] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[2][11] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[2][11] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(3, 11)}
                        variant={this.state.activityTimeSlotStatus[3][11] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[3][11] === 0 ? 'white' : (this.state.activityTimeSlotStatus[3][11] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[3][11] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[3][11] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[3][11] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(4, 11)}
                        variant={this.state.activityTimeSlotStatus[4][11] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[4][11] === 0 ? 'white' : (this.state.activityTimeSlotStatus[4][11] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[4][11] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[4][11] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[4][11] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(5, 11)}
                        variant={this.state.activityTimeSlotStatus[5][11] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[5][11] === 0 ? 'white' : (this.state.activityTimeSlotStatus[5][11] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[5][11] === 0 ? styles.timeSlotLastCellNone : styles.timeSlotLastCell}>
                        {this.state.activityTimeSlotStatus[5][11] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[5][11] === 1 ? <Done /> : <DoneAll />)}
                    </Button>



                    <div className={styles.timeHeader}>
                        <Button disabled={this.props.disabled} color='gray' onClick={() => this.timeSlotRowHandler(12)} className={styles.timeHeaderValue}>12.00</Button>
                    </div>
                    <div className={styles.borderLine} />
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(1, 12)}
                        variant={this.state.activityTimeSlotStatus[1][12] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[1][12] === 0 ? 'white' : (this.state.activityTimeSlotStatus[1][12] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[1][12] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[1][12] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[1][12] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(2, 12)}
                        variant={this.state.activityTimeSlotStatus[2][12] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[2][12] === 0 ? 'white' : (this.state.activityTimeSlotStatus[2][12] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[2][12] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[2][12] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[2][12] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(3, 12)}
                        variant={this.state.activityTimeSlotStatus[3][12] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[3][12] === 0 ? 'white' : (this.state.activityTimeSlotStatus[3][12] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[3][12] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[3][12] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[3][12] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(4, 12)}
                        variant={this.state.activityTimeSlotStatus[4][12] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[4][12] === 0 ? 'white' : (this.state.activityTimeSlotStatus[4][12] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[4][12] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[4][12] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[4][12] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(5, 12)}
                        variant={this.state.activityTimeSlotStatus[5][12] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[5][12] === 0 ? 'white' : (this.state.activityTimeSlotStatus[5][12] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[5][12] === 0 ? styles.timeSlotLastCellNone : styles.timeSlotLastCell}>
                        {this.state.activityTimeSlotStatus[5][12] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[5][12] === 1 ? <Done /> : <DoneAll />)}
                    </Button>


                    <div className={styles.timeHeader}>
                        <Button disabled={this.props.disabled} color='gray' onClick={() => this.timeSlotRowHandler(13)} className={styles.timeHeaderValue}>13.00</Button>
                    </div>
                    <div className={styles.borderLine} />
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(1, 13)}
                        variant={this.state.activityTimeSlotStatus[1][13] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[1][13] === 0 ? 'white' : (this.state.activityTimeSlotStatus[1][13] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[1][13] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[1][13] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[1][13] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(2, 13)}
                        variant={this.state.activityTimeSlotStatus[2][13] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[2][13] === 0 ? 'white' : (this.state.activityTimeSlotStatus[2][13] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[2][13] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[2][13] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[2][13] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(3, 13)}
                        variant={this.state.activityTimeSlotStatus[3][13] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[3][13] === 0 ? 'white' : (this.state.activityTimeSlotStatus[3][13] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[3][13] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[3][13] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[3][13] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(4, 13)}
                        variant={this.state.activityTimeSlotStatus[4][13] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[4][13] === 0 ? 'white' : (this.state.activityTimeSlotStatus[4][13] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[4][13] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[4][13] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[4][13] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(5, 13)}
                        variant={this.state.activityTimeSlotStatus[5][13] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[5][13] === 0 ? 'white' : (this.state.activityTimeSlotStatus[5][13] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[5][13] === 0 ? styles.timeSlotLastCellNone : styles.timeSlotLastCell}>
                        {this.state.activityTimeSlotStatus[5][13] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[5][13] === 1 ? <Done /> : <DoneAll />)}
                    </Button>


                    <div className={styles.timeHeader}>
                        <Button disabled={this.props.disabled} color='gray' onClick={() => this.timeSlotRowHandler(14)} className={styles.timeHeaderValue}>14.00</Button>
                    </div>
                    <div className={styles.borderLine} />
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(1, 14)}
                        variant={this.state.activityTimeSlotStatus[1][14] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[1][14] === 0 ? 'white' : (this.state.activityTimeSlotStatus[1][14] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[1][14] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[1][14] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[1][14] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(2, 14)}
                        variant={this.state.activityTimeSlotStatus[2][14] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[2][14] === 0 ? 'white' : (this.state.activityTimeSlotStatus[2][14] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[2][14] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[2][14] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[2][14] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(3, 14)}
                        variant={this.state.activityTimeSlotStatus[3][14] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[3][14] === 0 ? 'white' : (this.state.activityTimeSlotStatus[3][14] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[3][14] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[3][14] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[3][14] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(4, 14)}
                        variant={this.state.activityTimeSlotStatus[4][14] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[4][14] === 0 ? 'white' : (this.state.activityTimeSlotStatus[4][14] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[4][14] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[4][14] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[4][14] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(5, 14)}
                        variant={this.state.activityTimeSlotStatus[5][14] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[5][14] === 0 ? 'white' : (this.state.activityTimeSlotStatus[5][14] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[5][14] === 0 ? styles.timeSlotLastCellNone : styles.timeSlotLastCell}>
                        {this.state.activityTimeSlotStatus[5][14] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[5][14] === 1 ? <Done /> : <DoneAll />)}
                    </Button>


                    <div className={styles.timeHeader}>
                        <Button disabled={this.props.disabled} color='gray' onClick={() => this.timeSlotRowHandler(15)} className={styles.timeHeaderValue}>15.00</Button>
                    </div>
                    <div className={styles.borderLine} />
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(1, 15)}
                        variant={this.state.activityTimeSlotStatus[1][15] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[1][15] === 0 ? 'white' : (this.state.activityTimeSlotStatus[1][15] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[1][15] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[1][15] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[1][15] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(2, 15)}
                        variant={this.state.activityTimeSlotStatus[2][15] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[2][15] === 0 ? 'white' : (this.state.activityTimeSlotStatus[2][15] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[2][15] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[2][15] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[2][15] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(3, 15)}
                        variant={this.state.activityTimeSlotStatus[3][15] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[3][15] === 0 ? 'white' : (this.state.activityTimeSlotStatus[3][15] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[3][15] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[3][15] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[3][15] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(4, 15)}
                        variant={this.state.activityTimeSlotStatus[4][15] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[4][15] === 0 ? 'white' : (this.state.activityTimeSlotStatus[4][15] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[4][15] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[4][15] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[4][15] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(5, 15)}
                        variant={this.state.activityTimeSlotStatus[5][15] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[5][15] === 0 ? 'white' : (this.state.activityTimeSlotStatus[5][15] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[5][15] === 0 ? styles.timeSlotLastCellNone : styles.timeSlotLastCell}>
                        {this.state.activityTimeSlotStatus[5][15] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[5][15] === 1 ? <Done /> : <DoneAll />)}
                    </Button>


                    <div className={styles.timeHeader}>
                        <Button disabled={this.props.disabled} color='gray' onClick={() => this.timeSlotRowHandler(16)} className={styles.timeHeaderValue}>16.00</Button>
                    </div>
                    <div className={styles.borderLine} />
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(1, 16)}
                        variant={this.state.activityTimeSlotStatus[1][16] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[1][16] === 0 ? 'white' : (this.state.activityTimeSlotStatus[1][16] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[1][16] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[1][16] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[1][16] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(2, 16)}
                        variant={this.state.activityTimeSlotStatus[2][16] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[2][16] === 0 ? 'white' : (this.state.activityTimeSlotStatus[2][16] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[2][16] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[2][16] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[2][16] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(3, 16)}
                        variant={this.state.activityTimeSlotStatus[3][16] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[3][16] === 0 ? 'white' : (this.state.activityTimeSlotStatus[3][16] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[3][16] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[3][16] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[3][16] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(4, 16)}
                        variant={this.state.activityTimeSlotStatus[4][16] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[4][16] === 0 ? 'white' : (this.state.activityTimeSlotStatus[4][16] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[4][16] === 0 ? styles.timeSlotCellNone : styles.timeSlotCell}>
                        {this.state.activityTimeSlotStatus[4][16] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[4][16] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                    <Button disabled={this.props.disabled}
                        onClick={() => this.timeSlotHandler(5, 16)}
                        variant={this.state.activityTimeSlotStatus[5][16] === 0 ? '' : "contained"}
                        color={this.state.activityTimeSlotStatus[5][16] === 0 ? 'white' : (this.state.activityTimeSlotStatus[5][16] === 1 ? 'allowed' : 'preferred')}
                        className={this.state.activityTimeSlotStatus[5][16] === 0 ? styles.timeSlotLastCellNone : styles.timeSlotLastCell}>
                        {this.state.activityTimeSlotStatus[5][16] === 0 ? <Close /> : (this.state.activityTimeSlotStatus[5][16] === 1 ? <Done /> : <DoneAll />)}
                    </Button>
                </div>
            </ ThemeProvider >
        )
    }
}

export default Timeslot;