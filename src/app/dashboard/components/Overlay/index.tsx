import "./styles.scss";
interface OverlayProps {
  isActive: boolean;
  className?: string;
}

const CustomOverlay = ({ className, isActive }: OverlayProps) => {
  return isActive ? (
    <div className={`position-fixed w-100 h-100 overlay ${className}`}></div>
  ) : null;
};

export default CustomOverlay;
