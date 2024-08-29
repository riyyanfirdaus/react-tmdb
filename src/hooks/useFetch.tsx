import { useEffect, useState } from "react";

export default function useFetch<T>(url: string, isCache?: boolean, localKey?: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const CACHE_DURATION = 2 * 60 * 1000;

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const responseData = await response.json();
      setData(responseData as T);

      if (isCache && localKey) {
        localStorage.setItem(localKey || "defaultData", JSON.stringify({ data: responseData as T, timestamp: Date.now() }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const loadCachedData = () => {
    const cachedData = localStorage.getItem(localKey || "");
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setData(data);
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (!loadCachedData()) {
      fetchData();
      console.log("fetching...");
    }

    const intervalId = setInterval(() => {
      fetchData();
    }, CACHE_DURATION);

    return () => clearInterval(intervalId);
  }, [url]);

  return { data, error, loading, fetchData };
}
