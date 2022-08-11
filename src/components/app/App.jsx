import React, { useState } from 'react'
import './App.css'
import '../../styles/global.css'
import AddContactModal from '../Modal'

function App() {
  const [contacts, setContacts] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [modal, setModal] = useState(null)
  const [notification, setNotification] = useState(null)

  console.log(contacts)

  const lowerSearchInput = searchInput.toLowerCase()

  const filteredContacts = searchInput.length > 0
    ? contacts.filter(contact => contact.name.toLowerCase().includes(lowerSearchInput))
    : contacts

  function compare(a,b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  }

  function removeContact({ phones }){
    const reducedArray  = contacts.filter((contact) => contact.phones[0] !== phones[0])
    setContacts(reducedArray)
  }

  return (
    <>
      {notification && <div className='notification'>{notification}</div>}
      <div className='container'>
        <header className='header'>
          <h1>Contacts</h1>
          <button onClick={() => setModal(true)}>+</button>
          <input
              type="text" 
              value={searchInput}
              onChange={({ target }) => setSearchInput(target.value)}
              placeholder='Search'
          />
        </header>
        <main className='content'>
          {contacts.length === 0 
            ? <h2>No contact :(</h2>
            : <ul className='list'>
                {filteredContacts.sort(compare).map((contact, index) => (
                  <li key={index}> 
                    {contact.name} | 
                    {contact.phones[0]} |
                    {contact.addresses[0]}
                    <button onClick={() => removeContact(contact)}>x</button>
                  </li>
                ))}
              </ul>
          }
          {contacts.length >= 1 && <span className='total'>{contacts.length} contacts</span>}
        </main>
      </div>
      {modal && <AddContactModal setModal={setModal} setContacts={setContacts} setNotification={setNotification}/>}
    </>
  );
}

export default App;