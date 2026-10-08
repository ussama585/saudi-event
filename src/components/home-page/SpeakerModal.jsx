import Modal from "./Modal";

export default function SpeakerModal({ speaker, setSpeaker }) {
  return (
    <Modal
      open={speaker !== null}
      onClose={() => setSpeaker(null)}
      title="Keynote announcement coming soon"
      description="Featured speaker biographies and confirmed keynote topics will be published with the official lineup."
    >
      <p className="speaker-modal-copy">
        The summit will bring together 50+ speakers across economic growth,
        innovation and strategic partnerships. Individual speakers have not yet
        been confirmed on this page.
      </p>

      <button
        type="button"
        className="btn-primary"
        onClick={() => setSpeaker(null)}
      >
        Back to speakers
      </button>
    </Modal>
  );
}
