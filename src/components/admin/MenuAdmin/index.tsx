'use client';

import { LogoutAction } from '@/actions/login/logout-action';
import clsx from 'clsx';
import {
  CircleXIcon,
  FileTextIcon,
  HourglassIcon,
  HouseIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
  UserRoundIcon,
  UserRoundPenIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

type MenuAdminProps = {
  username: string;
  usertype: string;
};

export function MenuAdmin(props: MenuAdminProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navClasses = clsx(
    'bg-slate-900 text-slate-100 rounded-lg',
    'flex flex-col mb-8',
    'sm:flex-row sm:flex-wrap',
    !isOpen && 'h-10',
    !isOpen && 'overflow-hidden',
    'sm:overflow-visible sm:h-auto',
  );
  const linkClasses = clsx(
    '[&>svg]:w-[16px] [&>svg]:h-[16px] px-4 ',
    'flex items-center justify-start gap-2 cursor-pointer',
    'transition hover:bg-slate-800 rounded-lg',
    'h-10',
    'shrink-0',
  );
  const openCloseBtnClasses = clsx(
    linkClasses,
    'text-blue-200 italic',
    'sm:hidden',
  );

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    startTransition(async () => {
      await LogoutAction();
    });
  }

  return (
    <>
      <nav className={navClasses}>
        <button
          className={openCloseBtnClasses}
          onClick={() => setIsOpen(prev => !prev)}
        >
          {!isOpen && (
            <>
              <MenuIcon />
              Menu
            </>
          )}
          {isOpen && (
            <>
              <CircleXIcon />
              Fechar
            </>
          )}
        </button>
        <a className={linkClasses} href='/' target='_blank'>
          <HouseIcon />
          Home
        </a>

        <Link className={linkClasses} href='/admin/post'>
          <FileTextIcon />
          Posts
        </Link>

        <Link className={linkClasses} href='/admin/post/new'>
          <PlusIcon />
          Criar post
        </Link>

        {props.usertype === 'admin' && (
          <Link className={linkClasses} href='/admin/user'>
            <UserRoundPenIcon />
            Usuários
          </Link>
        )}

        {props.usertype === 'author' && (
          <Link className={linkClasses} href='/admin/user'>
            <UserRoundIcon />
            Usuário
          </Link>
        )}

        <a onClick={handleLogout} href='#' className={linkClasses}>
          {isPending && (
            <>
              <HourglassIcon />
              Aguarde...
            </>
          )}
          {!isPending && (
            <>
              <LogOutIcon />
              Sair
            </>
          )}
        </a>
      </nav>

      <h1 className={'text-2xl mb-4 text-center'}>
        Olá <span className='font-bold'> {props.username}</span>, você é um{' '}
        <span className='font-bold'> {props.usertype}</span>.
      </h1>
    </>
  );
}
