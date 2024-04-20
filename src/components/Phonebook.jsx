import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  Container,
  FormPhonebook,
  ContactsList,
  FinderContacts,
} from './Phonebook.styled';

class Phonebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: JSON.parse(localStorage.getItem('contacts')) || [],
      filter: '',
      name: '',
      number: '',
    };
  }
  componentDidMount() {
    // Load contacts from localStorage
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      this.setState({ contacts: storedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // Save contacts to localStorage when they change
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // Handle input change for adding contact
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Handle input change for filtering contacts
  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  // Handle form submission
  handleSubmit = e => {
    e.preventDefault();
    const { name, number, contacts } = this.state;

    // Check if the name is already in the agenda
    const isNameExists = contacts.some(
      contact => contact.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (isNameExists) {
      alert(`The contact ${name.trim()} is already in the agenda.`);
      return;
      // Exit the function if the name is already in the agenda
    }

    if (name.trim() && number.trim()) {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
        name: '',
        number: '',
      }));
    }
  };

  // Handle contact deletion
  handleContactDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  // Render contact list
  renderContacts = () => {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <ul>
        {filteredContacts.map(contact => (
          <ContactsList key={contact.id}>
            {contact.name}: {contact.number} {}
            <button
              onClick={() => this.handleContactDelete(contact.id)}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </ContactsList>
        ))}
      </ul>
    );
  };

  render() {
    const { name, number, filter } = this.state;
    return (
      <Container className="App">
        <h1>PHONEBOOK</h1>
        <FormPhonebook onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter contact name"
            required
            value={name}
            onChange={this.handleInputChange}
          />
          <label htmlFor="number">Number</label>
          <input
            type="tel"
            name="number"
            placeholder="Enter contact number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add Contact</button>
        </FormPhonebook>

        <FinderContacts>
          <p>Contacts</p>
          <label htmlFor="filter">Search: </label>
          <input
            type="text"
            id="filter"
            name="filter"
            placeholder="Search contact"
            value={filter}
            onChange={this.handleFilterChange}
          />
        </FinderContacts>

        {this.renderContacts()}
      </Container>
    );
  }
}

export default Phonebook;
