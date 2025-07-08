export const getPostRidesData = (state)=>{
    return Object.keys(state.publishRides).length>0 ? state.publishRides:null
}