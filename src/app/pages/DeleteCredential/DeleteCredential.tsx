import React from 'react';
import { useParams } from 'react-router-dom';

export default function DeleteCredential(): JSX.Element {
  const { service } = useParams<{ service: string }>();

  return <>DeleteCredential {service}</>;
}
