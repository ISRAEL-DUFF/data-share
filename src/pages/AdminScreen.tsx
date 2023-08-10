import { useEffect, useState } from "react";
import { Sales } from "../components/Sales";
import { Score } from "../components/Score";
import { Statistics } from "../components/Statistics";
import { useNavigate } from 'react-router-dom'
import { listenForDatabaseChanges } from "../firebase/firebase";
import { UserModel } from "../types";
import { Card } from "../components/Card";



const UserData: React.FC<{
    userData: UserModel | undefined,
  }> = ({
    userData
  }) => {
    return <>

        <Card>
            <div className="flex flex-col items-center justify-between gap-4">

            <img src={userData && userData.companyInfo ? userData.companyInfo.logoUrl : ""} className="mx-auto block mb-3 mt-5 w-3/5" />
                <div className="font-inter font-semibold text-2xl text-white flex items-center justify-center">
                    {userData && userData.companyInfo ? userData.companyInfo.name : undefined}
                </div>
                
                <div className="w-72 bg-blue-400 h-[3px] flex overflow-auto p-1  top-full" />

                <div className="text-center mb-2  justify-center text-white">
                    <div className="font-inter text-sm md:text-3xl font-bold">
                        {userData && userData.companyInfo ? userData.companyInfo.numberOfUsers : 0} <span className="md:text-sm">Users</span>
                    </div>
                    <div className="font-inter text-sm md:text-3xl font-bold">
                        {userData && userData.companyInfo ? userData.companyInfo.numberOfProducts : 0} <span className="md:text-sm">Products</span>
                    </div>
                </div>

                <div className="w-72 bg-purple-400 h-[3px] flex overflow-auto p-1  top-full" />

                <div className="font-inter text-sm md:text-3xl font-bold text-white">
                        {userData && userData.companyInfo ? userData.companyInfo.percentage : 0}%
                </div>
                
                <div className="border-1 border-grey-light mb-4 mx-8">

                </div>

            </div>
        </Card>
    </>
}

const UserDataView: React.FC<{
    userAData: UserModel | undefined,
    userBData: UserModel | undefined
  }> = ({
    userAData,
    userBData
}) => {
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5"> 
            <UserData userData={ userAData }/>
            <UserData userData={ userBData } />
        </div>
    )
}

const CompareDataView: React.FC<{
    userAData: UserModel | undefined,
    userBData: UserModel | undefined
  }> = ({
    userAData,
    userBData
}) => {
    return (
        <>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-5">  
              <Statistics
                title="User A Data"
                data={{
                  numberOfUsers: userAData && userAData.companyInfo ? userAData.companyInfo.numberOfUsers : 0,
                  numberOfProducts: userAData && userAData.companyInfo ? userAData.companyInfo.numberOfProducts : 0,
                }}
                backgroundColor={"bg-[#7367F0]"}
                strokeColor={"stroke-[#7367F0]"}
              />
  
              <Statistics
                title="User B Data"
                data={{
                  numberOfUsers: userBData && userBData.companyInfo ? userBData.companyInfo.numberOfUsers : 0,
                  numberOfProducts: userBData && userBData.companyInfo ? userBData.companyInfo.numberOfProducts : 0,
                }}
                backgroundColor={"bg-[#A66DE9]"}
                strokeColor={"stroke-[#A66DE9]"}
              />

              <Score userAData={ userAData } userBData={ userBData } />

            </div>
            <div>
              <Sales userA={userAData} userB={ userBData }/>
            </div>
        </>
    )
}

const AdminDashboard = () => {
    const navigate = useNavigate()
    const [userAData, setUserAData] = useState<UserModel | undefined>()
    const [userBData, setUserBData] = useState<UserModel | undefined>()
    const [viewData, setViewData] = useState<boolean>(true)
    const [viewDataText, setViewDataText] = useState<string>("Compare Data")
    
    useEffect(() => {
        listenForDatabaseChanges("user-a@gmail.com", (userA: UserModel | undefined) => {
            console.log("ON Value called:", userA)
            setUserAData(userA);
        })
        
        listenForDatabaseChanges('user-b@gmail.com', (userB: UserModel | undefined) => {
            setUserBData(userB);
        })

    }, [])
  
    const handleProfile = () => {               
      navigate('/profile')
    }

    const handleSwitchView = () => {
        setViewData(!viewData)

        if(viewData) {
            setViewDataText("Compare Input Data")
        } else {
            setViewDataText("View Input Data")
        }
    }
  
    return (
      <div className="w-screen h-screen bg-custom-purple-800">
        <div className="sm:flex sm:justify-center sm:items-center h-full">
          <div className="container grid-cols-1 mx-auto px-4 grid gap-5 max-w-[1200px]">
            
            {
                viewData ? <UserDataView userAData={ userAData } userBData={ userBData }/> : <CompareDataView userAData={ userAData } userBData={ userBData } />
            }

            <div>
                <button 
                    className='rounded-2xl m-2 text-white bg-blue-400 w-1/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                    onClick={() => handleProfile()}
                >
                Your Profile
                </button>

                <button 
                    className='rounded-2xl m-2 text-white bg-green-400 w-1/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                    onClick={() => navigate('/upload')}
                >
                Upload Image
                </button>

                <button 
                    className='rounded-2xl m-2 text-white bg-purple-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
                    onClick={() => handleSwitchView()}
                >
                {
                    viewDataText
                }
                </button>
            </div>

          </div>
        </div>
      </div>
    );
  };

  export default AdminDashboard