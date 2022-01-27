import { useState, useEffect } from "react";
import shortid from "shortid";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import ContactsList from "./components/ContactsList/ContactsList";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  const addContact = (text) => {
    const contactId = shortid.generate();
    let includesName = false;
    for (const contact of contacts) {
      if (text.name === contact.name) {
        includesName = true;
        alert(`${text.name} is already in your contacts.`);
      }
    }
    if (!includesName) {
      setContacts((state) =>
        state.concat({
          id: contactId,
          name: text.name,
          number: text.number,
        })
      );
    }
  };

  const deleteContact = (contactId) => {
    setContacts((state) => state.filter((contact) => contact.id !== contactId));
  };

  const contactSearch = (e) => {
    setFilter(e.currentTarget.value);
  };

  useEffect(() => {
    if (localStorage.getItem("contacts")) {
      setContacts(JSON.parse(localStorage.getItem("contacts")));
    }
  }, []);
  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
  return (
    <Container>
      <Header />
      <Form onSubmit={addContact} />
      <ContactsList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
      <Filter value={filter} onChange={contactSearch} />
    </Container>
  );
}
