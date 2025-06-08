import ErrorMessage from '@/components/ErrorMessage';

export default function NotFoundPage() {
  return (
    <ErrorMessage
      pageTitle='404 - Página não encontrada'
      contentTitle='404'
      content='Erro 404 - A página que você está tentando acessar não existe neste site.'
    />
  );
}
