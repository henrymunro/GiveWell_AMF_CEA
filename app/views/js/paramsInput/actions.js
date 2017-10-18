import { createActions } from 'redux-actions'
import * as actions from './actionTypes'


const paramsActions = createActions({},
	'UPDATE_PARAM_VALUE',
	'SET_MODEL_VALUES_TO_RESEARCHER_VALUES',
	'SET_MODEL_VALUES_TO_MEAN',
	'SET_MODEL_VALUES_TO_MEDIAN'
)

export default Object.assign({}, paramsActions)
