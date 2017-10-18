import { createActions } from 'redux-actions'
import * as actions from './actionTypes'


const paramsActions = createActions({},
	'UPDATE_SELECTED_RESEARCHER',
	{ namespace: 'RESET_VALUE' }
)

export default Object.assign({}, paramsActions)
