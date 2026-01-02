import "./Loading.css";

const LoadingComponent = (props) => {
  const loading = [""];
  return (
    <>
      <div className="loading-animation">
        <div></div>
        {/* <div></div> */}
      </div>
      <p>Loading...</p>
    </>
  );
};

export default LoadingComponent;
