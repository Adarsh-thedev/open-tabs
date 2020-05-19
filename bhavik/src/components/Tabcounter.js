import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

export default class Tabcounter extends Component {
    render() {
        return (
            <div className="tab-counter">
                <Tooltip disableFocusListener title="No. of Tabs Opened" enterDelay={500} leaveDelay={200}>
                    <Button>1000</Button>
                </Tooltip>
            </div>
        )
    }
}
