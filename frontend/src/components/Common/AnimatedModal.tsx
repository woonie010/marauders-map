'use client';
import React from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from '../ui/animated-modal';
import { animatedModalProps } from '@/types/common';

const AnimatedModal: React.FC<animatedModalProps & { children: React.ReactNode }> = (props) => {
  const { context, title, emoji, children } = props;

  return (
    <div className="p-5 flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-monashBlue text-white flex justify-center group/modal-btn">
          <span className="text-white group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            {context}
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-black z-20">
            {emoji}
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-neutral-100 text-2xl font-bold text-center mb-8">{title}</h4>
            <div className="max-h-96 overflow-y-auto">{children}</div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AnimatedModal;
