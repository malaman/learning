import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div>
              <h2>About</h2>
              <div>
                This is a simple universal (isomorphic) web application, which use power of server side rendering.
                The application use <a target="_blank" href="http://www.etachki.com"> eTachki.com </a>
                public API for backend calls.
              </div>
              <div>
                Following frameworks were used for the application:
                <ul>
                  <li>
                    <a target="_blank" href="https://github.com/facebook/react"> React </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/strongloop/express"> Express </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/yahoo/fluxible"> Fluxible </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/yahoo/fluxible-router"> Fluxible Router </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/yahoo/fetchr"> Fetchr </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/gulpjs/gulp"> Gulp </a>
                  </li>
                  <li>
                    <a target="_blank" href="https://github.com/webpack/webpack"> Webpack </a>
                  </li>
                </ul>
              </div>
            </div>
        );
    }
}

export default About;
