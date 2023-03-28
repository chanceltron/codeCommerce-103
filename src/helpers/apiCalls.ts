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

export const getProducts = () => {
  const prodUrl = new URL(url + 'products');
  const params = {
    include: 'assets',
    limit: '25',
  };
  Object.entries(params).map(([key, value]) =>
    prodUrl.searchParams.append(key, value)
  );

  return fetch(prodUrl, {
    method: 'GET',
    headers: headers,
  })
    .then((res) => res.json())
    .then((data) =>
      data.data.map((product: any) => ({
        id: product.id,
        name: product.name,
        category: product.categories[0].slug,
        image: product.assets[0].url,
        assets: product.assets,
        price: product.price.formatted_with_symbol,
      }))
    );
};
