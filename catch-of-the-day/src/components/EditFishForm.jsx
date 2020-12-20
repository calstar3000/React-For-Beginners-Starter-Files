import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.string.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
  };

  handleChange = event => {
    // 1. Take a copy of the current fish, mapping names to values dynamically
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };

    // 2. Send the update "up-stream" (hehe)
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          name="name"
          ref={this.nameRef}
          type="text"
          value={this.props.fish.name}
          onChange={this.handleChange}
        />
        <input
          name="price"
          type="text"
          value={this.props.fish.price}
          onChange={this.handleChange}
        />
        <select
          name="status"
          ref={this.statusRef}
          value={this.props.fish.status}
          onChange={this.handleChange}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          ref={this.descRef}
          value={this.props.fish.desc}
          onChange={this.handleChange}
        />
        <input
          name="image"
          ref={this.imageRef}
          type="text"
          value={this.props.fish.image}
          onChange={this.handleChange}
        />
        <button onClick={() => this.props.removeFish(this.props.index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
