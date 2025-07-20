import AppRouter, { SubDomainRouter } from '../Routers';

export const subDomainList = [
    {subdomain:"www", app: AppRouter, main: true},
    {subdomain:"url", app: SubDomainRouter, main: false}
];