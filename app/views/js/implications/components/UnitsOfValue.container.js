import React from 'react'
import { connect } from 'react-redux'

import paramsImport from '../../paramsInput'
import ImplicationsCard from './ImplicationsCard'
import ImplicationsCardBodyEntry from './ImplicationsCardBodyEntry'

import colors from '../../colors'

const {selectors} = paramsImport 

@connect((store, ownProps) => {
  return {

	modelUnitsOfValue: selectors.getModelUnitsOfValue(store),

  }
})


export default class UnitOfValue extends React.Component {

	roundTo2DP (num) {
		const rounded = Math.floor(num * 100) / 100
		return rounded
	}

  render () {

	const {unitsOfValueFromUnder5DeathsAvertedPerDollar
			,unitOfValueFrom5AndOverDeathsAvertedPerDollar
			,unitsOfValueFromDevelopmentalBenefitsPerDollar
			,totalUnitsOfValue} = this.props.modelUnitsOfValue

	return <div className="" >
		<ImplicationsCard title='UNITS OF VALUE PER $10,000'>
			<div>
				<ImplicationsCardBodyEntry 
					title='Units of value from under 5 deaths averted:'
					value={this.roundTo2DP(unitsOfValueFromUnder5DeathsAvertedPerDollar * 10000)}
					top={true}/>
				<ImplicationsCardBodyEntry 
					title='Units of value from 5 and over deaths averted:'
					value={this.roundTo2DP(unitOfValueFrom5AndOverDeathsAvertedPerDollar * 10000)}/>
				<ImplicationsCardBodyEntry 
					title='Units of value from developmental benefits:'
					value={this.roundTo2DP(unitsOfValueFromDevelopmentalBenefitsPerDollar * 10000)}/>
				<ImplicationsCardBodyEntry 
					title='Total Units of value:'
					value={this.roundTo2DP(totalUnitsOfValue * 10000)}/>
		  	</div>
		</ImplicationsCard>
	</div>
  }
}
