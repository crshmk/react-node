import React from 'react'

import withModal from '@components/withModal'

const DashboardModal = ({ onHide }: { onHide: () => void }) => {

  return (
    <div className="dashboard-modal-content">
      <span onClick={onHide}>X</span>
      <p>Close this modal by clicking the X or clicking outside of it.</p>
    </div>
  )
}

export default withModal(DashboardModal)