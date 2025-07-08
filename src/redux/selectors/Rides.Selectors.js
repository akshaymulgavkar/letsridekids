export const getRides = (state)=>{
    return Object.keys(state.rides).length>0 ? state.rides:null
}
