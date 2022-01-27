import React, { Component } from "react";
import shortid from "shortid";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import ContactsList from "./components/ContactsList/ContactsList";
import Form from "./components/Form/Form";
import Filter from "./components/Filter/Filter";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = (text) => {
    const contactId = shortid.generate();
    let includesName = false;
    for (const contact of this.state.contacts) {
      if (text.name === contact.name) {
        alert(`${text.name} is already in your contacts.`);
      }
    }
    if (!includesName) {
      this.setState({
        contacts: this.state.contacts.concat({
          id: contactId,
          name: text.name,
          number: text.number,
        }),
      });
    }
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  contactSearch = (e) => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };
  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <Container>
        <Header />
        <Form onSubmit={this.addContact} />
        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
        <Filter value={filter} onChange={this.contactSearch} />
      </Container>
    );
  }
}
export default App;
