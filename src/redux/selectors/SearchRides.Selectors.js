export const getSearchRidesData = (state)=>{
    return Object.keys(state.searchRides).length>0 ? state.searchRides:null
}
