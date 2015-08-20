import React from 'react';

class Maker extends React.Component {

  render() {
    const {maker} = this.props;
    const {url} = this.props;
    return (
      <li>
        <a href={url}>{maker.ru_name}</a>
      </li>
    );
  }
}

Maker.propTypes = {
  maker: React.PropTypes.object.isRequired,
  url:  React.PropTypes.string.isRequired
};

export default Maker;
