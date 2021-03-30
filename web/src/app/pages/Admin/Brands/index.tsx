import React, { useEffect } from 'react';
import saga from './saga';
import { useInjectSaga } from 'utils/redux-injectors';
import { fetchPendingBrands } from './actions';
import { useDispatch } from 'react-redux';

export function Brands() {
  useInjectSaga({
    key: 'admin.brand.brandSaga',
    saga,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPendingBrands());
  }, [dispatch]);

  return <div>Admin/BRANDS PAGE</div>;
}
