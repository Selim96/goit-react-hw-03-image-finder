import React, { Component } from "react";
import { createPortal } from "react-dom";
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modalRoot');

class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', e => {
            if (e.code === 'Escape') {
                this.props.onClose();
            }
        })
    }

    componentWillUnmount() {

    }

    render() {
        return createPortal(
            <div className={s.Overlay}>
                <div className={s.Modal}>
                    {this.props.children}
                </div>
            </div>, modalRoot
        );
    }
}

export default Modal;