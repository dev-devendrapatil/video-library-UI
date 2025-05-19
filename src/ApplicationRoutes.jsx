import React, { Suspense } from 'react'
import { Route, Router, Routes } from 'react-router-dom'

const ApplicationRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
        </Routes>
      </Suspense>
    </Router>  )
}

export default ApplicationRoutes
