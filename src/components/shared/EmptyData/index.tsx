import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode } from "react";

const EmptyData = ({
  text,
  height,
  children,
}: {
  text?: string;
  height?: string;
  children?: ReactNode;
}) => {
  return (
    <div
      className="w-100 d-flex justify-content-center align-items-center"
      style={{ height }}
    >
      <div className="text-center">
        <Icon icon="mage:folder-cross" width="14rem" height="14rem" />
        <br />
        <p className="fs-3 py-2">Empty!</p>
        {text && <p className="fs-4">{text}</p>}
        {children}
      </div>
    </div>
  );
};

export default EmptyData;
