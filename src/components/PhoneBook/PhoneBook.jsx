import React, { Component } from 'react';
import PhoneBookForm from './PhoneBookForm';
import PhoneBookList from './PhoneBookList';
import Filter from '../Filter';
import { nanoid } from 'nanoid';
class PhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = (name, number) => {
    const normalizedFilter = name.toLowerCase();
    const isContactExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === normalizedFilter
    );

    if (isContactExist) {
      alert(`${name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
    }
  };

  deleteContactHandler = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilterHandler = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  render() {
    const { filter } = this.state;
    const normalizedFilter = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <div>
        <PhoneBookForm onSubmit={this.formSubmitHandler} />

        <Filter
          filter={filter}
          changeFilterHandler={this.changeFilterHandler}
        />
        <PhoneBookList
          visibleContacts={visibleContacts}
          onDeleteContact={this.deleteContactHandler}
        />
      </div>
    );
  }
}
export default PhoneBook;
