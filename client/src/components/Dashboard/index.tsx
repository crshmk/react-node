import React, { useState } from 'react'

import './dashboard.css'

import useUser from '@store/useUser'

import DashboardModal from './DashboardModal'

const Dashboard = () => {
  const { user } = useUser()
  const [isModalShowing, setIsModalShowing] = useState(false)

  const showModal = () => setIsModalShowing(true)

  const hideModal = () => setIsModalShowing(false)

  return (
    <div className="dashboard">
      <p>Welcome, {user.name}</p>
      <p className="show-modal-btn" onClick={showModal}>Show modal</p>
      {isModalShowing && <DashboardModal onHide={hideModal}/>}
    </div>
  )
}
 
export default Dashboard