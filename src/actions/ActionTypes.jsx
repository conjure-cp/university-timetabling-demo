export const SET_USER_INPUT = "SET_USER_INPUT";
export const SET_USER_MODULE = "SET_USER_MODULE";
export const SET_USER_ACTIVITY = "SET_USER_ACTIVITY";
export const SET_USER_LECTURER = "SET_USER_LECTURER";
export const SET_USER_ROOM = "SET_USER_ROOM";

export function setUserInputs(userInput) {
    return {
        type: SET_USER_INPUT,
        userInput
    };
}

export function setUserModule(userInput, umodule) {
    return {
        type: SET_USER_MODULE,
        userInput,
        umodule
    };
}

export function setUserActivity(userInput, activity) {
    return {
        type: SET_USER_ACTIVITY,
        userInput,
        activity
    };
}

export function setUserLecturer(userInput, lecturer) {
    return {
        type: SET_USER_LECTURER,
        userInput,
        lecturer
    };
}

export function setUserRoom(userInput, room) {
    return {
        type: SET_USER_ROOM,
        userInput,
        room
    };
}
