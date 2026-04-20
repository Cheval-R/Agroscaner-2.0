import React, { type ReactNode } from 'react';
import ss from './Panel.module.scss';
interface Props {
  children: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
}

const Panel: React.FC<Props> = ({ children, eyebrow, title, description }) => {
  return (
    <div className={`${ss.panel} ${ss.formPanel}`}>
      <div className={ss.panelHeader}>
        <span className={ss.eyebrow}>{eyebrow}</span>
        <h2 className={ss.title}>{title}</h2>
        <p className={ss.description}>{description}</p>
      </div>
      {children}
    </div>
  );
};

export default Panel;
