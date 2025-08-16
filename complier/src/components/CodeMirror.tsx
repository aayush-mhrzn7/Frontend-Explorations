import ReactCodeMirror from "@uiw/react-codemirror";
import React, { type Dispatch, type SetStateAction } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { cn } from "@/lib/utils";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { php } from "@codemirror/lang-php";

import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
import { autocompletion } from "@codemirror/autocomplete";

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
