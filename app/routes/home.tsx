import {useNavigate} from "react-router";

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className='container h-screen'>
            <div className=' ml-20 mt-20'>
                <button className='button-class !h-11 !w-[200px] cursor-pointer' onClick={() => navigate('/dashboard')}>
                    <img src='/assets/icons/destination.svg' className='size-4' alt='icon'/>
                    <span className='p-20-semibold'>Go To Dashboard</span>
                </button>

            </div>

        </div>
    )
}
export default Home
