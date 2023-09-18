export const increment = () => {
    return {
        type: "INCREMENT"
    }
}

export const decrement = () => {
    return {
        type: "DECREMENT"
    }
}

export const currentUser = (payload)=>{
    return{
        type:"SET_USER",
        payload:payload
    }
}