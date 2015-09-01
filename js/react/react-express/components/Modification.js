import React from 'react';

class Modification extends React.Component {

  render() {
    const {imgUrl, alt, info} = this.props;
    console.logimgUrl;
    return (
      <div className="media">
        <img className="media__figure" src={imgUrl} alt={alt}/>
        <p className="media__body">{info}</p>
      </div>
    );
  }
}

Modification.propTypes = {
  imgUrl:  React.PropTypes.string.isRequired,
  alt:  React.PropTypes.string.isRequired,
  info:  React.PropTypes.string.isRequired
};

export default Modification;