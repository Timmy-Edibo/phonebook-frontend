import { useState } from 'react';
import './component/addContact'
import AddButton from './component/addContact';
import SearchButton from './component/searchButton';
import Contact from './component/contact';
import { ReactComponent as PhoneBookIcon } from './assets/phonebook.svg';


function App(props) {
  const [searchValue, setSearchValue] = useState('');
  const [showAddForm, setShowAddForm] = useState(false); //
  const [contacts, setContacts] = useState([
    {
      firstName: 'John',
      lastName: 'Doe',
      phone_number: '08012345678',
    }
  ])
  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }
  const handleAddContact = () => {
    setShowAddForm(true);
  }
    const closemodal=(e)=>{
      e.preventDefault()
      console.log("---->", contacts)
      fetch('https://phonebook-backend-production-a67d.up.railway.app/api/v1/phonebook/create', 
      {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    firstName: contacts.firstName,
    lastName: contacts.lastName,
    phone_number: contacts.phone_number
  })
})
  .then(response => response.json())
  .then(data => console.log(data)
  )
  .catch(error => console.error(error));

    }

  function handleSearch() {
    // Perform some action when the search button is clicked
  }

  return (
    <div className="App">
      <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        
      <div className="flex items-center">
        <PhoneBookIcon />
        <h1 className="text-5xl font-bold ml-4">Phone Book App</h1>
      </div>

        <div className="my-4 w-full max-w-screen-lg text-lg font-bold">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold">Contacts</div>
            <div className="bg-blue-500 rounded-md px-4 py-2 text-white">
              <AddButton  handleAddContact={handleAddContact} />
            </div>
            {showAddForm &&
            <div className="fixed w-full h-full inset-0 bg-modal " >
              <div className="bg-white rounded-2xl opacity-100 flex w-1/2 mx-auto my-28 py-10 px-10  justify-center items-center" >
                <form htmlFor="addContact" className="flex flex-col items-center justify-center">
                  <div className="flex flex-col ">
                    <label htmlFor="name" className="text-blue-500">First Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter first Name" className="w-full shadow rounded-xl px-7 py-3" value={contacts.firstName} onChange={(e)=> setContacts({...contacts, firstName:e.target.value})} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="name" className="text-blue-500">Last Name</label>
                    <input type="text" name="name" id="name" placeholder="Enter individual's name" className="w-full shadow rounded-xl px-7 py-3" value={contacts.lastName} onChange={(e)=> setContacts({...contacts, lastName:e.target.value})} />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="phone" className="text-blue-500">Phone number</label>
                    <input type="tel" name="phone" id="phone" value={contacts.phone_number} onChange={(e)=>setContacts({...contacts, phone_number:e.target.value})} placeholder="Enter individual's number" className=" w-full shadow rounded-xl px-7 py-3" />
                  </div>
                  <button onClick={closemodal} className="bg-blue-500 px-5 py-2 my-5 rounded-md text-white" >Save </button>
                </form>
              </div>

            </div>
}

          </div>
        </div>


          <div className="my-4 w-full max-w-screen-lg rounded-md shadow-md border-black">
            <SearchButton 
              onChange={handleSearchChange} 
              value={searchValue} 
              onClick={handleSearch} 
            />
          </div>




        <div className="my-4 w-full max-w-screen-lg">
          <Contact />
        </div>

      </div>
    </div>
  );
}

export default App;
