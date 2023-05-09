import { ReactComponent as BasketIcon } from '../assets/basket.svg';
import { ReactComponent as PhoneCallIcon } from '../assets/phonecall.svg';

function Contact(props) {
  return (
    <>
    <br></br>
  <div className="bg-white rounded-lg shadow-md p-4">
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
          <h3 className="text-3xl font-bold">{props.firstName} {props.lastName}</h3>
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

  <br></br>
  <div className="bg-white rounded-lg shadow-md p-4">
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
          <h3 className="text-3xl font-bold">Timothy Edibo</h3>
          <button onClick={props.onClick} 
          className="bg-red-500 rounded-lg w-8 h-8 flex items-center justify-center ml-auto">
            <BasketIcon className="w-4 h-4 text-white" />
          </button>
      </div>
      <div className="flex items-center mb-2">
          <span className="mr-2"><PhoneCallIcon /></span>
          <h3 className="text-gray-600">07067272110</h3>
      </div>
    </div>
  </div>

    </>


  );
}

export default Contact;