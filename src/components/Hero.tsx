// // TODO - Go to collection section with button press

export function Hero() {
  return (
    <div className='bg-hero-bg bg-cover bg-center flex justify-center flex-grow sm:justify-end'>
      <div className='h-fit font-playfair font-bold bg-code-gray-700 bg-opacity-20 mt-24 p-3 text-3xl text-code-gray-800 sm:mr-20 md:text-4xl md:p-5 lg:mr-36 lg:mt-24 '>
        <h2>Elevated style.</h2>
        <h2>Tailored to perfection.</h2>
        <button
          onClick={() => {
            const collections = document.querySelector('#collections');
            collections!.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }}
          className='mt-4 px-4 py-2 font-raleway font-normal text-lg text-white bg-code-gray-800'>
          Shop Collections
        </button>
      </div>
    </div>
  );
}
