import React, { Component } from 'react';
import './App.css';

class HelloMessage extends React.Component {
  render() {
    return React.createElement("div", null, "Hello ", this.props.name);
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0
    };
    this.tick = this.tick.bind(this);
  }
  tick() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return React.createElement("div", null, "Seconds Elapsed: ", this.state.secondsElapsed);            
  }
}

function TodoList(props) {
  var createItem = function(itemText,index) {
    return <li key={index}>{itemText}</li>
  };
  return (
    <ul>
      {props.items.map(createItem)}
    </ul>
  );
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: [], text: ''};
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  }

  render() {
    return (
      React.createElement("div", null,
        React.createElement("h3", null, "TODO"),
        React.createElement(TodoList, {items: this.state.items}),
        React.createElement("form", {onSubmit: this.handleSubmit},
          React.createElement("input", {onChange: this.onChange, value: this.state.text}),
          React.createElement("button", null, 'Add #' + (this.state.items.length + 1))
        )
      )
    );
  }
}

class Refs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearAndFocusInput = this.clearAndFocusInput.bind(this);
  }

  handleChange(e) {
    this.setState({userInput: e.target.value});
  }

  clearAndFocusInput() {
    // Clear the input
    this.setState({userInput: ''}, function() {
      // This code executes after the component is re-rendered
      this.refs.theInput.focus();   // Boom! Focused!
    });
  }

  render() {
    return (
      React.createElement("div", null,
        React.createElement("div", {onClick: this.clearAndFocusInput},
         'Click to Focus and Reset' 
       ),
        React.createElement("input",
          {ref: 'theInput', value: this.state.userInput, onChange: this.handleChange}
        )
      )     
    );
  }
}

class ProductCategoryRow extends React.Component {
  
  render() {
    return (
      React.createElement('tr', null,
        React.createElement('td', {style: {fontWeight: 'bold'}}, this.props.category)
      )      
    );    
  }
}

class ProductRow extends React.Component {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      React.createElement('tr', null,
        React.createElement('td', null, name),
        React.createElement('td', null, this.props.product.price)
      )
      
    );     
  }
}

class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;

    this.props.products.forEach(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {        
        rows.push(React.createElement(ProductCategoryRow, {category: product.category, key: product.category}));
      }      
      rows.push(React.createElement(ProductRow, {product, key: product.name}));
      lastCategory = product.category;
    }.bind(this));
    return (
      React.createElement('table', null,
        React.createElement('thead', null,
          React.createElement('tr', null,
            React.createElement('th', null, 'Name'),
            React.createElement('th', null, 'Price')
          )
        ),
        React.createElement('tbody', null, rows)      
      )
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  }

  render() {
    return (
      React.createElement('form', null, 
        React.createElement('input', {
          type: 'text',
          placeholder:'Search...',
          value: this.props.filterText,
          ref: 'filterTextInput',
          onChange: this.handleChange          
        }),
        React.createElement('p', null, 
          React.createElement('input', {
            type: 'checkbox',
            value: this.props.inStockOnly,
            ref: 'inStockOnlyInput',
            onChange: this.handleChange
          }),
          'Only show products in stock'
        )
      )
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  }

  render() {
    return (
      React.createElement('div', null,
        React.createElement(SearchBar, {
          filterText: this.state.filterText,
          inStockOnly: this.state.inStockOnly,
          onUserInput: this.handleUserInput          
        }), 
        React.createElement(ProductTable, {
          products: this.props.products,
          filterText: this.state.filterText,
          inStockOnly: this.state.inStockOnly
        }),
      )
    );
  }
}

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];





class App extends Component {
  render() {
    return (
      <div>
        <HelloMessage name='John' />
        <Timer />
        <TodoApp />
        <Refs />
        <FilterableProductTable products={PRODUCTS} />
      </div>
    );
  }
}

export default App;
