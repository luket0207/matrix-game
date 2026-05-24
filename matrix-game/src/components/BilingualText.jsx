function BilingualText({ className = '', english, japanese }) {
  const bilingualClassName = ['bilingual-text', className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={bilingualClassName}>
      <span className="bilingual-text__english">{english}</span>
      <span className="bilingual-text__japanese">{japanese}</span>
    </span>
  );
}

export default BilingualText;
