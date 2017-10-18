import React from 'react'

import {Tabs, Tab} from 'material-ui/Tabs'


import ConstantsContainer from './Constants.container'
import ParamsInputContainer from './ParamsInput.container'

import colors from '../../colors'


export default class InputsTabPanel extends React.Component {

  render () {

         // style={{background: colors.A100}}

    return <div>
         <Tabs
         style={{borderRadius: '6px'}}
         // contentContainerStyle={{backgroundColor: colors.A500}}
         tabItemContainerStyle={{backgroundColor: colors.A100, borderRadius: '6px 6px 0 0'}}
         inkBarStyle={{background: colors.A300}}>
		    <Tab 
	         // buttonStyle={{backgroundColor: colors.A200}}
	         label="Parameters" >
		    	<div style={{height: '85vh', overflowY: 'scroll'}}>
			     	<ParamsInputContainer />
		    	</div>
		    </Tab>
		    <Tab 
	         // style={{backgroundColor: colors.A100}}
	         label="Constants" >
		    	<div style={{height: '85vh', overflowY: 'scroll'}}>
					<ConstantsContainer />
				</div>
		    </Tab>
		  </Tabs>
    </div>
  }
}

InputsTabPanel.propTypes = {


}
