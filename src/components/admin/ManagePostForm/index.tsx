'use client';

import { Button } from '@/components/Button';
import { ImageUploader } from '@/components/ImageUploader';
import { InputCheckBox } from '@/components/InputCheckBox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { useState } from 'react';

export function ManagePostForm() {
  const [contentValue, setContentValue] = useState('Este é **um** exemplo.');
  return (
    <form action='' className='mb-16'>
      <div className='flex flex-col gap-6'>
        <ImageUploader />

        <InputText labelText='Nome' placeholder='Digite seu nome' />
        <InputText labelText='Sobrenome' placeholder='Digite seu sobrenome' />

        <InputCheckBox labelText='Sobrenome' />

        <InputText
          disabled
          labelText='Sobrenome'
          placeholder='Digite seu sobrenome'
          defaultValue={'Olá mundo!'}
        />

        <MarkdownEditor
          labelText='Conteúdo'
          disabled={false}
          textAreaName='content'
          value={contentValue}
          setValue={setContentValue}
        />

        <InputText
          disabled
          labelText='Sobrenome'
          placeholder='Digite seu sobrenome'
        />
        <InputText
          labelText='Sobrenome'
          placeholder='Digite seu sobrenome'
          readOnly
        />
        <div className='mt-4'>
          <Button type='submit'>Enviar</Button>
        </div>
      </div>
    </form>
  );
}
