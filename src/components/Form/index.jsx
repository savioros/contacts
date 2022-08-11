import React, { useState } from 'react'
import './styles.css'

function Form({ setContacts, setModal, setNotification }) {
    const [name, setName] = useState('')
    const [phones, setPhones] = useState([''])
    const [addresses, setAdresses] = useState([''])
    const [errorName, setErrorName] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)

    function addContact(e){
        e.preventDefault()
        validate(name, phones[0])
    }

    function addField(e, updateFunction, arr){
        e.preventDefault()
        updateFunction([...arr, ''])
    }

    function handleChangeFields(e, arr, updateFunction, index){
        arr[index] = e.target.value
        updateFunction([...arr])
    }
    
    //#region Field validation
    function validate(name, phone){
        let validaNome = name.length > 0 && !name.startsWith(' ')
        let validaPhone =  phone.match(/^\([0-9]{2}\) [0-9]?[0-9]{4}-[0-9]{4}$/)

        if(!validaNome) {
            setErrorName('Enter a valid name')
        }else{
            setErrorName(null)
        }

        if(!validaPhone) {
            setErrorPhone('Fill in a valid phone')
        }else{
            setErrorPhone(null)
        }

        if(validaNome && validaPhone) {
            setContacts((prevState) => [...prevState, {name, phones, addresses}])
            setModal(null)

            setNotification('User added successfully ;)')
            setTimeout(() => {
                setNotification(null)
            }, 2000)
        }
    }
    //#endregion

    return (
        <>
            <form className='form'>
                <div className='field'>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text" 
                        id='name' 
                        placeholder='Name contact' 
                        value={name} 
                        onChange={({ target }) => setName(target.value)} 
                    />
                    {errorName && <p>{errorName}</p>}
                </div>
                <div className='field'>
                    {phones.map((phone, index) => (
                        <div className='field' key={index}>
                            <label htmlFor={'phone ' + index}>Phone {index + 1}</label>
                            <input 
                                type="text" 
                                id={'phone ' + index} 
                                placeholder='(99) 99999-9999' 
                                value={phone} 
                                onChange={(e) => handleChangeFields(e, phones, setPhones, index)}
                            />
                            {errorPhone && <p>{errorPhone}</p>}
                        </div>
                    ))}

                    <button onClick={(e) => addField(e, setPhones, phones)}>Add more phones</button>
                </div>
                <div className='field'>
                    {addresses.map((address, index) => (
                        <div className='field' key={index}>
                            <label htmlFor={'addresses ' + index}>Address {index + 1}</label>
                            <input 
                                type="text" 
                                id={'addresses ' + index} 
                                placeholder='Address' 
                                value={address} 
                                onChange={(e) => handleChangeFields(e, addresses, setAdresses, index)}
                            />
                        </div>
                    ))}

                    <button onClick={(e) => addField(e, setAdresses, addresses)}>Add more addresses</button>
                </div>
            </form>
            <button className='btnAdd' onClick={addContact}>Add</button>
        </>
    )
}

export default Form