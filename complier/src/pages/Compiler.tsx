import CodeEditor from "@/components/CodeMirror";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/constants/index.constants";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
export interface Result {
  language: string;
  version: string;
  run: Run;
}

export interface Run {
  stdout: string;
  stderr: string;
  code: number;
  signal: null;
  output: string;
}

const Compilet = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("console.log('Hello World')");

  const { mutate, data, isPending } = useMutation<
    { data: Result },
    Error,
    {
      language: string;
      version: string;
      files: {
        name: string;
        content: string;
      }[];
    }
  >({
    mutationFn: async (payload) => {
      return axios.post("https://emkc.org/api/v2/piston/execute", payload);
    },
    mutationKey: ["generateCompiledCode"],
  });

  const handleSubmit = () => {
    const languageDetails = languages.find(
      (item) => item.language === selectedLanguage
    );

    if (!languageDetails) return;

    mutate(
      {
        language: languageDetails.language,
        version: languageDetails.version,
        files: [{ name: `main.${selectedLanguage}`, content: code }],
      },
      {
        onSuccess: (res) => {
          console.log("Output:", res.data);
        },
        onError: (err) => {
          console.error("Error:", err);
        },
      }
    );
  };
  return (
    <main className="bg-secondary h-screen py-10 px-4">
      <div className="h-[90vh]  max-w-7xl mx-auto font-primary">
        <ResizablePanelGroup direction="horizontal" className="flex gap-4 ">
          <ResizablePanel className="h-full  flex flex-col  p-5  w-full ">
            <div className="flex justify-between gap-2 ">
              {" "}
              <span className="max-w-[150px] bg-white flex w-full items-center pl-4 text-sm  h-[40px] border-2 rounded-t-xl border-b-0">
                {
                  languages.find((item) => item?.language == selectedLanguage)
                    ?.filename
                }
              </span>
              <Button
                disabled={!!isPending}
                variant={"outline"}
                className="text-sm"
                onClick={handleSubmit}
              >
                {isPending ? (
                  "Running...."
                ) : (
                  <>
                    Run <Play className="size-3" />
                  </>
                )}
              </Button>
            </div>
            <div className="w-full h-full  border-2 bg-white rounded-r-xl rounded-t-none rounded-xl">
              <CodeEditor
                value={code}
                onChange={setCode}
                className="rounded-r-xl h-full flex-1 font-primary outline-none  border-none"
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="h-full p-5 w-full flex flex-col  rounded-xl">
            {" "}
            <div className="w-full    flex justify-between flex-row-reverse  items-center  capitalize h-[40px] ">
              <h6 className="max-w-[150px] bg-white flex justify-end w-full items-center pr-4 capitalize h-[40px] border-2 rounded-t-xl text-sm border-b-0">
                Output
              </h6>
              <div className="mb-3 font-primary">
                <Select
                  defaultValue={selectedLanguage}
                  onValueChange={(e) => {
                    setSelectedLanguage(e);
                  }}
                >
                  <SelectTrigger className=" bg-white w-[180px]">
                    <SelectValue placeholder="Select a Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-primary">
                    {languages.map((item) => (
                      <SelectItem value={item?.language}>
                        {item.language} - {item?.version}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="h-full text-[15px]  rounded-l-xl  rounded-xl p-5 border-2 bg-white rounded-t-none">
              {isPending ? (
                <div className="flex h-full w-full justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                data?.data?.run.output.split("\n").map((item) => <p>{item}</p>)
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
};

export default Compilet;
