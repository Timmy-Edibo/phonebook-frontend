import { ReactComponent as BasketIcon } from '../assets/basket.svg';
import { ReactComponent as PhoneCallIcon } from '../assets/phonecall.svg';
import { useState, useEffect } from 'react';

function Contact() {
const [theContact, setTheContact]= useState([])
  useEffect(() => {
    fetch('https://phonebook-backend-production-a67d.up.railway.app/api/v1/phonebook/list-all')
      .then(response => response.json())
      .then(data => setTheContact(data.data))
      .catch(error => console.error(error));
  }, [theContact]);
  const handleDeleteContact = (id) => {
    fetch(`https://phonebook-backend-production-a67d.up.railway.app/api/v1/phonebook/delete/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        const updatedContacts = theContact.filter(contact => contact.id !== id);
        setTheContact(updatedContacts);
      })
      .catch(error => console.error(error));
  };
  return (
    <>
    
    <div>
      {theContact && theContact.map((contact) => {
        return (
          <div key={contact.id} className="bg-white rounded-lg shadow-2xl my-1 p-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-3xl font-bold">{contact.firstname} {contact.lastname}</h3>
            <button  onClick={() => handleDeleteContact(contact.id)} 
            className="bg-red-500 rounded-lg w-8 h-8 flex items-center justify-center ml-auto">
              <BasketIcon className="w-4 h-4 text-white" />
            </button>
        </div>
        <div className="flex items-center mb-2">
            <span className="mr-2"><PhoneCallIcon /></span>
            <h3 className="text-gray-600">{contact.phone_number}</h3>
        </div>
      </div>
          </div>
        )
      })}
    </div>
    </>


  );
}

export default Contact;






{/* <br></br>
    {contacts.map((contact) => () => {
      <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-3xl font-bold">{contact.firstname} {contact.lastname}</h3>
            <button onClick={props.onClick} 
            className="bg-red-500 rounded-lg w-8 h-8 flex items-center justify-center ml-auto">
              <BasketIcon className="w-4 h-4 text-white" />
            </button>
        </div>
        <div className="flex items-center mb-2">
            <span className="mr-2"><PhoneCallIcon /></span>
            <h3 className="text-gray-600">{props.phoneNumber}</h3>
        </div>
      </div>
    </div>
    })} */}