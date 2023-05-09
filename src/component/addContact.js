import React from 'react';

function AddButton(props) {
  return (
    <button 
    className=''
    onClick={props.onClick}>
      <svg className='w-6 h-6 inline-block mr-2' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M19,11H13V5c0-0.55-0.45-1-1-1s-1,0.45-1,1v6H5c-0.55,0-1,0.45-1,1s0.45,1,1,1h6v6c0,0.55,0.45,1,1,1s1-0.45,1-1v-6h6C19.55,12,20,11.55,20,11S19.55,10,19,11z' />
      </svg>
      Add Contact
    </button>
  );
}

export default AddButton;
