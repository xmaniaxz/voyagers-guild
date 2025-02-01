"use client";
import { JSX, useEffect, useState } from "react";
import { LoadFromCollection } from "@/components/node-appwrite";
import Card from "@/components/card";
import { ServerAPI } from "@/components/node-apis";
import { Server } from "http";
const Servers = (): JSX.Element => {
  const [servers, setServers] = useState<any>([]);
  const [serverStatus, setServerStatus] = useState<Array<any>>([]);
  useEffect(() => {
    async function CallActiveServers() {
      const response = await LoadFromCollection(
        "677fa96000311c0521fc",
        "677fa969000d44d60c57"
      );

      if (response.code === 200) {
        const message = response.message as Array<any>;
        setServers(message);

        message.map(async (server: any, index: number) => {
          await ServerAPI(server.Server_IP, server.Port).then((response) => {
            setServerStatus((prevStatus: any) => {
              const newStatus = [...prevStatus];
              newStatus[index] = response;
              return newStatus;
            });
          });
        });
      }
    }
    CallActiveServers();
  }, []);

  return (
    <section className="center w-full px-24 min-h-[600px] h-2/5 grid grid-rows-1 gap-4 md:grid-rows-1 lg:grid-rows-3">
      {servers && servers.length == serverStatus.length ? (
        servers.map((server: any, index: number) => {
          return (
            <Card
              key={index}
              rotateHue={serverStatus[index].online}
              className={`${
                !serverStatus[index].online && "red"
              } p-4 h-full w-1/4`}
            >
              <h2 className="text-xl font-bold">{server.Server_Name}</h2>
              <br />
              <ul className="h-full flex flex-col justify-between">
                <div className="h-full">
                  <li>IP: {server.Server_IP}</li>
                  <li>
                    Players:{" "}
                    {serverStatus[index].online
                      ? serverStatus[index].players.online +
                        "/" +
                        serverStatus[index].players.max
                      : "Offline"}
                  </li>

                  <li>Version: {server.Forge_Version}</li>
                      <br />
                  {serverStatus[index].motd &&(
                    <li
                      dangerouslySetInnerHTML={{
                        __html: serverStatus[index].motd.html,
                      }}
                    />
                  )}

                  <div className="absolute bottom-8 w-1/2 p-2 aspect-square">
                    {serverStatus[index].icon && (
                      <img
                        className="h-full w-full"
                        src={serverStatus[index].icon}
                      />
                    )}
                  </div>
                </div>
              </ul>
            </Card>
          );
        })
      ) : (
        <div className="center">
          <h1>Loading...</h1>
        </div>
      )}
    </section>
  );
};
export default Servers;
