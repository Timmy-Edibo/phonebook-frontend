import { ReactComponent as BasketIcon } from '../assets/basket.svg';
import { ReactComponent as PhoneCallIcon } from '../assets/phonecall.svg';
import { useState, useEffect } from 'react';
import { AiOutlineEdit} from 'react-icons/ai';

function Contact({contacts, setIsedit,isEdit,closemodal, err, setContacts, showAddForm, setShowAddForm}) {
const [theContact, setTheContact]= useState([])
const [searchValue, setSearchValue] = useState('');
const [isfilter, setIsfilter] = useState([])


  useEffect(() => {
    fetch('https://phonebook-backend-production-a67d.up.railway.app/api/v1/phonebook/list-all')
      .then(response => response.json())
      .then(data => setTheContact(data.data))
      .catch(error => console.error(error));
  }, [ theContact]);
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
  const handleEditContact = (id) => {
    setIsedit(true)
    setShowAddForm(true)
    const contactToEdit = theContact.find(contact => contact.id === id);
    console.log("---->", contactToEdit);
    if (contactToEdit) {
      setContacts({
        ...contacts,
        firstname: contactToEdit.firstname,
        lastname: contactToEdit.lastname,
        phone_number: contactToEdit.phone_number,
      });
  }
  
  }

  const handleSubmit = (e , id) => {
    e.preventDefault();
    const url = `https://phonebook-backend-production-a67d.up.railway.app/api/v1/phonebook/update/${id}`;
    const data = {
      firstname: contacts.firstname,
      lastname: contacts.lastname,
      phone_number: contacts.phone_number,
    };
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        // Update the contact in the state
        const contactToEdit = theContact.find(contact => contact.id === id);
        const updatedContact = {
          id: contactToEdit.id,
          firstname: data.firstname,
          lastname: data.lastname,
          phone_number: data.phone_number,
        };
        const updatedContacts = [...theContact];
        const index = updatedContacts.findIndex(contact => contact.id === id);
        updatedContacts[index] = updatedContact;
        setTheContact(updatedContacts);

        // Reset the form and close the modal
        setContacts({
          firstname: '',
          lastname: '',
          phone_number: '',
        });
        setShowAddForm(false);
      })
      .catch(error => console.error(error));
  };
  const handleSearchTermChange = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  setSearchValue(searchTerm);

  const filteredContacts = theContact.filter(contact => contact.lastname.toLowerCase().includes(searchTerm));
  setIsfilter(filteredContacts)
};





  // 
  return (
    <>

        <div className="">
      <input
        type="text"
        className="w-full h-12 px-4 pr-12 text-gray-700 placeholder-gray-500 bg-white border border-black rounded-md shadow-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
        onChange={handleSearchTermChange}
        value={searchValue}
        placeholder="Search for contact by lastname..."
      />
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-6 h-6 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
    </div>
    {showAddForm &&
            <div className="fixed w-full h-full inset-0 bg-modal " >
              <div className="bg-white rounded-2xl opacity-100 flex md:w-1/2 mx-10 md:mx-auto  my-28 py-10 px-10  justify-center items-center" >
                <form htmlFor="addContact" className="flex flex-col items-center justify-center">
                  <div className="flex flex-col ">
                    <label htmlFor="firstname" className="text-blue-500">First Name</label>
                    <input type="text" name="firstname" id="firstname" placeholder="Enter first Name" className="w-full shadow rounded-xl px-7 py-3" value={contacts.firstname} onChange={(e)=> setContacts({...contacts, firstName:e.target.value})} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="lastname" className="text-blue-500">Last Name</label>
                    <input type="text" name="lastname" id="lastname" placeholder="Enter individual's name" className="w-full shadow rounded-xl px-7 py-3" value={contacts.lastname} onChange={(e)=> setContacts({...contacts, lastName:e.target.value})} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="phone" className="text-blue-500">Phone number</label>
                    <input type="number" name="phone" id="phone" value={contacts.phone_number} onChange={(e)=>setContacts({...contacts, phone_number:e.target.value})} placeholder="Enter individual's number" className=" w-full shadow rounded-xl px-7 py-3" />
                    <p className='text-red-500' >{err} </p>
                  </div>
                  <button onClick={()=>setShowAddForm(false)} className="bg-red-500 px-5 py-2 my-5 rounded-md text-white" >Cancel </button>
                  {isEdit ? <button  onClick={()=>handleSubmit(theContact.id)} className="bg-blue-500 px-5 py-2 my-5 rounded-md text-white" >Update </button>
                  :
                  <button onClick={closemodal} className="bg-blue-500 px-5 py-2 my-5 rounded-md text-white" >Save </button>
            }
                </form>
              </div>

            </div>
}
    
    <div>
      {isfilter ===0  || searchValue === "" ?  theContact.map((contact) => {
        const phoneNumberArray = contact.phone_number.split('');
  
        // Insert a hyphen after every 3 digits
        phoneNumberArray.splice(3, 0, '-');
        phoneNumberArray.splice(7, 0, '-');
        
        // Join the array back into a string
        const formattedPhoneNumber = phoneNumberArray.join('');
        return (
          <div key={contact.id} className="bg-white rounded-lg shadow-2xl my-1 p-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-3xl font-bold">{contact.firstname} {contact.lastname}</h3>
            <div className='flex gap-3' >
              <button className="bg-blue-500 rounded-lg w-8 h-8 flex items-center justify-center">
                <AiOutlineEdit onClick={()=> handleEditContact(contact.id)} className="w-4 h-4 text-white" />
              </button>
            <button  onClick={() => handleDeleteContact(contact.id)} 
            className="bg-red-500 rounded-lg w-8 h-8 flex items-center justify-center ml-auto">
              <BasketIcon className="w-4 h-4 text-white" />
            </button>
            </div>
        </div>
        <div className="flex items-center mb-2">
            <span className="mr-2"><PhoneCallIcon /></span>
            <h3 className="text-gray-600">{formattedPhoneNumber}</h3>
        </div>
      </div>
          </div>
        )
      })
      :
      
      isfilter.map((contact) => {
        const phoneNumberArray = contact.phone_number.split('');
  
        // Insert a hyphen after every 3 digits
        phoneNumberArray.splice(3, 0, '-');
        phoneNumberArray.splice(7, 0, '-');
        
        // Join the array back into a string
        const formattedPhoneNumber = phoneNumberArray.join('');
        return (
          <div key={contact.id} className="bg-white rounded-lg shadow-2xl my-1 p-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-3xl font-bold">{contact.firstname} {contact.lastname}</h3>
            <div className='flex gap-3' >
              <button className="bg-blue-500 rounded-lg w-8 h-8 flex items-center justify-center">
                <AiOutlineEdit onClick={()=> handleEditContact(contact.id)} className="w-4 h-4 text-white" />
              </button>
            <button  onClick={() => handleDeleteContact(contact.id)} 
            className="bg-red-500 rounded-lg w-8 h-8 flex items-center justify-center ml-auto">
              <BasketIcon className="w-4 h-4 text-white" />
            </button>
            </div>
        </div>
        <div className="flex items-center mb-2">
            <span className="mr-2"><PhoneCallIcon /></span>
            <h3 className="text-gray-600">{formattedPhoneNumber}</h3>
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