import { createActions } from 'redux-actions'
import * as actions from './actionTypes'


const paramsActions = createActions({},
	'UPDATE_PARAM_VALUE',
	'SET_MODEL_VALUES_TO_RESEARCHER_VALUES'
)

export default Object.assign({}, paramsActions)
