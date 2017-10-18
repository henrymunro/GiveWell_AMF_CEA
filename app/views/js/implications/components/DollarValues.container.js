import React from 'react'
import { connect } from 'react-redux'

import paramsImport from '../../paramsInput'
import ImplicationsCard from './ImplicationsCard'
import ImplicationsCardBodyEntry from './ImplicationsCardBodyEntry'

import colors from '../../colors'

const {selectors} = paramsImport 

@connect((store, ownProps) => {
  return {

    modelCosts: selectors.getModelCosts(store),

  }
})


export default class DollarValues extends React.Component {

  render () {

  	const {costPerUnder5DeathAverted, 
  			costPerAge5PlusDeathAverted,
  			costPerDeathAverted} = this.props.modelCosts

    return <div className="" >
   		
   		<ImplicationsCard title='DOLLAR COSTS'>
   			<div>
        <ImplicationsCardBodyEntry 
          title='Cost per Under-5 Death Averted:'
          value={costPerUnder5DeathAverted}
          top={true}
          increaseBad={true}
          unit='$'/>
          <ImplicationsCardBodyEntry 
          title='Cost per age 5+ Death Averted:'
          value={costPerAge5PlusDeathAverted}
          increaseBad={true}
          unit='$'/>
          <ImplicationsCardBodyEntry 
          title='Cost per Death Averted:'
          value={costPerDeathAverted}
          increaseBad={true}
          unit='$'/>
		  	</div>
   		</ImplicationsCard>
    </div>
  }
}
