import { adddomainType } from "../types/domain";
import httpService from "./_httpService";

// get domain
export const getDomainServices = async () => {
    const response = await httpService("/api/Domain/" ,"GET")
    if (response.status == 200)
        return response.data;
    return response.data.results;
}

// post domain
export const addDomainServices = async (values : adddomainType) => {
    const res = await httpService("/api/Domain/" ,"POST", {
        ...values
    })
    return res;
}


// delete domain
export const deleteDomainServices = async (id : number) => {
    const res = await httpService(`/api/Domain/${id}/` ,"DELETE")
    return res;
}

// edit domain
export const editDomainServices = async (id: number, values: adddomainType) => {
  return httpService(`/api/Domain/${id}/`, "PATCH", {
    ...values
  });
};