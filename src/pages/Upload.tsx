import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import axios from 'axios'
import config from '../utils/config';
import { Card } from '../components/Card';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from  'react-loader-spinner'

function FileUploadPage() {
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<string>()
  const navigate = useNavigate()

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


  const options = [
    {value: '', text: '--Choose user account--'},
    {value: 'user-a@gmail.com', text: 'User A'},
    {value: 'user-b@gmail.com', text: 'User B'},
  ];

  const [selected, setSelected] = useState(options[0].value);

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setFileUrl(URL.createObjectURL(e.target.files[0]))
    }
  };

  const handleUploadClick = () => {
    const backendUrl = config.uploadUrl;

    if (!file) {
        notifyError("You need to select an image file")
      return;
    }

    if(!selected) {
        notifyError("You must select a user account")
        return;
    }

    setIsLoading(true)

    const formData = new FormData();
 
    formData.append(
        "file",
        file,
        file.name
    );

    formData.append('email', selected)

    axios.post(backendUrl, formData).then(() => {
        setIsLoading(false)
        notifySuccess("File Uploaded!!!")
    }).catch(() => {
        setIsLoading(false)
        notifyError("Error: The User May not have account Info set up")
    });
  };

  const fileData = () => {
 
    if (file) {

        return (
            <div className='text-emerald-200 m-5'>
                <h2 className="font-inter text-sm md:text-3xl font-bold">File Details:</h2>
                <p className="font-inter text-sm md:text-sm font-bold">File Name: {file.name}</p>

                <p className="font-inter text-sm md:text-sm font-bold">File Type: {file.type}</p>

            </div>
        );
    } else {
        return (
            <div  className='text-emerald-200 m-5'>
                <br />
                <h4>Choose before Pressing the Upload button</h4>
            </div>
        );
    }
};

  return (
    <div className="w-screen h-screen bg-custom-purple-800">
        <div className="sm:flex sm:justify-center sm:items-center h-full">
          <div className="container grid-cols-1 mx-auto px-4 grid gap-5 max-w-[1200px]">

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5"> 

            <Card>
                    <div className="flex flex-col items-center justify-between gap-4">
                        <div>
                            <div className='m-10 container'>
                                <select value={selected} onChange={handleUserChange} className='p-3'>
                                    {options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                    ))}
                                </select>
                                {/* <label data-te-select-label-ref>Select User Account</label> */}
                            </div>

                            <input type="file" onChange={handleFileChange} accept="image/*" />

                            <div className="w-100 bg-blue-400 h-[3px] flex overflow-auto p-1  top-full" />


                            {fileData()}

                            <button onClick={handleUploadClick} className='rounded-2xl m-2 text-white bg-green-500 w-full px-4 py-2 shadow-md hover:text-green-500 hover:bg-white transition duration-200 ease-in'>
                                {
                                                isLoading ? "" : "Upload"
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
                        </div>

                    </div>
                </Card>

                <Card>
                    <div className="flex flex-col items-center justify-between gap-4">
                        <div className='w-[300px] h-[300px]'>
                            {
                                fileUrl ? <img src={fileUrl} className="mx-auto block mb-3 mt-2 w-full h-full" /> : <p className='mt-30'>No image selected</p>
                            }
                        </div>

                    </div>
                </Card>
          </div>


          <div>
                <button 
                    className='rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                    onClick={() => navigate('/profile')
                }
                >
                Your Profile
                </button>

                <button 
                    className='rounded-2xl m-2 text-white bg-purple-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                    onClick={() =>       navigate('/')
                }
                >
                Data View
                </button>
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
        </div>
      </div>
  );
}

export default FileUploadPage;