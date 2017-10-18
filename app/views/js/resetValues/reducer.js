import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { updateObject } from '../reducers/reducerUtilities'


import {distinctResearchers} from '../parameters'

const initialState = {
	distinctResearchers,
	selectedResearcher: 'Median'
}


export default handleActions({
  UPDATE_SELECTED_RESEARCHER: (state, action) => updateObject(state, {selectedResearcher: action.payload.researcherName}),
}, initialState)



/*  #############       Selectors     ################   */
export const getDistinctResearchers = state => (state.resetValues.distinctResearchers)
export const getSelectedResearcher = state => (state.resetValues.selectedResearcher)



