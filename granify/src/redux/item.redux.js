import axios from 'axios'
const FETCH = 'fetchItemSuccess'
const DELETE = 'deleteItemSuccess'
const initState = []

export const item = (state = initState, action) => {
    switch (action.type){
        case FETCH:
            return action.payload
        case DELETE:
            return state.filter(v => v._id !== action.payload)
        
        default: 
            return state
    }
}

export const addItem = (info) => {
    return (dispatch) => {
        return axios.post('http://localhost:4700/item', info)
            .then(res => {
                if(res.data.code == 0){
                    console.log('add sucess')
                }else{
                    console.log('add fail')
                }
            }, err => console.log(err))
    }
}

export const fetchItem = (info) => {
    return dispatch => {
        return axios.get('http://localhost:4700/item')
            .then(res => {
                if(res.data.code == 0){
                    dispatch(fetchItemSuccess(res.data.items))
                }else{
                    console.log("Database error: fetchItem")
                }
            }, err => console.log(err))
    }
}

const fetchItemSuccess = (data) => {
    return {
        type: FETCH,
        payload: data
    }
}

export const deleteItem = (id) => {
    return dispatch => {
        return axios.post('http://localhost:4700/delete', {id})
                .then(res => {
                    if(res.data.code == 0){
                        console.log("Delete sucess")
                        dispatch(deleteItemSuccess(id))
                    }else{
                        console.log("Database error: deleteItem")
                    }
                }, err => console.log(err))
    }
}

const deleteItemSuccess = (id) => {
    return {
        type: DELETE,
        payload: id
    }
}