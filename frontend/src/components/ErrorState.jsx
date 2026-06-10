export default function ErrorState({ message, onRetry, retrying }) {
  return (
    <div className="status-panel error-state">
      <p className="status-title">Impossible de charger le catalogue</p>
      <p className="status-message">{message}</p>
      <button type="button" className="status-action" onClick={onRetry} disabled={retrying}>
        {retrying ? "Nouvelle tentative..." : "Reessayer"}
      </button>
    </div>
  );
}
