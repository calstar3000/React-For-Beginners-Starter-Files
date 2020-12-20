import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object,
    removeFromOrder: PropTypes.func.isRequired,
  };

  renderOrder = key => {
    const { fishes, order } = this.props;
    const fish = fishes[key];
    const count = order[key];
    const isAvailable = fish && fish.status === "available";
    const transitionOptions = {
      classNames: "order",
      key, // key: key
      timeout: { enter: 500, exit: 500 },
    };

    // Make sure the fish is loaded before we continue
    if (!fish) {
      return null;
    }

    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : "Fish"} is no longer available
          </li>
        </CSSTransition>
      );
    }

    return (
      <CSSTransition
        classNames="order"
        key={key}
        timeout={{ enter: 500, exit: 500 }}
      >
        <li key={key}>
          <span>
            <TransitionGroup component="span" className="count">
              <CSSTransition {...transitionOptions}>
                <span>{count}</span>
              </CSSTransition>
            </TransitionGroup>
            lbs {fish.name} {formatPrice(fish.price)}
            <button onClick={() => this.props.removeFromOrder(key)}>
              &times;
            </button>
          </span>
        </li>
      </CSSTransition>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const { fishes, order } = this.props;

    const total = orderIds.reduce((previousTotal, key) => {
      const fish = fishes[key];
      const count = order[key];
      const isAvailable = fish && fish.status === "available";

      return isAvailable ? previousTotal + count * fish.price : previousTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total: <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
