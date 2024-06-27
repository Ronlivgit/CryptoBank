import { useState } from 'react';
import { useSelector } from 'react-redux';
import { baseBnsUrl } from '../config/Api';

const BNSForm = () => {
  const user = useSelector((state)=> state.user)
  const [chosenBNS,setChosenBNS] = useState('')

  // TODO : Add functionality of transfer to Both BNS and Address.
  const handleSubmit = async (e) => {
    // url/checkBns
    e.preventDefault()
    try {
        console.log("Started : " , chosenBNS)
        const response = await fetch(`${baseBnsUrl}/checkBns`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bnsName: chosenBNS }),
        });
        const data = await response.json();
        if(data.isValid){
            confirm("BNS is free, would u like to take it?")
            //Rest of the registerBNS logic
        }
        else{
            alert(`${chosenBNS} is taken, try a different BNS`)
            //Improve form UI\UX to alert by input's color : red = taken , green = valid
        }
    } catch (error) {
        console.error("Error checking BNS:", error);
    }
  };

  return (
    <div className="flex flex-col h-full w-[100%] rounded-lg -mt-2">
      <div className='h-full p-4'>
        {/* <h2 className="text-xl font-bold text-slate-100 mb-[3%] text-center ">Transfer Form</h2> */}
        <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col gap-4 w-full h-full">
            <input
              type="text"
              value={chosenBNS}
              onChange={(e) => setChosenBNS(e.target.value)}
              placeholder="Enter Chosen BNS"
              className="bg-slate-100 text-slate-900 rounded-xl p-2"
              required
              min={0}
            />
          <button type="submit" className="bg-teal-400 text-slate-900 rounded-xl p-2 ">
            Check Validity
          </button>
        </form>
      </div>
    </div>
  );
};

export default BNSForm;
