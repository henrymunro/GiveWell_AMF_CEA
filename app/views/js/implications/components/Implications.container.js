import React from 'react'

import CostPerOutcomeAsGoodAs from './CostPerOutcomeAsGoodAs.container'
import DollarValues from './DollarValues.container'
import UnitsOfValue from './UnitsOfValue.container'


export default class Implications extends React.Component {

  render () {


    return <div className="" >
      <div>
        <CostPerOutcomeAsGoodAs />
      </div>
    	<div style={{marginTop: '12px'}}>
	   		<DollarValues />
    	</div>
	   	<div style={{marginTop: '12px'}}>
	   		<UnitsOfValue />
	   	</div>
    </div>
  }
}
