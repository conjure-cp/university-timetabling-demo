import * as types from '../actions/ActionTypes';

const initialState = {
    userInput: {
        umodules: {},
        activities: {},
        lecturers: {},
        rooms: {},
    }
}

export default function inputHandler(state = initialState, action) {
    switch (action.type) {
        case types.SET_USER_INPUT:
            return {
                ...state,
                userInput: action.userInput
            }
        case types.SET_USER_MODULE:
            return {
                ...state,
                userInput: {
                    ...action.userInput,
                    umodules:
                    {
                        ...action.userInput.umodules,
                        [action.umodule.id]: action.umodule
                    }

                }
            }
        case types.SET_USER_ACTIVITY:
            return {
                ...state,
                userInput: {
                    ...action.userInput,
                    activities:
                    {
                        ...action.userInput.activities,
                        [action.activity.activityModule]: {
                            ...action.userInput.activities[action.activity.activityModule],
                            [action.activity.activity]: {
                                duration: action.activity.duration < 1 ? 1 : action.activity.duration,
                                days: action.activity.days
                            }
                        }
                    }

                }
            }
        case types.SET_USER_LECTURER:
            return {
                ...state,
                userInput: {
                    ...action.userInput,
                    lecturers: {
                        ...action.userInput.lecturers,
                        [action.lecturer.lecturerName]: action.lecturer.time
                    }
                }
            }
        case types.SET_USER_ROOM:
            return {
                ...state,
                userInput: {
                    ...action.userInput,
                    rooms: {
                        ...action.userInput.rooms,
                        [action.room.roomID]: {
                            capacity: action.room.capacity,
                            available: {
                                time: action.room.time
                            },
                        }
                    }
                }
            }
        default:
            return state;

    }
}