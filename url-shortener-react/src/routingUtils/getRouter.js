import React from 'react'
import { subDomainList } from './options';

function getRouter() {

    const hostname= window.location.hostname;//www.example.com or localhost
    const subdomain=getSubdomain(hostname);
    const mainRouter=subDomainList.find((item) => item.main);//Checking subdomain list which is the main router (main==true)
    if (subdomain === "") {
        // If the subdomain matches the main router, return the main app
        return mainRouter.app;
    }

    const SubdomainRouter= subDomainList.find((item) => item.subdomain === subdomain);
  return SubdomainRouter ? SubdomainRouter.app : mainRouter.app;
}

export default getRouter
function getSubdomain(hostname) {
    const parts = hostname.split('.');
    const islocalost=parts.slice(-1)[0];
    let splitINdex;
    if (islocalost === 'localhost')
        splitINdex=-1;
    else
     splitINdex = 2; 
    return parts.slice(0, splitINdex).join(''); // Default to 'www' if no subdomain is found
}