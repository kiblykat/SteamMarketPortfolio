const InfoPopup = ({ setPopupVisible, popupVisible }) => {
  return (
    <div
      onClick={() => setPopupVisible(false)}
      className="z-40 fixed inset-0 bg-black bg-opacity-50"
    >
      <div
        className="fixed inset-32 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl">
          {popupVisible ? "popupVisible" : "no popupVisible"}
        </div>
      </div>
    </div>
  );
};

export default InfoPopup;
