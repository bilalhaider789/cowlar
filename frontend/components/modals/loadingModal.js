
const LoadingModal = (props) => {
  
  return (
    <div>
        
          <div className="bg-gray-400 opacity-40 h-full w-full absolute top-0 left-0 cursor-pointer"></div>
          <div className="bg-transparent h-full w-full text-[32px] font-semibold absolute top-0 left-0 flex justify-center items-center">
            Loading... Please Wait
          </div>
        
    </div>
  );
};
export default LoadingModal;
