'use client';

import ErrorMessage from '@/components/ErrorMessage';
import { useEffect } from 'react';

type RootErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function RootErrorPage({ error }: RootErrorPageProps) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <ErrorMessage
      pageTitle='Internal server error'
      contentTitle='501'
      content={
        <>
          <p>
            Ocorreu um erro do qual a aplicação não conseguiu se recuperar.
            Tente novamente mais tarde.
          </p>
        </>
      }
    />
  );
}
