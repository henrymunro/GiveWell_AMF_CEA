import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { updateObject } from '../reducers/reducerUtilities'


import {distinctResearchers} from '../parameters'

const initialState = {
	distinctResearchers,
	selectedResearcher: 'Median',
	modelValueChanged: false
}


export default handleActions({
	UPDATE_SELECTED_RESEARCHER: (state, action) => updateObject(state, {selectedResearcher: action.payload.researcherName}),
	ON_MODEL_VALUE_CHANGE: (state, actions) => updateObject(state, {modelValueChanged: true}),
	SET_MODEL_VALUES_TO_RESEARCHER_VALUES: (state, actions) => updateObject(state, {modelValueChanged: false}),
	SET_MODEL_VALUES_TO_MEAN: (state, actions) => updateObject(state, {modelValueChanged: false}),
	SET_MODEL_VALUES_TO_MEDIAN: (state, actions) => updateObject(state, {modelValueChanged: false}),
}, initialState)



/*  #############       Selectors     ################   */
export const getDistinctResearchers = state => (state.resetValues.distinctResearchers)
export const getSelectedResearcher = state => (state.resetValues.selectedResearcher)
export const getModelValueChanged = state => (state.resetValues.modelValueChanged)



