export const Modal = ({ children, setModalIsOpen }: any) => {
  return (
    <div className='fixed inset-0 z-10 overflow-y-scroll'>
      <div
        className='fixed inset-0 w-full h-full bg-black opacity-40'
        onClick={() => setModalIsOpen(false)}></div>
      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg py-4 mx-auto bg-white rounded-md shadow-lg'>
          {children}
        </div>
      </div>
    </div>
  );
};
