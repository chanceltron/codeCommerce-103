// TODO - Open modal with button press

export function Hero() {
  return (
    <div className='bg-hero-bg bg-cover h-[89vh] bg-center flex justify-center'>
      <div className='font-playfair font-bold bg-code-gray-700 bg-opacity-20 w-fit h-fit rounded-sm mt-10 p-2 text-3xl text-code-gray-800'>
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
