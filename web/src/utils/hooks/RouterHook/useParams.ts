import { useState, useMemo } from 'react';
import { useSelector, useDispatch, DefaultRootState } from 'react-redux';
import { getSearch, push } from 'connected-react-router';
import queryString from 'query-string';
import _ from 'lodash';

function useParams(keepBoolean?: boolean, intitialParams?: any) {
  // Initial Values
  const dispatch = useDispatch();
  // Selected Values
  const paramsState = useSelector<any>(getSearch);
  // Hook state
  const [params, setParam] = useState<any>(intitialParams || {});
  // Function
  function removeEmptyObjects(removedEmptyObject: object) {
    const obj = _.cloneDeep(removedEmptyObject);
    Object.keys(obj).forEach(key => {
      if (
        obj[key] === null ||
        obj[key] === undefined ||
        obj[key] === '' ||
        (_.isObject(obj[key]) && Object.keys(obj[key]).length === 0) ||
        (_.isArray(obj[key]) && obj[key].length === 0)
      ) {
        delete obj[key];
      }
    });
    return obj;
  }

  function removeEmptyValues(obj: object) {
    return _.pickBy(obj, _.identity);
  }

  const stateToParams = (search: string) => {
    const newParams = queryString.parse(search, {
      arrayFormat: 'bracket',
      parseNumbers: true,
      parseBooleans: true,
    });
    return newParams;
    // setParam(newParams);
  };
  // Change params
  const changeParams = (obj: object) => {
    const filteredObject = keepBoolean
      ? removeEmptyObjects(obj)
      : removeEmptyValues(obj);
    const stringtifiedParams = queryString.stringify(filteredObject, {
      arrayFormat: 'bracket',
    });
    dispatch(
      push({
        search: stringtifiedParams,
      }),
    );
  };

  // Handle when Params change
  useMemo(() => {
    if (!paramsState && Object.keys(intitialParams || {}).length > 0) {
      changeParams(intitialParams);
    } else {
      const newParams = stateToParams(paramsState as string);
      if (!_.isEqual(newParams, params)) {
        setParam(newParams);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsState]);

  return [params, changeParams];
}

export default useParams;
