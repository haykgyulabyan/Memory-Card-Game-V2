import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { PicsumImage } from 'types';

const fetchImages = async (limit: number): Promise<PicsumImage[]> => {
  const randomPage = Math.floor(Math.random() * 20) + 1;
  const apiUrl = `https://picsum.photos/v2/list?page=${randomPage}&limit=${limit}`;

  try {
    const response = await axios.get<PicsumImage[]>(apiUrl);

    if (!Array.isArray(response.data) || response.data.length < limit) {
      const fallbackUrl = `https://picsum.photos/v2/list?page=1&limit=${limit}`;
      const fallbackResponse = await axios.get<PicsumImage[]>(fallbackUrl);
      if (!Array.isArray(fallbackResponse.data) || fallbackResponse.data.length < limit) {
        throw new Error(`Failed to fetch enough images (needed ${limit}) even from fallback.`);
      }
      return fallbackResponse.data;
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch images');
    }
    throw new Error('An unknown error occurred while fetching images');
  }
};

export const useFetchImages = (limit: number | undefined | null, enabled: boolean) => {
  return useQuery<PicsumImage[], Error>({
    queryKey: ['images', limit],
    queryFn: () => {
      if (!limit) {
        return Promise.reject(new Error('Image fetch limit is not set.'));
      }
      return fetchImages(limit);
    },
    enabled: enabled && typeof limit === 'number' && limit > 0,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};
