import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./button";
import { Trash } from "lucide-react";
import { useDropzone, DropzoneOptions, DropEvent } from "react-dropzone";

export function FileInput(props: DropzoneOptions) {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    ...props,
    onDrop: (acceptedFiles, fr, e) => {
      props.onDrop && props.onDrop(acceptedFiles, fr, e);
      if (props.multiple) setFiles((f) => [...f, ...acceptedFiles]);
      else if (acceptedFiles.length) setFiles([acceptedFiles[0]]);
    },
  });

  return (
    <div className="flex gap-x-4">
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          props.disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input {...getInputProps()} />
        {!files.length &&
          (isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p className="opacity-70 font-[300] cursor-pointer">
              Drag 'n' drop some files here, or click to select files
            </p>
          ))}
        <ul>
          {files.map((f) => (
            <li key={f.name}>{f.name}</li>
          ))}
        </ul>
      </div>
      <Button
        variant="outline"
        className="px-3"
        disabled={!files.length || props.disabled}
        onClick={() => {
          setFiles([]);
          props.onDrop && props.onDrop([], [], {} as DropEvent);
        }}
      >
        <Trash className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
}
