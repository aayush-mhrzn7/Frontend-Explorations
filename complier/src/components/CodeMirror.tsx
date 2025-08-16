import { cn } from "@/lib/utils";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { javascript } from "@codemirror/lang-javascript";
import { php } from "@codemirror/lang-php";
import ReactCodeMirror from "@uiw/react-codemirror";
import { type Dispatch, type SetStateAction } from "react";

import { autocompletion } from "@codemirror/autocomplete";
import { html } from "@codemirror/lang-html";
import { python } from "@codemirror/lang-python";

const CodeEditor = ({
  className,
  value,
  onChange,
}: {
  className: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <ReactCodeMirror
      value={value}
      className={cn(className)}
      extensions={[
        autocompletion(),
        javascript({ jsx: true }),
        go(),
        cpp(),
        php(),
        python(),
        html(),
      ]}
      onChange={onChange}
    />
  );
};

export default CodeEditor;
