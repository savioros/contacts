import React from 'react'
import Form from '../Form/index'
import './styles.css'

function AddContactModal({ setModal, setContacts, setNotification }) {

    function closeModal({ target, currentTarget }){
        if(target === currentTarget) setModal(null)
    }

    return (
        <div className='modal' onClick={closeModal}>
            <div className='card-add-contact'>
                <header className='header header-modal'>
                    <h2>New contact</h2>
                    <button onClick={closeModal}>x</button>
                </header>
                <main className='modal-content'>
                    <Form setContacts={setContacts} setModal={setModal} setNotification={setNotification}/>
                </main>
            </div>
        </div>
    )
}

export default AddContactModal