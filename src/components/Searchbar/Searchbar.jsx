import React from "react";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

export default class Searchbar extends React.Component {
  state = {
    searchName: "",
  };

  onNameChange = (e) => {
    this.setState({ searchName: e.currentTarget.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchName);
    this.reset();
  };

  reset() {
    this.setState({ searchName: "" });
  }

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onSubmit}>
          <input
            className={s.SearchFormInput}
            type="text"
            value={this.state.searchName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onNameChange}
          />
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
