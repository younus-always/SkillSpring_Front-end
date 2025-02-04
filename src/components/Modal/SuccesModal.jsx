import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import success from "../../assets/icons/success.gif";

const SuccessModal = ({ title, message, isOpen, close }) => {
      if (!isOpen) return null; // Modal won't render if isOpen is false
      return (
            <div>
                  <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                              <div className="flex min-h-full items-center justify-center p-4 relative">
                                    <DialogPanel
                                          transition
                                          className="absolute bottom-6 right-6 w-full max-w-sm rounded-md bg-slate-900/80 text-slate-50 py-2 px-3 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                    >
                                          <div className="flex items-center gap-3">
                                                <img src={success} alt="" className="w-12 h-full rounded-full" />
                                                <div>
                                                      <DialogTitle as="h3" className="text-base/7 font-medium">
                                                            {title}
                                                      </DialogTitle>
                                                      <p className="mt-1 text-sm/6">
                                                            {message}
                                                      </p>
                                                </div>
                                          </div>
                                          <div className="absolute top-2 right-2">
                                                <Button
                                                      className="inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-2 text-sm/6 font-semibold text-white shadow focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                                      onClick={close}
                                                >
                                                      <IoClose size={16} />
                                                </Button>
                                          </div>
                                    </DialogPanel>
                              </div>
                        </div>
                  </Dialog>
            </div >
      )
}

export default SuccessModal