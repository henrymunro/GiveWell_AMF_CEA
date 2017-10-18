import React from 'react'
import { connect } from 'react-redux'

import Divider from 'material-ui/Divider'

import * as selectors from '../reducer'
import actions from '../actions'

import ParamsInputHeading from './ParamsInputHeading'
import ParamsInputName from './ParamsInputName'
import ParamsInputValue from './ParamsInputValue'
import ResearcherValuesOverview from './ResearcherValuesOverview'

import colors from '../../colors'

@connect((store, ownProps) => {
  return {

    modelData: selectors.getModelData(store),

  }
}, Object.assign({}, actions))


export default class ParamsInput extends React.Component {

  updateParamValue ({paramName, value}) {
    this.props.updateParamValue({paramName, value})
  }

  setModelValuesToResearcherValues(researcherName) {
    this.props.setModelValuesToResearcherValues({researcherName})
  }

  render () {

    return <div>
      {this.props.modelData.map((section, key) => {
        return <div 
                key={key}
                style={{
                  border: `${colors.A200} solid`,
                  borderWidth: key < section.length-1 ? '0 0 2px 0' : 0,
                  paddingLeft: '5%',
                  paddingRight: '5%'
                }}>
            <ParamsInputHeading heading={section.heading}>
              {section.params.map((param, paramKey) => {
                
                // Set up the dividing borders
                var divBorderStyle = { margin: 0 }
                if (paramKey < section.params.length-1) divBorderStyle.borderBottom = `1px ${colors.A200} solid`
                if (paramKey === 0) divBorderStyle.borderTop = `1px ${colors.A200} solid`
                
                return param.paramName!=="" && <div 
                          className="row"  
                          key={paramKey}
                          style={divBorderStyle}>
                  <div className="col s8">
                    <ParamsInputName paramName={param.paramName} hint={param.hint}/>
                  </div>
                  <div className="col s4" style={{paddingTop: '10px', paddingBottom: '7px'}}>
                    <ParamsInputValue 
                    onUpdate={this.updateParamValue.bind(this)}
                    paramName={param.paramName} 
                    value={param.value} 
                    unit={param.unit} />
                  </div>
                  <ResearcherValuesOverview 
                  researcherValues={param.researcherValues} 
                  paramName={param.paramName} 
                  unit={param.unit} 
                  onResearcherClick={this.setModelValuesToResearcherValues.bind(this)}/> 
                </div>
              })}

          </ParamsInputHeading>
        </div>
      })}
    </div>
  }
}