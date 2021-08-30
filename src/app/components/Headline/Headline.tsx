import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';
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
      <Link to="/">{children}</Link>
      <div className={styles.links}>
        <Link to="/search">
          <Icon icon="mdi-light:magnify" inline={true} />
        </Link>
        <Link to="/add">
          <Icon icon="mdi-light:plus" inline={true} />
        </Link>
      </div>
    </CustomHeadline>
  );
}
