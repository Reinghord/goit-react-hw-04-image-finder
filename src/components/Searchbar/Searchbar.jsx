import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  //Method to store input value in component state
  const onHandleInput = e => {
    setValue(e.currentTarget.value);
  };

  //Method to handle search submit
  //Prevents page reloading
  //Lifting state up using onSubmit prop
  const onHandleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onHandleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          name="search"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onHandleInput}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
