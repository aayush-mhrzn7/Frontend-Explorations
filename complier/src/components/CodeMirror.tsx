import ReactCodeMirror from "@uiw/react-codemirror";
import React from "react";
import { javascript } from "@codemirror/lang-javascript";
import { cn } from "@/lib/utils";

const CodeEditor = ({ className }: { className: string }) => {
  const [value, setValue] = React.useState("console.log('hello world!');");
  const onChange = React.useCallback((val: string) => {
    console.log("val:", val);
    setValue(val);
  }, []);
  return (
    <ReactCodeMirror
      value={value}
      className={cn(className)}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
