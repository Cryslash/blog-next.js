'use client';

import { Button } from '@/components/Button';
import { ImageUploader } from '@/components/ImageUploader';
import { InputCheckBox } from '@/components/InputCheckBox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { PublicPost } from '@/dto/post/dto';
import { useState } from 'react';

type ManagePostFormProps = {
  publicPost?: PublicPost;
};

export function ManagePostForm({ publicPost }: ManagePostFormProps) {
  const [contentValue, setContentValue] = useState(publicPost?.content || '');

  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          type='text'
          placeholder='ID gerado automaticamente'
          defaultValue={publicPost?.id || ''}
          readOnly
        />

        <InputText
          labelText='SLUG'
          name='slug'
          type='text'
          placeholder='Slug gerada automaticamente'
          defaultValue={publicPost?.slug || ''}
          readOnly
        />

        <InputText
          labelText='Autor'
          name='author'
          type='Digite o nome do autor'
          placeholder='Digite o título'
          defaultValue={publicPost?.author || ''}
        />

        <InputText
          labelText='Título'
          name='title'
          type='text'
          placeholder='Digite o título'
          defaultValue={publicPost?.title || ''}
        />

        <InputText
          labelText='Excerto'
          name='excerpt'
          type='text'
          placeholder='Digite o resumo'
          defaultValue={publicPost?.excerpt || ''}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={false}
        />

        <ImageUploader />

        <InputText
          labelText='URL da imagem de capa'
          name='coverImageUrl'
          type='text'
          placeholder='Digite a url da imagem'
          defaultValue={publicPost?.coverImageUrl || ''}
        />

        <InputCheckBox
          labelText='Publicar?'
          name='published'
          type='checkbox'
          defaultChecked={publicPost?.published || false}
        />

        <div className='mt-4'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
