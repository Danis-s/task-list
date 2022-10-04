import {useMemo} from 'react';
import {BaseAPI, Configuration} from '../openapi';


const useApi = <T extends BaseAPI>(apiConstructor: new (configuration: Configuration) => T): T => {
    return useMemo<T>(() => {
        return new apiConstructor(new Configuration({
            basePath: '.'
        }));
    }, [apiConstructor]);
};
export default useApi;