
import { useContext, useEffect } from 'react'
import { Routes , Route, useNavigate } from 'react-router-dom' 
import { AuthContext } from './context/auth-context'
import RequireAuth from './components/Require-auth'
import Profile from './pages/Profile'
import { Dashboard } from './pages/Dashboard'
import { LoginPage } from './pages/Login'
import { DataPage } from './pages/DataInput'
import { getUserType } from './utils/getusertype.'
import FileUploadPage from './pages/Upload'

function App() {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  // NOTE: console log is for testing purposes
  console.log('User:', !!currentUser);

  // Check if currentUser exists on initial render
  useEffect(() => {
    if (currentUser) {
      navigate('/')
    } else {
        navigate('/login')
    }
  }, [currentUser])
    
  return (
    <Routes>
      <Route index element={
        <RequireAuth>
          <Dashboard userType={ getUserType(currentUser) }/>
        </RequireAuth>}
      />
      <Route path="profile" element={
        <RequireAuth>
          <Profile />
        </RequireAuth>}
      />
      <Route path="data" element={
        <RequireAuth>
          <DataPage />
        </RequireAuth>}
      />

    <Route path="upload" element={
        <RequireAuth>
          <FileUploadPage />
        </RequireAuth>}
      />

      <Route  path="login" element = {
        <LoginPage />
      }/>
      
    </Routes>
  )
}

export default App
