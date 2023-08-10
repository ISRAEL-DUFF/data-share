
import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import { Card } from '../components/Card'
import { useNavigate } from 'react-router-dom'
import { getUserType } from '../utils/getusertype.'

function Profile() {
  const { currentUser, signOut } = useContext(AuthContext)
  const navigate = useNavigate()
  
  return(
    /**
    * Extract the currrentUser from the context, if you want to
    * get the User info, like the email, display name, etc.
    */
    // <div>
    //   <h3>Welcome! {currentUser?.email}</h3>
    //   <p>Sign In Status: {currentUser && 'active'}</p>
    //   <button onClick={signOut}>Sign Out</button>
    // </div>


<div className="w-screen h-screen bg-custom-purple-800">
            <div className="sm:flex sm:justify-center sm:items-center h-full">
                <div className="container grid-cols-1 mx-auto px-4 grid gap-2 max-w-[700px] justify-contents content-center">
                
                    <Card>
                        <div className="rounded-2xl flex flex-col w-full md:w-full items-center max-w-4xl mx-auto transition duration-1000 ease-out">
                            <h2 className='p-3 text-3xl font-bold text-pink-400'>Profile Page</h2>
                            <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
                            {/* <h3 className='text-xl font-semibold text-blue-400 pt-2'>Sign In!</h3> */}
                            <br />
                            <h3 className='text-xl font-semibold text-white pt-2'>Email: {currentUser?.email}</h3>
                            <p className='text-sm text-emerald-400 pt-2'>Sign In Status: {currentUser && 'active'}</p>
                            <p className='text-sm text-emerald-400 pt-2'>Account Type: {getUserType(currentUser)}</p>

                            <br />


                            {/* <button onClick={signOut}>Sign Out</button> */}

                            <button 
                                className='rounded-2xl m-2 text-white bg-[#7367F0] w-2/4 px-2 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                                onClick={() => navigate('/')}
                            >
                                Back Home
                            </button>

                            <button 
                                className='rounded-2xl m-2 text-white bg-red-400 w-2/4 px-2 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                                onClick={signOut}
                            >
                                Sign Out
                            </button>
                            
                            {/* <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div> */}
                        </div>
                    </Card>
                </div>
            </div>
            </div>
  )
}
export default Profile
