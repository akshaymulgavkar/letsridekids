export const getProfileData = (state)=>{
    return Object.keys(state.publishRides).length>0 ? state.publishRides:null
}