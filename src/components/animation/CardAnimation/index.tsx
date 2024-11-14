import {
  Rive,
  Layout,
  Fit,
  Alignment,
  useRive,
  decodeImage,
  ImageAsset,
} from "@rive-app/react-canvas";


export const CardAnimation = ({
  imageUrl,
  width = 400,
  height = 400,
}: {
  imageUrl: string;
  width?: number;
  height?: number;
}) => {
  const { rive, RiveComponent } = useRive({
    src: "animation/Skeleton (2).riv",
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
    assetLoader: (asset, bytes) => {
      if (asset.isImage) {
        setCustomImageAsset(asset as ImageAsset, imageUrl);
        return true;
      } else {
        return false;
      }
    },
  });

  const setCustomImageAsset = (asset: ImageAsset, imageUrl: string) => {
    fetch(imageUrl).then(async (res) => {
      const image = await decodeImage(new Uint8Array(await res.arrayBuffer()));
      asset.setRenderImage(image);
      image.unref();
    });
  };

  return (
    <RiveComponent style={{ width: `${width}px`, height: `${height}px` }} />
  );
};
