
import { useQuery } from '@tanstack/react-query';
import api from '../Apis/api'; 

const fetchAnalytics = async ({ queryKey }) => {
  const [_, startDate, endDate, token] = queryKey;

  const response = await api.get(`/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  });

  return response.data;
};


const FetchClicksViaDate = (startDate, endDate, token,onError) => {
  return useQuery({
    queryKey: ['totalClicks', startDate, endDate, token],
    queryFn: fetchAnalytics,
    staleTime: 2000, 

    select: (data) => {
        console.log('Fetched data:', data);
      const clickDateArray = Object.keys(data).map((date) => ({
        "date": date,
        "clicks": data[date],
      }));
      return clickDateArray; // Return the transformed data
    },
    onError,
  });
};

export default FetchClicksViaDate;
