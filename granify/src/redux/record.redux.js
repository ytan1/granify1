import io from 'socket.io-client'
//the ip address of the api server
export const socket = io.connect('http://localhost:4700')
const REGISTER = 'register'
const ADD = 'add'
const DELETE = 'delete'
const initState = {
    add: 0,
    del: 0,
    hour: 0
}
export const record = (state = initState, action) => {
    switch (action.type){
        case ADD:
            return {
                ...state,
                hour: action.payload.time,
                add: action.payload.record
            } 
        case DELETE: 
            return {
                ...state, 
                hour: action.payload.time,
                del: action.payload.record
            }
        default: 
            return state
    }
}
const addRecord = (data) => {
    return {
        type: ADD,
        payload: data
    }
}
const delRecord = (data) => {
    return {
        type: DELETE,
        payload: data
    }
}
export const registerSocket = () => {
    return dispatch => {
        socket.on('add', (data) => {
            dispatch(addRecord(data))
        })
        socket.on('delete', data => {
            dispatch(delRecord(data))
        })
    }
}