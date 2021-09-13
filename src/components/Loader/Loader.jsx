import Loading from "react-loader-spinner";
import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.containerLoading}>
      <Loading type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  );
}
