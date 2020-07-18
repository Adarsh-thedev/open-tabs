import React, {Component} from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { Row, Col } from 'react-bootstrap';

import AdBlockDetect from 'react-ad-block-detect';

const ads = {
  ad1:
  '<iframe data-aa="1407350" src="//ad.a-ads.com/1407350?size=320x50&background_color=0080ff&text_color=ffffff&title_color=ffffff&title_hover_color=ffffff&link_color=ffffff&link_hover_color=ffffff" scrolling="no" style="width:320px; height:50px; border:0px; padding:0; overflow:hidden" allowtransparency="true"></iframe>'
};

function Iframe(props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : "" }}
    />
  );
}

export default class Ad extends Component {
render () {
    return (
      <div className='ad'>
          <AdBlockDetect onLoad={this.handleadblock} style={{display: this.state.blockerdisplay}}>
              <div className="ad-blocker" style={{marginBottom: "3vh"}}>
                <Tooltip style={{border: "5px solid #0080ff" }} title={<p style={{ fontSize: "14px", lineHeight: "1.2", textAlign: "center"}}>Adblocker detected.</p>} height="16px">
                  <p style={{color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.36', textAlign: 'center'}}>Please disable your adblocker to see the ads. Want to know how? <a href="https://opentabs.org/adblock.php">Click Here</a></p>
                </Tooltip>
              </div>
            </AdBlockDetect>
            <Row className="ads-row" onLoad={this.handleadblock} style={{display: this.state.addisplay}}>
              <Col style={{textAlign: "center"}}>
                <Tooltip title={<p style={{ fontSize: "14px", lineHeight: "1.2", textAlign: "center" }}>We raise money from these ads to end poverty & stop climate change.</p>}>
                  <div className="Ad1">
                    <Iframe iframe={ads["ad1"]} allow="autoplay"/>,
                  </div>
                </Tooltip>
              </Col>
            </Row>
      </div>
    );
  }
}