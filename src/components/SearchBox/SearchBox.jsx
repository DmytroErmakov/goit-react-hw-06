import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, selectNameFilter } from "../../redux/filtersSlice";

import css from "../SearchBox/SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);


  return (
    <div>
      <p>Find contacts by name</p>
      <form className={css.form}>
        <input
          className={css.field}
          type="text"
          name="text"
          value={filter}
          onChange={e => dispatch(changeFilter(e.target.value))}
          placeholder="Search contacts"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
