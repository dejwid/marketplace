'use client';
import {IKContext, IKUpload} from "imagekitio-react";
import {IKUploadProps} from "imagekitio-react/src/components/IKUpload/props";

export default function Uploader(props:IKUploadProps) {
  return (
    <>
      <IKContext
        urlEndpoint={process.env.NEXT_PUBLIC_IK_ENDPOINT}
        publicKey={process.env.NEXT_PUBLIC_IK_PUBLIC_KEY}
        authenticator={async () => {
          const response = await fetch('/api/imagekit/auth');
          return await response.json();
        }}
      >
        <IKUpload {...props} />
      </IKContext>
    </>
  );
}