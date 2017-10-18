import { handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { updateObject } from '../reducers/reducerUtilities'

import runModel from '../model'

import modelData from '../parameters'
import modelConstants from '../constants'

const initialStateData = {
	modelData: modelData,
	modelConstants
}

// Runs Model for initial values
const initialState = Object.assign({}, initialStateData, runModel(initialStateData))

export default handleActions({
  UPDATE_PARAM_VALUE: (state, action) => updateParamValue(state, action),
  SET_MODEL_VALUES_TO_RESEARCHER_VALUES: (state, action) => setValuesToResearcher(state, action), 
  SET_MODEL_VALUES_TO_MEAN: (state, action) => setValuesToMean(state, action), 
  SET_MODEL_VALUES_TO_MEDIAN: (state, action) => setValuesToMedian(state, action), 
}, initialState)

// Manually update the values in the model
const updateParamValue = (state, action) => {
	// Find param element by looping over all sections
	const updatedModel = state.modelData.map((section, sectionKey) => {
		// Then loop over all params in section
		const updatedParams = section.params.map((param, paramKey) => {
			// When param is found update value
			if (param.paramName === action.payload.paramName) {
				return updateObject(param, {value: action.payload.value})
			}
			else {
				return param
			}
		})
		return updateObject(section, {params: updatedParams})
	})
	return Object.assign({}, state, {modelData: updatedModel}, runModel({modelData: updatedModel, modelConstants: state.modelConstants}))
}


// Set all values in the model to copy those of a given researcher 
const setValuesToResearcher = (state, action) => {
	// Loop over all sections to access all params
	const updatedModel = state.modelData.map((section, sectionKey) => {
		// Then loop over all params in each section
		const updatedParams = section.params.map((param, paramKey) => {
			// Find value for researcher
			const researcherValue = param.researcherValues.filter(researcher => researcher.name === action.payload.researcherName)[0].value
			return updateObject(param, {value: Number(researcherValue) || researcherValue})
		})
		return updateObject(section, {params: updatedParams})
	})
	console.log(runModel({modelData: updatedModel, modelConstants: state.modelConstants}))
	return Object.assign({}, state, {modelData: updatedModel}, runModel({modelData: updatedModel, modelConstants: state.modelConstants})) 
}

// Set all values in the model to mean values
const setValuesToMean = (state, action) => {
	// Loop over all sections to access all params
	const updatedModel = state.modelData.map((section, sectionKey) => {
		// Then loop over all params in each section
		const updatedParams = section.params.map((param, paramKey) => {
			// Find value for researcher
			return updateObject(param, {value: param.meanResearcherValues})
		})
		return updateObject(section, {params: updatedParams})
	})
	console.log(runModel({modelData: updatedModel, modelConstants: state.modelConstants}))
	return Object.assign({}, state, {modelData: updatedModel}, runModel({modelData: updatedModel, modelConstants: state.modelConstants})) 
}

// Set all values in the model to median values
const setValuesToMedian = (state, action) => {
	// Loop over all sections to access all params
	const updatedModel = state.modelData.map((section, sectionKey) => {
		// Then loop over all params in each section
		const updatedParams = section.params.map((param, paramKey) => {
			// Find value for researcher
			return updateObject(param, {value: param.medianResearcherValues})
		})
		return updateObject(section, {params: updatedParams})
	})
	console.log(runModel({modelData: updatedModel, modelConstants: state.modelConstants}))
	return Object.assign({}, state, {modelData: updatedModel}, runModel({modelData: updatedModel, modelConstants: state.modelConstants})) 
}

/*  #############       Selectors     ################   */
export const getModelData = state => (state.paramsInput.modelData)
export const getModelConstants = state => (state.paramsInput.modelConstants)

export const getModelCosts = state => {
	const { costPerUnder5DeathAverted
			,costPerAge5PlusDeathAverted
			,costPerDeathAverted
			,costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividualUnder5
			,costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividual5AndOver } = state.paramsInput
	return {
		costPerUnder5DeathAverted
		,costPerAge5PlusDeathAverted
		,costPerDeathAverted
		,costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividualUnder5
		,costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividual5AndOver
	}
}

export const getModelUnitsOfValue = state => {
	const { unitsOfValueFromUnder5DeathsAvertedPerDollar
			,unitOfValueFrom5AndOverDeathsAvertedPerDollar
			,unitsOfValueFromDevelopmentalBenefitsPerDollar
			,totalUnitsOfValue } = state.paramsInput
	return {
		unitsOfValueFromUnder5DeathsAvertedPerDollar
		,unitOfValueFrom5AndOverDeathsAvertedPerDollar
		,unitsOfValueFromDevelopmentalBenefitsPerDollar
		,totalUnitsOfValue
	}
}



