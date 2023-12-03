import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "../lib/toast";
import { FileInput } from "./ui/file-input";
import { ImgurResponse, imgurBaseUrl, uploadImage } from "@/lib/imgur";

export function PictureUpload({
  onChange,
  btnText,
}: {
  onChange?: (filename: string) => void;
  btnText?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState("");
  const uploadProcess = useUploadProcess((res: ImgurResponse) => {
    setIsOpen(false);
    onChange && onChange(res.data.link.replace(imgurBaseUrl, ""));
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setIsOpen((old) => !old);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">{btnText}</Button>
      </DialogTrigger>
      <DialogContent
        autoFocus={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Picture upload</DialogTitle>
          <DialogDescription className="opacity-50">
            Here you can upload new pictures to imgur to use as a background,
            you can use your own picture or an existing one from any url picture
            <br />
            <span className="text-orange-400">
              WARNING: these pictures will be publicly available after upload
            </span>
          </DialogDescription>
        </DialogHeader>
        <Label>Picture</Label>
        <FileInput
          disabled={!!url.length}
          multiple={false}
          accept={{
            "image/*": [],
          }}
          onDrop={(files) => {
            setFiles(files);
          }}
        />
        <div className="italic flex justify-center">OR</div>
        <Label>Url</Label>
        <Input
          autoFocus={false}
          disabled={!!files.length}
          placeholder="Copy some urls"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <DialogFooter>
          <Button
            disabled={!files.length && !url.length}
            onClick={() => uploadProcess(files.length ? files[0] : url)}
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function useUploadProcess(onSuccess?: (res: ImgurResponse) => void) {
  const { toast } = useToast();

  return async (file: File | string) => {
    try {
      toast({
        title: "Uploading ...",
      });
      const res = await uploadImage(file);
      if (res.status === 200) {
        toast({
          title: "Picture uploaded",
        });
        onSuccess && onSuccess(res);
      }
    } catch (e) {
      toast({
        title: "Unexpected error",
        description: "upload failed, check the console for more information",
      });
      console.error(e);
    }
  };
}
