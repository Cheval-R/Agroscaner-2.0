import React from 'react';
import ss from './FallbackUI.module.scss';

interface Props {
  errorTitle: string;
  errorMessage: string;
}

const FallbackUI: React.FC<Props> = ({ errorTitle, errorMessage }) => {
  return (
    <>
      <h2 className={ss.errorTitle}>{errorTitle}</h2>
      <p className={ss.errorMessage}>{errorMessage}</p>
    </>
  );
};

export default FallbackUI;
