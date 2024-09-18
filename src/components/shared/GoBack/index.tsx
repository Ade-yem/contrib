import { useRouter } from "next/navigation";
import Image from "next/image";
import "./styles.scss";

const GoBack = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <div className="d-flex go-back-container">
        <div
          role="button"
          onClick={handleBack}
          className="d-flex gap-3 go-back transition-all"
        >
          <span className="go-back-arrow">
            <Image
              src="/long-arrow-left.svg"
              alt="back"
              height={20}
              width={20}
            />
          </span>

          <span>Back</span>
        </div>
      </div>
    </div>
  );
};

export default GoBack;
