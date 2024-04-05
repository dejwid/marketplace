import MyImage from "@/components/MyImage";
import {UploadResponse} from "imagekit/dist/libs/interfaces";

export default function UploadView({file}:{file:UploadResponse}) {
  if (file.fileType === 'image') {
    return (
      <MyImage
        src={file.filePath}
        alt={'product photo'}
        width={2048}
        height={2048}
        className="w-auto h-auto max-w-full max-h-full rounded"
      />
    );
  }

  return (
    <>
      {file.name}
    </>
  );
}