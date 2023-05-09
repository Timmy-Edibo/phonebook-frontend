import { useState } from 'react';
import './component/addContact'
import AddButton from './component/addContact';
import SearchButton from './component/searchButton';
import Contact from './component/contact';
import { ReactComponent as PhoneBookIcon } from './assets/phonebook.svg';


function App(props) {
  const [searchValue, setSearchValue] = useState('');

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
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
              <AddButton />
            </div>
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
