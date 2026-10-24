/**
 * Takes a component to be displayed as a modal
 * hide/show logic is in parent; this simply emits a close event
 */
import React, { Component, Fragment } from 'react'

import './with-modal.css'

import type { WithModalProps } from './types'

export default function withModal<P extends WithModalProps>(ModalComponent: React.ComponentType<P>) {
  class Wrapped extends Component<P> {
    render() {
      const { modalOverlayRef, onHide } = this.props 

      return (
        <Fragment>
          <div
            className="withmodal-overlay"
            id="withmodal-overlay"
            onClick={onHide}
            ref={modalOverlayRef}
            onDragEnter={onHide}
          />
          <div className="withmodal-wrapper">
            <ModalComponent {...this.props} />
          </div>
        </Fragment>
      )
    }
  }

  return Wrapped
}
