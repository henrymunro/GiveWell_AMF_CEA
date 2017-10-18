import React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'

import { InputsTabPanel } from './paramsInput'
import { Implications } from './implications'
import { ResetValues } from './resetValues'

import colors from './colors'

export default class HomeLayout extends React.Component {

  render () {


          // will-change: opacity;
    return <div style={{paddingTop: '10px', height: '100vh', width: '100vw', backgroundColor: colors.A500}}>
      <div style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <style dangerouslySetInnerHTML={{__html: `
          .cf:after {
            content: "";
            display: table;
            clear: both;
          } 
        `}} />
        <div className="row">
          <div className="col s6">
            <Card style={{borderRadius: '6px 6px 0 0'}}>
              <InputsTabPanel />
            </Card>
          </div>
          <div className="col s6">
            <div>
              <ResetValues />
            </div>
            <div style={{paddingTop: '12px'}}>
              <Implications />
            </div>
     			</div>
     		</div>
      </div>
    </div>
  }
}
