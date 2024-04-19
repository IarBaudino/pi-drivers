import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { driverByName } from '../../redux/actions/actions';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(driverByName(input));
    setInput(''); // Limpiamos el estado del input después de enviar el formulario
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleChange} type="text" placeholder="Find a driver" />
        <button type="submit">Search</button> {/* Usamos un botón de tipo submit para enviar el formulario */}
      </form>
    </div>
  );
};

export default SearchBar;