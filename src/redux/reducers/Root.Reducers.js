import { combineReducers } from 'redux';
import { ErrorReducers } from './Error.Reducers';
import { StatusReducers } from './Status.Reducers';
import { UserReducers } from './User.Reducers';
import { SearchRidesReducers } from './SearchRides.Reducers'
import { PublishRidesReducers } from './PublishRides.Reducers';
import { RidesReducers } from './Rides.Reducers';
import { ProfileReducers } from './Profile.Reducers';

export const RootReducers = combineReducers({
    error: ErrorReducers,
    status: StatusReducers,
    user: UserReducers,
    searchRides:SearchRidesReducers,
    publishRides:PublishRidesReducers,
    rides:RidesReducers,
    profile:ProfileReducers
});