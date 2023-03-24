// TODO - Open modal with button press

export function Hero({ navbarHeight }: { navbarHeight: number }) {
  return (
    <div
      className={`h-[calc(100vh-${navbarHeight}px)] bg-hero-bg bg-cover bg-center flex justify-center sm:justify-end`}>
      <div className='font-playfair font-bold bg-code-gray-700 bg-opacity-20 w-fit h-fit mt-14 p-3 text-3xl text-code-gray-800 sm:mr-20 md:text-4xl md:p-5 lg:mr-36 lg:mt-24 '>
        <h2>Elevated style.</h2>
        <h2>Tailored to perfection.</h2>
        <button
          onClick={() => alert('hero button clicked')}
          className='mt-4 px-4 py-2 font-raleway font-normal text-lg text-white bg-code-gray-800'>
          Shop Collections
        </button>
      </div>
    </div>
  );
}
