"use client";
import { JSX, useEffect, useState } from "react";
import { GetActiveServers } from "@/components/node-appwrite";

const Servers = (): JSX.Element => {
  const [servers, setServers] = useState<any>([]);
  useEffect(() => {
    async function CallActiveServers() {
      const response = await GetActiveServers();
      if (response) {
        setServers(response.documents);
        console.log(response.documents)
      }
    }
    CallActiveServers();
  }, []);

  return <>Test</>;
};
export default Servers;
