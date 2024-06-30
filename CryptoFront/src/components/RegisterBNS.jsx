import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { baseBnsUrl } from '../config/Api';
import { setBnsName } from '../redux/reducers';

const RegisterBNS = () => {
  const user = useSelector((state)=> state.user)
  const [chosenBNS,setChosenBNS] = useState('')
  const [isValidData,setIsValidData] = useState(null)
  const dispatch = useDispatch()

  // TODO : Add functionality of transfer to Both BNS and Address.
  const handleValidation = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(`${baseBnsUrl}/checkBns`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bnsName: chosenBNS }),
        });
        const data = await response.json();
        console.log("data in handleValidation : " , data);
        if(data.isValid){
          setIsValidData(true)
        }
        else{
          setIsValidData(false)
        }
    } catch (error) {
        console.error("Error checking BNS:", error);
    }
  };

  const handleCatchBNS = async() =>{
    try {
      if(isValidData){
        const response = await fetch(`${baseBnsUrl}/createBNS`, {
          method : "POST",
          headers : {
            Authorization : `Bearer ${user.token}`,
            "Content-Type" : "application/json",
          },
          body : JSON.stringify({bnsName : chosenBNS})
        })
        const data = await response.json()
        console.log("data : " ,data)
        dispatch(setBnsName(chosenBNS));
      }
      else{
        alert("What are u trying to check here?")
      }
    } catch (error) {
      console.error(error);      
    }
  }

  const inputStyle = isValidData === null ? '' : isValidData ? 'border-green-500' : 'border-red-500';
  const message = isValidData === null ? '' : isValidData ? 'BNS is available!' : 'BNS is taken, try a different one.';

  return (
    <div className="flex flex-col h-full w-[100%] rounded-lg -mt-2">
      <div className='h-full p-4'>
        <form className="flex flex-col gap-4 w-full h-full p-4">
            <input
              type="text"
              value={chosenBNS}
              onChange={(e) => {setChosenBNS(e.target.value), setIsValidData(null)}}
              placeholder="Enter Chosen BNS"
              className={`bg-slate-100 text-slate-900 rounded-2xl w-[80%] ml-[10%] p-2 border-4 ${inputStyle}`}
              required
              min={0}
            />
            {message && <p className={`text-xl text-center ${isValidData ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
          {isValidData ? 
            <button type="button" onClick={handleCatchBNS} className="bg-teal-400 text-slate-900 rounded-xl p-2 w-[70%] ml-[15%] mt-2">
              Take BNS
            </button>
          :
            <button type="button" onClick={handleValidation} className="bg-teal-400 text-slate-900 rounded-xl p-2 w-[70%] ml-[15%] mt-2 ">
              Check Validity
            </button>
          }
        </form>
      </div>
    </div>
  );
};

export default RegisterBNS;
