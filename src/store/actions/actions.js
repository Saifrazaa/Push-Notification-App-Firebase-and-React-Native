import firebase from "react-native-firebase";
import ActionTypes from "../constants";
let SingleGroup;
export const fetchChats = () => {
    return {
        type: ActionTypes.FETCH_CHATS_SUCCESS,
        payload: [
            { username: "Saif Ali", lastmessage: "3:43 Pm", },
            { username: "Haroon", lastmessage: "3:43 Pm", },
            { username: "Khalid", lastmessage: "3:43 Pm", },
            { username: "Zeeshan", lastmessage: "3:43 Pm", },
            { username: "Arif", lastmessage: "3:43 Pm", },
            { username: "Ahmed Ali", lastmessage: "3:43 Pm", },
            { username: "Mudassir Barra", lastmessage: "3:43 Pm", },
            { username: "Raees Ahmed", lastmessage: "3:43 Pm", },
            { username: "Nafees Ahmed", lastmessage: "3:43 Pm", },
            { username: "Fatima Raees", lastmessage: "3:43 Pm", },
        ]
    }
}
export const handleModal = (arg) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.HANDLE_MODAL,
            payload: arg
        })
    }
}
export const createGroup = (arg) => {
    const group = {
        groupName: arg,
        superAdmin: firebase.auth().currentUser._user.phoneNumber,
        members: []
    }
    return dispatch => {
        const response = firebase.database().ref("Groups").push(group).then(() => {
            dispatch({
                type: ActionTypes.GROUP_CREATED_SUCCESSFULLY
            })
        });


    }
}
export const fetchGroups = () => {
    return dispatch => {
        firebase.database().ref("Groups").on("value", (snap) => {
            let arr = [];
            const values = snap.val();
            for (let key in values) {
                arr.push({ ...values[key], key, })
            }
            for (let i = 0; i < arr.length; i++) {
                if (arr[i]['Members'] !== undefined) {
                    const vals = Object.values(arr[i]['Members']);
                    arr[i].members = vals;
                }
            }
            dispatch({
                type: ActionTypes.GROUPS_FETCHED_SUCCESS,
                payload: arr
            })
        })
    }
}
export const getSpecificGroup = (arg) => {
    const user = firebase.auth().currentUser._user.phoneNumber;
    return dispatch => {
        if (arg !== null) {
            firebase.database().ref(`Groups/${arg}`).on("value", (snap) => {
                const val = snap.val();
                if (val !== null) {
                    val["key"] = arg;
                    let arr = [];
                    let request_sent;
                    if (val.JoinRequests !== undefined) {
                        const vals = val.JoinRequests;
                        const keys = Object.keys(vals);
                        const value = Object.values(vals);
                        request_sent = value.includes(user);
                        for (let key in keys) {
                            arr.push({ key: keys[key], value: value[key] });
                        }
                    }
                    const members = [];
                    const admins = [];
                    if (val.Members !== undefined) {
                        const vals = val.Members;
                        for (let key in vals) {
                            members.push({ key: key, member: vals[key] })
                        }
                    }
                    if (val.admins !== undefined) {
                        const vals = val.admins;
                        for (let key in vals) {
                            admins.push({ key: key, admin: vals[key] })
                        }
                    }
                    val["request_sent"] = request_sent;
                    val["join_request"] = arr;
                    val["members"] = members;
                    val["admins"] = admins;
                    delete val.JoinRequests;
                    dispatch({
                        type: ActionTypes.GET_SPECIFIC_GROUP_SUCCESS,
                        payload: val
                    })
                }
            })
        }
    }
}
export const sendJoinRequest = (key) => {
    const user = firebase.auth().currentUser._user.phoneNumber;
    return dispatch => {
        if (key !== null) {
            firebase.database().ref(`Groups/${key}/JoinRequests`).push(user).then((res) => {
                dispatch({
                    type: ActionTypes.JOIN_GROUP_REQUESTS_SUCCESS
                })
            });
        }
    }
}
export const handleJoinRequest = (arg) => {
    return dispatch => {
        if (arg !== null) {
            if (arg.type === "approve") {
                firebase.database().ref(`Groups/${arg.groupKey}/Members`).push(arg.value).then(() => {
                    firebase.database().ref(`Groups/${arg.groupKey}/JoinRequests/${arg.requestKey}`).remove();
                }).catch((error) => {
                    alert(error.message)
                })
            }
            if (arg.type === "delete") {
                firebase.database().ref(`Groups/${arg.groupKey}/JoinRequests/${arg.requestKey}`).remove();

            }
        }
    }
}
export const fetchMembers = (key) => {
    return dispatch => {
        if (key !== null) {
            firebase.database().ref(`Groups/${key}/Members`).on('value', (snap) => {
                const values = snap.val();
                let members = [];
                for (let keys in values) {
                    members.push({ key: keys, member: values[keys] })
                }
                dispatch({
                    type: ActionTypes.FETCH_MEMBERS_SUCCESS,
                    payload: members
                })
            })
        }
    }
}
export const handleMembers = (arg) => {
    return dispatch => {
        if (arg !== null) {
            if (arg.action === "approve") {
                firebase.database().ref(`Groups/${arg.groupKey}/admins`).push(arg.member).then((res) => {
                    firebase.database().ref(`Groups/${arg.groupKey}/Members/${arg.memberKey}`).remove()
                })
            }
            if (arg.action === "ban") {
                firebase.database().ref(`Groups/${arg.groupKey}/Members/${arg.memberKey}`).remove()
            }
        }
    }
}
export const fetchAdmins = (key) => {
    return dispatch => {
        if (key !== null) {
            firebase.database().ref(`Groups/${key}/admins`).on('value', (snap) => {
                const values = snap.val();
                let admins = [];
                for (let keys in values) {
                    admins.push({ key: keys, admin: values[keys] })
                }
                dispatch({
                    type: ActionTypes.FETCH_ADMINS_SUCCESS,
                    payload: admins
                })
            })
        }
    }
}
export const deleteGroup = (key) => {
    return dispatch => {
        if (key !== null) {
            firebase.database().ref(`Groups/${key}`).remove();
        }
    }
}