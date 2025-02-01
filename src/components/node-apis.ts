"use server";
export const ServerAPI = async (address: string,port:number) => {
    try {
        const response = await fetch(`https://api.mcstatus.io/v2/status/java/${address}:${port}?query=true`);
        const ServerStatus = await response.json();
        return ServerStatus;
    } catch (error) {
        console.error(error);
    }
}