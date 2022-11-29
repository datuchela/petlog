import imgUrl from "../assets/logo.svg";

const Loading = () => {
  return (
    <main className="flex items-center justify-center w-full h-[80vh]">
      <img className="h-32 animate-pulse" src={imgUrl} alt="logo" />
    </main>
  );
};

export default Loading;
