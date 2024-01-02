import { useCallback, useState } from "react";
import { $host } from "./index";

//Работает
export const useHttpArchivariusConnection = () => {
  const [loading, setLoading] = useState(false);
  const request = useCallback(async ({ serverIp, serverPort }) => {
    setLoading(true);
    try {
      const { data } = await $host.post("/archivarius/connection", {
        serverIp,
        serverPort,
      });
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      return { error: 404, message: "Сервер не запущен!" };
    }
  }, []);
  return { loading, request };
};

export const useHttpArchivariusStart = () => {
  const [loading, setLoading] = useState(false);
  const request = useCallback(
    async (serverIp, serverPort, textFile, optionId, optionTitle) => {
      setLoading(true);
      try {
        const { data } = await $host.post("/archivarius/start", {
          serverIp,
          serverPort,
          textFile,
          optionId,
          optionTitle,
        });
        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        return { error: 404, message: "Сервер не запущен!" };
      }
    },
    []
  );
  return { loading, request };
};

export const useHttpArchivariusReport = () => {
  const [loading, setLoading] = useState(false);
  const request = useCallback(async (url) => {
    setLoading(true);
    try {
      const { data } = await $host.get(url);
      setLoading(false);
      return data;
    } catch (e) {
      setLoading(false);
      return { error: 404, message: "Сервер не запущен!" };
    }
  }, []);
  return { loading, request };
};
