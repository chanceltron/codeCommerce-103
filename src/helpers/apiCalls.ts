import { Category } from './types';

const url = new URL('https://api.chec.io/v1/');

const headers = {
  'X-Authorization': import.meta.env.VITE_CHEC_SECRET_KEY,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getCategories = () => {
  return fetch(url + 'categories', {
    method: 'GET',
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) => {
      return data.data.map((category: any) => {
        return {
          id: category.id,
          name: category.name,
          image: category.assets[0].url,
        };
      });
    })
    .then((filteredData: Category[]) =>
      filteredData.reduce((sortedArray: Category[], category: Category) => {
        if (category.name === 'Suits') {
          sortedArray.unshift(category);
        } else {
          sortedArray.push(category);
        }
        return sortedArray;
      }, [])
    );
};
