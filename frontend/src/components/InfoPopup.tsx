interface InfoPopupProps {
  setPopupVisible: (visible: boolean) => void;
  popupVisible: boolean;
  text: string;
}

const InfoPopup = ({ setPopupVisible, text }: InfoPopupProps) => {
  return (
    <div
      onClick={() => setPopupVisible(false)}
      className="flex flex-col items-center justify-center z-40 fixed inset-0 bg-black bg-opacity-50"
    >
      <div
        className="fixed bg-white rounded-lg shadow-lg w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4">
          <span className="text-xl m-4">{text}</span>
          <div className="flex items-center justify-center text-center">
            <button
              className="flex items-center justify-center text-center text-gray-500 hover:text-gray-700 text-5xl"
              onClick={() => setPopupVisible(false)}
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;
