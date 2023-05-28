import React, { useState } from 'react';

const Modal = ({ title, content, imageURL, closeModal }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const renderParagraph = (text) => {
    if (!text) return null;
    const words = text.split(' ');

    if (expanded || words.length <= 100) {
      return text;
    }

    const visibleWords = words.slice(0, 100).join(' ');

    return (
      <>
        {visibleWords}...
        <span className="see-more" onClick={toggleExpand} style={{ color: 'grey', cursor: 'pointer' }}>
          See more
        </span>
      </>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxHeight: '600px', overflowY: 'auto', maxWidth: '800px' }}>
        <h2>{title}</h2>
        <hr />
        <img src={imageURL} alt="arctic" width="400px" />
        <hr />
        <p>{renderParagraph(content)}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
