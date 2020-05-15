import { RootState } from '../store'

export const selectCoords = ( state: RootState ) => state.location.coords
