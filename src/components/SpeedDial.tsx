import { useState } from 'react';
import { HamburgerMenu } from './HamburgerMenu';

type IProps = {
  actions: {
    name: string;
    label: string;
    onClick?: () => void;
    icon?: string;
  }[];
};

export const SpeedDial = ({ actions }: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='w-full'>
      <HamburgerMenu open={open} setOpen={setOpen}></HamburgerMenu>
      <ul
        className={`absolute bottom-24 right-0 m-0 p-0 list-none flex flex-col items-end transform transition-transform duration-300 ease-out ${
          open ? '' : 'translate-x-full'
        }`}>
        {actions.map((action, index) => (
          <li
            key={index}
            className='group flex items-center h-16 px-4 cursor-pointer'
            onClick={() => {
              if (action.onClick) {
                action.onClick();
                setOpen(false);
              }
              return;
            }}>
            <span className='mr-3 px-3 py-2 bg-white rounded-full shadow-2xl transition-colors duration-200 group-hover:bg-gray-200'>
              {action.label}
            </span>
            <span className='px-3 py-2 bg-white rounded-full shadow-2xl transition-colors duration-200 group-hover:bg-gray-200'>
              <i className={`${action.icon}`}></i>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
