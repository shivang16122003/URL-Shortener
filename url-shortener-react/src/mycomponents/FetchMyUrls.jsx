
import { useQuery } from '@tanstack/react-query';
import api from '../Apis/api';  

const fetchAnalytics = async ({ queryKey }) => {
  const [ _,token] = queryKey;

  const response = await api.get(`/api/urls/myUrls`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });
 
  return response.data;
};


const FetchMyUrls = ( token,onError) => {
  return useQuery({
    queryKey: ['MyUrls',  token],
    queryFn: fetchAnalytics,
    staleTime: 10000, 
    select: (data) => {
      console.log('Fetched URL data:', data);
      return data.map((item) => ({
        id: item.id,
        ogUrl: item.ogUrl,
        babyUrl: item.babyUrl,
        clicks: item.clickCount,
      }));
    },
    
    onError,
  });
};

export default FetchMyUrls;