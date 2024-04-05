'use client';
import Image, {ImageProps} from "next/image";

type LoaderProps = {
  src: string;
  width: number;
  height?: number;
  quality?: number | undefined
  aiCrop?: boolean;
};

const imageKitLoader = ({ src, width, height, quality, aiCrop }: LoaderProps) => {
  if(src[0] === "/") src = src.slice(1);
  const params = [`w-${width}`];
  if (height && aiCrop) {
    params.push(`h-${height}`);
  }
  if (quality) {
    params.push(`q-${quality}`);
  }
  if (aiCrop) {
    params.push('fo-auto');
  }
  const paramsString = params.join(",");
  var urlEndpoint = process.env.NEXT_PUBLIC_IK_ENDPOINT as string;
  if(urlEndpoint[urlEndpoint.length-1] === "/") urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
  return `${urlEndpoint}/${src}?tr=${paramsString}`
}

type MyImageProps = ImageProps & {
  aiCrop?: boolean;
  width: number;
  height?: number;
};

const MyImage = ({width,height,aiCrop,...props}:MyImageProps) => {
  return (
    <Image
      loader={args => imageKitLoader({
        ...args,
        width,
        height,
        aiCrop
      })}
      width={width}
      height={height}
      {...props}
    />
  );
};

export default MyImage;