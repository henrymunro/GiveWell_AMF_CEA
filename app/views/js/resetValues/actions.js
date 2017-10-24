import { createActions } from 'redux-actions'
import * as actions from './actionTypes'


const paramsActions = createActions({},
	actions.UPDATE_SELECTED_RESEARCHER,
	actions.ON_MODEL_VALUE_CHANGE,
	{ namespace: 'RESET_VALUE' }
)

export default Object.assign({}, paramsActions)
