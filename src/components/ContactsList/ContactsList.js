import React from "react";
import PropTypes from "prop-types";
import { List, ListItem, Name, Number, DelButton } from "./Contacts.styled";

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <ListItem key={id}>
          <Name>{name}</Name>
          <Number>{number}</Number>
          <DelButton onClick={() => onDeleteContact(id)}>
            Удалить
          </DelButton>
        </ListItem>
      ))}
    </List>
  );
};

ContactsList.propTypes = {
  contacts: PropTypes.array,
};

export default ContactsList;
