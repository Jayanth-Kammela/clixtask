import React from 'react'
import SignIn from './pages/SignIn'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import UserTodo from './pages/UserTodo'
import ProtectedRoute from './protectroute/ProtectedRoute'

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/user-todos' element={<UserTodo />} />
        </Route>
      </Routes>
    </React.Fragment>
  )
}

export default App