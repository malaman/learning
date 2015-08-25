import React from 'react';

class CatalogLink extends React.Component {

  render() {
    const {entity} = this.props;
    const {url} = this.props;
    return (
      <li>
        <a href={url}>{entity.ru_name}</a>
      </li>
    );
  }
}

CatalogLink.propTypes = {
  entity: React.PropTypes.object.isRequired,
  url:  React.PropTypes.string.isRequired
};

export default CatalogLink;
