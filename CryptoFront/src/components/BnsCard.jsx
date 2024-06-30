import { useDispatch, useSelector } from 'react-redux'
import { baseBnsUrl } from '../config/Api'
import { setBnsName } from '../redux/reducers'

const BnsCard = () => {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleRemoveBNS = async() =>{
        try {
            const response = await fetch(`${baseBnsUrl}/deleteBNS/${user.user.bnsName}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json()
            if(result.ok){
                dispatch(setBnsName(null));
                console.log("result : " , result)
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className='w-full h-full rounded-3xl flex flex-col gap-12'>
        <h1 className='mt-6 text-center text-2xl'> BNS : {user.user.bnsName}</h1>
        <div className='h-full w-full rounded-xl flex flex-row flex-wrap justify-center'>
            <h1 className='text-xl w-full text-center'> Hey , {user.user.firstName} {user.user.lastName}. <br/> press below to remove BNS</h1>
            <button onClick={handleRemoveBNS} className='w-2/6 h-1/5 bg-red-600 rounded-3xl '>Remove BNS</button>
        </div>
    </div>
  )
}

export default BnsCard