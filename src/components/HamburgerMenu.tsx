import { Dispatch, SetStateAction } from 'react';

type IProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const HamburgerMenu = ({ open, setOpen }: IProps) => {
  const hamburgerLines = [
    { class: open && 'rotate-45 translate-y-2.5' },
    { class: open && 'opacity-0' },
    { class: open && '-rotate-45 -translate-y-2.5' },
  ];

  return (
    <button onClick={() => setOpen(!open)} className='group w-full'>
      <div className='flex py-4 flex-col justify-center items-center'>
        {hamburgerLines.map((line, i) => (
          <i
            key={i}
            className={`h-0.5 w-7 my-1 rounded-full transition ease transform duration-300 group-hover:bg-white ${
              line.class
            } ${open ? 'bg-white' : 'bg-code-gray-200'}`}
          />
        ))}
        <p className='text-code-gray-200 text-sm group-hover:text-white mt-[2px]'>Menu</p>
      </div>
    </button>
  );
};
