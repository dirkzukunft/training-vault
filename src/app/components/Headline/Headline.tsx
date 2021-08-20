import React from 'react';
import styles from './Headline.module.css';

type HeadlineProps = {
  level?: string;
  children: React.ReactNode;
};

export default function Headline({
  level = '1',
  children,
}: HeadlineProps): JSX.Element {
  const headlineLevel = level in ['1', '2', '3', '4', '5', '6'] ? level : '1';
  const CustomHeadline = `h${headlineLevel}` as keyof JSX.IntrinsicElements;
  return (
    <CustomHeadline className={styles[`h${headlineLevel}`]}>
      {children}
    </CustomHeadline>
  );
}
