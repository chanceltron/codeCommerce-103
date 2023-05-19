import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { Collections } from '../components/Collections';
import { useParams } from 'react-router-dom';
import { CategoryName } from '../helpers/types';

type IHomeProps = {
  setCategory: React.Dispatch<React.SetStateAction<CategoryName>>;
};

export const Home: React.FunctionComponent<IHomeProps> = ({ setCategory }) => {
  return (
    <>
      <div className='flex flex-col'>
        <Hero />
      </div>
      <Collections setCategory={setCategory} />
    </>
  );
};
