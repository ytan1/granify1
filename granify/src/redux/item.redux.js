const ADD = 'add'
const DELETE = 'delete'
const FETCH = 'fetch'
const initState = {}

export const item = (state = initState, action) => {
    switch (action.type){
        case ADD:
            return state
        case DELETE:
            return state
        case FETCH:
            return state
        
        default: 
            return state
    }
}