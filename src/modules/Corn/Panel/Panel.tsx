import React, { forwardRef, type ReactNode, type Ref } from 'react';
import ss from './Panel.module.scss';
interface Props {
  children?: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  isError?: boolean;
  ref?: Ref<HTMLDivElement>;
}

const Panel: React.FC<Props> = forwardRef(({ children, eyebrow, title, description, isError = false }, ref) => {
  return (
    <div
      ref={ref}
      className={`${ss.panel} ${ss.formPanel} ${isError ? ss.panelError : ''}`}
    >
      <div className={ss.panelHeader}>
        <span className={ss.eyebrow}>{eyebrow}</span>
        <h2 className={ss.title}>{title}</h2>
        <p className={ss.description}>{description}</p>
      </div>
      {children}
    </div>
  );
});

export default Panel;
