import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CodeEditor from "./components/CodeMirror";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "./components/navbar-05/navbar-05";
const App = () => {
  return (
    <main className="bg-secondary h-screen py-10 px-4">
      <div className="h-[90vh]  max-w-7xl mx-auto font-primary">
        <ResizablePanelGroup direction="horizontal" className="flex gap-4 ">
          <ResizablePanel className="h-full  flex flex-col  p-5  w-full ">
            <span className="max-w-[150px] bg-white flex w-full items-center pl-4 text-sm  h-[40px] border-2 rounded-t-xl border-b-0">
              {" "}
              index.js
            </span>
            <div className="w-full h-full  border-2 bg-white rounded-r-xl rounded-t-none rounded-xl">
              <CodeEditor className="rounded-r-xl h-full flex-1 font-primary outline-none  border-none" />
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
                <Select>
                  <SelectTrigger className=" bg-white w-[180px]">
                    <SelectValue placeholder="Select a Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-white font-primary">
                    <SelectItem value="js">JS</SelectItem>
                    <SelectItem value="c#">C#</SelectItem>
                    <SelectItem value="c++">C++</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="h-full  rounded-l-xl  rounded-xl p-5 border-2 bg-white rounded-t-none"></div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
};

export default App;
