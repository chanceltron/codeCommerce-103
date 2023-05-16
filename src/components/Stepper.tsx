import { useFormStep } from '../hooks/hooks';

export function Stepper() {
  const { formStep, setFormStep } = useFormStep();
  const inactiveClass = 'bg-stone-400';
  const activeClass = 'bg-white text-pink-600 ring-4 ring-pink-600';
  const doneClass = 'bg-pink-600';

  const steppers = [
    {
      id: 0,
      name: 'Cart',
      icon: 'fa-cart-shopping',
      class: formStep === 0 ? activeClass : formStep > 0 ? doneClass : inactiveClass,
      bar: formStep > 0 ? 'bg-pink-600' : 'bg-stone-400',
    },
    {
      id: 1,
      name: 'Shipping',
      icon: 'fa-truck-fast',
      class: formStep === 1 ? activeClass : formStep > 1 ? doneClass : inactiveClass,
      bar: formStep > 1 ? 'bg-pink-600' : 'bg-stone-400',
    },
    {
      id: 2,
      name: 'Payment',
      icon: 'fa-credit-card',
      class: formStep === 2 ? activeClass : formStep > 2 ? doneClass : inactiveClass,
      bar: formStep > 2 ? 'bg-pink-600' : 'bg-stone-400',
    },
    {
      id: 3,
      name: 'Confirmation',
      icon: 'fa-check-double',
      class: formStep === 3 ? activeClass : formStep > 3 ? doneClass : inactiveClass,
      bar: formStep > 3 ? 'bg-pink-600' : 'bg-stone-400',
    },
  ];

  return (
    <div className='fixed w-full bg-[#ebeaef]'>
      <div className=' top-0 left-0 w-full flex justify-between items-center text-white mx-auto'>
        {steppers.map((stepper) => {
          return (
            <div key={stepper.id} className='flex items-center'>
              <div className='group z-10 relative'>
                <a
                  onClick={() => stepper.id < formStep && setFormStep(stepper.id)}
                  className={`cursor-pointer flex justify-center z-10 items-center ${stepper.class} w-10 h-10 rounded-full`}>
                  <i className={`fa-solid ${stepper.icon}`} />
                </a>
                <span
                  className='absolute -bottom-5 transition-all left-1/2 transform -translate-x-1/2 translate-y-1/2
                w-fit scale-0 rounded-xl border-2 border-pink-600 bg-white p-2 text-xs text-pink-600 font-medium group-hover:scale-100'>
                  {stepper.name}
                </span>
              </div>
              {stepper.id !== 3 && (
                <div className={`fixed h-2 w-1/3 z-0 ${stepper.bar} md:w-[18.5vw] lg:w-56`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
