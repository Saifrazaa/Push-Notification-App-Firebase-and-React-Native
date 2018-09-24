const InitialState = {
    modal: false,
    groups: [],
    group: {},
    fetching: true,
    success: false,
    members: [],
    admins: []
}
import ActionTypes from "../constants";
export default function PushNotification(state = InitialState, action) {
    switch (action.type) {
        case ActionTypes.FETCH_CHATS_SUCCESS:
            return Object.assign({}, state, { chats: action.payload });
        case ActionTypes.HANDLE_MODAL:
            return Object.assign({}, state, { modal: action.payload })
        case ActionTypes.GROUP_CREATED_SUCCESSFULLY:
            return Object.assign({}, state, { modal: false })
        case ActionTypes.GROUPS_FETCHED_SUCCESS:
            return Object.assign({}, state, { groups: action.payload, fetching: false })
        case ActionTypes.GET_SPECIFIC_GROUP_SUCCESS:
            return Object.assign({}, state, { group: action.payload })
        case ActionTypes.JOIN_GROUP_REQUESTS_SUCCESS:
            return Object.assign({}, state, { success: true })
        case ActionTypes.FETCH_MEMBERS_SUCCESS:
            return Object.assign({}, state, { members: action.payload })
        case ActionTypes.FETCH_ADMINS_SUCCESS:
            return Object.assign({}, state, { admins: action.payload })

        default:
            return state;
    }
}