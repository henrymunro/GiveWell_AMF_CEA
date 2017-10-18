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

  	const {costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividualUnder5
      ,costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividual5AndOver} = this.props.modelCosts

    return <div className="" >
   		
   		<ImplicationsCard title='COST PER OUTCOME AS GOOD AS:'>
   			<div>
        <ImplicationsCardBodyEntry 
          title='Averting the Death of an Individual Under 5:'
          value={costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividualUnder5}
          top={true}
          increaseBad={true}
          unit='$'/>
          <ImplicationsCardBodyEntry 
          title='Averting the Death of an Individual 5 or Older:'
          value={costPerOutcomeAsGoodAsAvertingTheDeathOfAnIndividual5AndOver}
          increaseBad={true}
          unit='$'/>
		  	</div>
   		</ImplicationsCard>
    </div>
  }
}
