import Skeleton from "react-skeleton-loader";
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

export const TableLoading = ({
  count,
  row,
}: {
  count: number;
  row?: number;
}) => {
  return (
    <div>
      <table className="table table-hoverable text-nowrap">
        <tbody>
          {[...Array(row || 10)].map((e, index) => (
            <tr key={index}>
              {[...Array(count)].map((value, index) => (
                <td key={index}>
                  <Skeleton color="#ced4da" width="100%" height="25px" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
