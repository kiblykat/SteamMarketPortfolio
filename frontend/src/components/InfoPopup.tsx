interface InfoPopupProps {
  setPopupVisible: (visible: boolean) => void;
  popupVisible: boolean;
}

const InfoPopup = ({ setPopupVisible }: InfoPopupProps) => {
  return (
    <div
      onClick={() => setPopupVisible(false)}
      className="z-40 fixed inset-0 bg-black bg-opacity-50"
    >
      <div
        className="fixed bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl">
          <div className="flex justify-between items-center p-4">
            <span>Info</span>
            <button
              className="text-gray-500 hover:text-gray-700"
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
