import { combineReducers } from 'redux'

import { reducer as paramsInput } from '../paramsInput'
import { reducer as resetValues } from '../resetValues'

export default combineReducers({
  paramsInput,
  resetValues
})
