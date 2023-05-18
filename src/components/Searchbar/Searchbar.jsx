import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  SearchForm,
  Button,
  SearchFormButtonLabel,
  SearchFormInput,
  SearchIcon,
} from './Searchbar.styled';

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
    <Box>
      <SearchForm onSubmit={onHandleSubmit}>
        <Button type="submit">
          <SearchIcon />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </Button>

        <SearchFormInput
          type="text"
          name="search"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onHandleInput}
        />
      </SearchForm>
    </Box>
  );
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
