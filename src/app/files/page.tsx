"use client";

import { useState, useEffect } from "react";
import { LoadFromCollection,GetDownloadLink } from "@/components/node-appwrite";
import Card from "@/components/card";
import { useRouter } from "next/navigation";

const FilePage = () => {
  const [disabledButtons, setDisabledButtons] = useState<number[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const router = useRouter();
  const databaseID = "677fa96000311c0521fc";
  const collectionID = "67aa3429001e3be61ce9";
  const bucketID = "67aa1870001eaadbdcbb";

  useEffect(() => {
    const getFiles = async () => {
      const response = await LoadFromCollection(databaseID, collectionID);
      if (response.code === 200) {
        setFiles(response.message as any[]);
      }
    };
    getFiles();
  }, []);

  const handleDownload = async (filename: string, index: number) => {
    setDisabledButtons((prev) => [...prev, index]);
    const response = await GetDownloadLink(bucketID,filename);
    if(response.code === 200){
      const blob = new Blob([response.message as BlobPart]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }
    setTimeout(() => {
      setDisabledButtons((prev) => prev.filter((i) => i !== index));
    }, 5000); // Re-enable the button after 5 seconds
  };

  return (
    <div>
      <button
        className="text-3xl btn btn_home"
        onClick={() => router.push("/")}
      >
        Files
      </button>
      <div className="mx-auto mt-4 w-[1600px]">
        <div className="space-y-4">
          {files.map((file, index) => (
            <Card key={index} className="p-4">
              <h1 className="text-2xl font-bold">{file.rootfolder}</h1>
              <hr />
              <div className="flex flex-wrap gap-[10px] items-center">
                {file.files.map((file: any, index2: number) => {
                  const fileData = JSON.parse(file);

                  return (
                    <div key={index2}>
                      <div className="w-[175px] aspect-square  flex-col text-center items-center justify-center">
                        <i className="Icon text-[175px]">folder_zip</i>
                        <h5 className="mt-[-30px] w-inherit text-ellipsis whitespace-nowrap overflow-hidden">{fileData.name}</h5>
                      </div>
                      <button
                        className="m-2 w-40 px-4 py-3 relative btn btn_download"
                        onClick={() =>
                          handleDownload(fileData.name, index + index2)
                        }
                        disabled={disabledButtons.includes(index + index2)}
                      >
                        {disabledButtons.includes(index + index2)
                          ? "Please wait..."
                          : "Download"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilePage;
