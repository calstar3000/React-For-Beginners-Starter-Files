import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        storeId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { params } = this.props.match;

    // First reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    // Different from the react ref - this is a firebase naming thing
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;

    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
  }

  // When the component is no longer visible, eg. when you go "back"
  componentWillUnmount() {
    // Remove the binding to the database (the listener)
    // This is to prevent memory leaks
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to the state copy
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new state to our updated state copy
    this.setState({ fishes }); // === fishes: fishes
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({ fishes }); // === fishes: fishes
  };

  removeFish = key => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state (must set to null for firebase to update!)
    fishes[key] = null;
    // 3. Set that to state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    // 1. Take a copy of the existing state
    const order = { ...this.state.order };
    // 2. Either add to the order or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order }); // === order: order
  };

  removeFromOrder = key => {
    // 1. Take a copy of the existing state
    const order = { ...this.state.order };
    // 2. Remove that item from order (not using firebase for orders so delete is fine)
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({ order }); // === order: order
  };

  render() {
    const { params } = this.props.match;

    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          fishes={this.state.fishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          loadSampleFishes={this.loadSampleFishes}
          storeId={params.storeId}
        />
      </div>
    );
  }
}

export default App;
