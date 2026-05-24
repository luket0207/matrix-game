import { QRCodeSVG } from 'qrcode.react';
import BilingualText from './BilingualText.jsx';
import GameButton from './GameButton.jsx';

function QrCodeModal({ onClose, url }) {
  return (
    <div className="qr-modal">
      <div aria-modal="true" className="qr-modal__panel" role="dialog">
        <h2 className="qr-modal__title">
          <BilingualText
            english="Scan to join"
            japanese="参加するにはスキャンしてください"
          />
        </h2>
        <div className="qr-modal__code">
          <QRCodeSVG size={240} value={url} />
        </div>
        <p className="qr-modal__url">{url}</p>
        <div className="qr-modal__actions">
          <GameButton onClick={onClose}>OK</GameButton>
        </div>
      </div>
    </div>
  );
}

export default QrCodeModal;
