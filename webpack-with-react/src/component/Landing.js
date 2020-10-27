import React, { Component } from 'react';
import testimage from '../../img/testimage.jpg';
import '../../less/style.less';

class Landing extends Component {
    render() {
        return (
            <>
                <h1>Test Webpack Non React</h1>
                <div>
                    <img id="testImage" src={testimage} />
                </div>
            </>
        );
    }
}

export default Landing;