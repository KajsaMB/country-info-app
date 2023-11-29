import "./Error.css";

export default function Error({ title, errorMessage, onConfirm }) {
  return (
    // returns error message with close button
    <div className="error-container">
      <div className="error">
        <h2>{title}</h2>
        <p>{errorMessage}</p>
        {onConfirm && (
          <div id="confirmation-actions">
            <button onClick={onConfirm} className="button">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
