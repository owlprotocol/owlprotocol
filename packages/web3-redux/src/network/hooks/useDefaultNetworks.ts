import { useNetwork } from './useNetwork';

export const useDefaultNetworks = () => {
    useNetwork('1');
    useNetwork('42161');
    useNetwork('10');
    useNetwork('137');
    useNetwork('1337');
};
