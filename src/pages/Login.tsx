import React,{ChangeEvent, FormEvent, useState} from 'react'
import { Card } from '../components/Card';
import { signInUser } from '../firebase/firebase'
  import { useNavigate } from 'react-router-dom'
import { ColorRing } from  'react-loader-spinner'

const defaultFormFields = {
    email: '',
    password: '',
  }

export const LoginPage = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const resetFormFields = () => {
      return (
        setFormFields(defaultFormFields)
      );
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      setIsLoading(true)

      try {
        // Send the email and password to firebase
        const userCredential = await signInUser(email, password)

        setIsLoading(false)

        if (userCredential) {
          resetFormFields()
          navigate('/profile')
        }
      } catch (error:any) {
        console.log('User Sign In Failed', error.message);
        setIsLoading(false)
      }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      console.log(name, value)
      setFormFields({...formFields, [name]: value })
    }
    
    return(
        <div className="w-screen h-screen bg-custom-purple-800">
            <div className="sm:flex sm:justify-center sm:items-center h-full">
                <div className="container grid-cols-1 mx-auto px-4 grid gap-5 max-w-[500px]">
                
                    <Card>
                        <div className="rounded-2xl flex flex-col w-full md:w-2/3 items-center max-w-4xl mx-auto transition duration-1000 ease-out">
                            <h2 className='p-3 text-3xl font-bold text-pink-400'>File Share</h2>
                            <div className="inline-block border-[1px] justify-center w-20 border-[#7367F0] border-solid"></div>
                            <h3 className='text-xl font-semibold text-[#7367F0] pt-2'>Sign In!</h3>
                            
                            {/* Inputs */}
                            <div className='flex flex-col items-center justify-center'>
                                <form onSubmit={handleSubmit}>
                                    <input 
                                    type='email' 
                                    className='rounded-2xl px-2 py-2 w-4/5 md:w-full border-[1px] border-blue-400 m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
                                    placeholder='Email'
                                    value={email}
                                    name='email'
                                    onChange={handleChange}
                                    required
                                    ></input>
                                    <input 
                                    type="password" 
                                    className='rounded-2xl px-2 py-2 w-4/5 md:w-full border-[1px] border-blue-400 m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
                                    placeholder='Password'
                                    value={password}
                                    name='password'
                                    onChange={handleChange}
                                    ></input>
                                    <button 
                                        className='rounded-2xl m-2 text-white bg-[#7367F0] w-full px-2 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                                        type = 'submit'
                                    >

                                        {
                                                isLoading ? "" : "Sign In"
                                            }

                                            <ColorRing
                                                visible={isLoading}
                                                height="40"
                                                width="40"
                                                ariaLabel="blocks-loading"
                                                wrapperStyle={{
                                                }}
                                                wrapperClass="mx-auto"
                                                
                                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                                />
                                    </button>
                                </form>
                            </div>
                            <div className="inline-block border-[1px] justify-center w-20 border-[#7367F0] border-solid"></div>
                        </div>
                    </Card>
                </div>
            </div>
            </div>
     );
}