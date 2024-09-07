import "./styles.scss";

interface LoaderProps {
  description?: string;
  height?: string;
}

const Loader = ({ description, height = "100%" }: LoaderProps) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center custom-loader"
      style={{ height }}
    >
      <div className="d-flex flex-column align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="mt-2 text-center text-md">{description}</div>
      </div>
    </div>
  );
};

export default Loader;
