import React from "react";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../redux/store";
import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import contactsData from "../../contacts.json";
import { setContacts } from "../../redux/contactsSlice";

import css from "../App/App.module.css";

function InitializeContacts() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("persist:contacts"));
    if (!savedContacts || !savedContacts.contacts) {
      console.log("Loading initial contacts from JSON");
      dispatch(setContacts(contactsData));
    }
  }, [dispatch]);

  return null;
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InitializeContacts />
        <div className={css.container}>
          <h1>Phonebook</h1>
          <ContactForm />
          <SearchBox />
          <ContactList />
        </div>
      </PersistGate>
    </Provider>
  );
}
