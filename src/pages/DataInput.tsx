import React,{ChangeEvent, FormEvent, useContext, useEffect, useState} from 'react'
import { Card } from '../components/Card';
  import { useNavigate } from 'react-router-dom'
  import axios from 'axios'
import config from '../utils/config';
import { AuthContext } from '../context/auth-context';
import { listenForDatabaseChanges } from '../firebase/firebase';
import { UserModel } from '../types';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from  'react-loader-spinner'


const defaultFormFields = {
    companyName: '',
    numberOfUsers: 0,
    numberOfProducts: 0,
    percentage: '0%',
  }

export const DataPage = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { companyName, numberOfUsers, numberOfProducts, percentage } = formFields
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)
    const [userData, setUserData] = useState<UserModel | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const notifySuccess = (message: string) => toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    const notifyError = (message: string) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });;

    useEffect(() => {
        if(currentUser) {
            listenForDatabaseChanges(currentUser.email ?? "", (user: UserModel | undefined) => {
                setUserData(user);
                setFormFields({
                    companyName: user?.companyInfo?.name ?? "",
                    numberOfProducts: user?.companyInfo?.numberOfProducts ?? 0,
                    numberOfUsers: user?.companyInfo?.numberOfUsers ?? 0,
                    percentage: `${user?.companyInfo?.percentage ?? 0}%`
                })
            })
        }

    }, [])

    const dividNumber = (numerator: string, denominator: string) => {
        const num = Number(numerator)
        const denum = Number(denominator)

        if(denum === 0) return '0%'

        return `${(Math.round((num / denum) * 100) / 100) * 100}%`
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      setIsLoading(true)

      try {
        // Send the Data to the backend
        const resp = await axios({
            method: 'post',
            url: config.userUpdateUrl,
            data: {
                emailAddress: currentUser?.email ?? "",
                companyInfo: {
                    name: formFields.companyName,
                    numberOfUsers: formFields.numberOfUsers,
                    numberOfProducts: formFields.numberOfProducts,
                    percentage: Number(formFields.percentage.replace('%', ''))
                }
            },
            headers: {
                "Content-Type": "application/json"
            }
          })
        
        console.log({ companyName, numberOfUsers, numberOfProducts, percentage }, resp)
        
        notifySuccess("Data Submitted!!!")

      } catch (error:any) {
        console.log('Unable to send data...', error.message);
        notifyError('Unable to send data...')
      }

      setIsLoading(false)
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      console.log(name, value)

      let perct = formFields.percentage;

      if(name === 'numberOfUsers') {
        if (Number(value) < formFields.numberOfProducts) {
            perct = dividNumber(value, formFields.numberOfProducts.toString())
        } else {
            perct = dividNumber(formFields.numberOfProducts.toString(), value);
        }
      }

      if(name === 'numberOfProducts') {
        if (Number(value) < formFields.numberOfUsers) {
            perct = dividNumber(value, formFields.numberOfUsers.toString())
        } else {
            perct = dividNumber(formFields.numberOfUsers.toString(), value)
        }
      }

      if(name === 'numberOfUsers' || name === 'numberOfProducts') {
        const abs = Math.abs(Number(value))
        setFormFields({...formFields, [name]: abs, percentage: perct })

      } else {
        setFormFields({...formFields, [name]: value, percentage: perct })
      }

    }
    
    return(
        <div className="w-screen h-screen bg-custom-purple-800">
            <div className="sm:flex sm:justify-center sm:items-center h-full">
                <div className="container grid-cols-1 mx-auto px-4 grid gap-5 max-w-[1200px]">

                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5"> 
                        <Card>
                            <div className="flex flex-col items-center justify-between gap-4">
                                <h2 className='p-3 text-3xl font-bold text-pink-400'>Company Information</h2>
                                {/* <div className="inline-block border-[1px] justify-center w-20 border-[#7367F0] border-solid"></div>
                                <h3 className='text-xl font-semibold text-[#7367F0] pt-2'>Sign In!</h3> */}
                                
                                {/* Inputs */}
                                <div className='flex flex-col items-center justify-center'>
                                    <form onSubmit={handleSubmit}>
                                        <div className='m-2 py-2'>
                                            <label className='text-l font-semibold text-white px-2 py-2 w-4/5 md:w-full m-2'>Company Name</label>
                                            <input 
                                            type='text' 
                                            className='rounded-2xl px-2 py-2 w-4/5 md:w-full border-[1px] border-blue-400 m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
                                            placeholder='Company Name'
                                            value={companyName}
                                            name='companyName'
                                            onChange={handleChange}
                                            required
                                            ></input>
                                        </div>
                                        <div className='m-2 py-2'>
                                            <label className='text-l font-semibold text-white px-2 py-2 w-4/5 md:w-full m-2'>Number of users</label>
                                            <input 
                                            type="number" 
                                            className='rounded-2xl px-2 py-2 w-4/5 md:w-full border-[1px] border-blue-400 m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
                                            value={numberOfUsers}
                                            name='numberOfUsers'
                                            onChange={handleChange}
                                            ></input>
                                        </div>

                                        <div className='m-2 py-2'>
                                            <label className='text-l font-semibold text-white px-2 py-2 w-4/5 md:w-full m-2'>Number of products</label>
                                            <input 
                                            type="number" 
                                            className='rounded-2xl px-2 py-2 w-4/5 md:w-full border-[1px] border-blue-400 m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
                                            value={numberOfProducts}
                                            name='numberOfProducts'
                                            onChange={handleChange}
                                            ></input>
                                        </div>

                                        <div className='m-2 py-2'>
                                            <label className='text-l font-semibold text-white px-2 py-2 w-4/5 md:w-full m-2'>Percentage</label>
                                            <input 
                                            type="string" 
                                            className='rounded-2xl px-2 py-2 w-4/5 md:w-full border-[1px] border-blue-400 m-2 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
                                            value={percentage}
                                            name='percentage'
                                            readOnly                               
                                            ></input>
                                        </div>

                                        <button 
                                            className='rounded-2xl m-2 text-white bg-[#7367F0] w-full px-2 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                                            type = 'submit'
                                        >
                                            {
                                                isLoading ? "" : "Send Data"
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

                        <Card>
                            <div className="inline-block border-[1px] justify-center w-4/5 mr-5 ml-5 border-[#7367F0] border-solid"></div>

                            <div className="flex flex-col items-center justify-between gap-4">
                                
                                {
                                    userData?.companyInfo?.logoUrl ? 
                                    <img src={userData && userData.companyInfo && userData.companyInfo.logoUrl ? userData.companyInfo.logoUrl : ""} className="mx-auto block mb-3 mt-5 w-4/5" /> : 
                                    <p className="block mx-[100px] my-[50%]">No logo uploaded yet</p>
                                }

                                
                            </div>
                        </Card>
                    </div>
                    <div>
                        <button 
                            className='rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                            onClick={() => navigate('/profile')}
                        >
                            Your Profile
                        </button>
                    </div>
                </div>
            </div>
            
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />

            </div>
     );
}