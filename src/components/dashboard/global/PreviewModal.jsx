import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";

export default function PreviewModal({ handleClose, isOpen, children }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex justify-center py-16 px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "w-full max-w-3xl transform rounded-lg bg-white p-3 text-left align-middle shadow-xl transition-all"
                )}
              >
                <div className="flex items-center justify-end">
                  <IoClose
                    size="22"
                    className="text-white cursor-pointer"
                    onClick={handleClose}
                  />
                </div>
                <div className="w-full">
                  <p className="text-2xl text-gray-700 font-semibold leading-tighter mb-2">
                    Preview Investment
                  </p>
                  <p className="text-base max-w-4xl">
                    Review the details of your investment before confirming.
                    This is a preview stage, and no additional amount entry is
                    required at this point. Please be aware that the
                    finalization process might take a few minutes.
                  </p>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
