'use client';

import { IKImage } from 'imagekitio-next';
import React from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { getInitials } from '@/lib/utils';
import Image from 'next/image';
import config from '@/lib/config';

export default function ProfileCard({
  fullName,
  email,
  universityId,
  universityCard,
  status,
}: Readonly<Omit<User, 'id'>>) {
  return (
    <div className="gradient-blue relative rounded-2xl p-10 shadow-[0_0_70px_rgba(0,0,0,0.4)]">
      <div className="mb-6 p-8">
        <div className="absolute -top-4 left-1/2 h-[88px] w-14 -translate-x-1/2 rounded-b-full bg-dark-700">
          <div className="absolute inset-2 h-2 w-10 translate-y-14 rounded-full bg-dark-800" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 lg:items-start lg:justify-normal">
        {/* Add profile image here */}
        <Avatar className="h-16 w-16 outline outline-[10px] outline-dark-600/20 lg:h-20 lg:w-20">
          <AvatarFallback className="bg-cyan-400 text-2xl font-semibold lg:text-3xl">
            {getInitials(fullName ?? 'IN')}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            {status === 'APPROVED' ? (
              <Image
                src={'/icons/verified.svg'}
                width={20}
                height={20}
                alt="verified account"
              />
            ) : (
              <Image
                src={'/icons/warning.svg'}
                width={20}
                height={20}
                alt="not verified account"
              />
            )}
            <p
              className={`${status === 'APPROVED' ? 'text-light-100' : 'text-red-800'} text-sm`}
            >
              {status === 'APPROVED'
                ? 'Verified Account'
                : 'Not Verified Account'}
            </p>
          </div>
          <h1 className="text-xl font-semibold text-white lg:text-2xl">
            {fullName}
          </h1>
          <p className="text-base text-light-100">{email}</p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="">
          <p className="text-light-100">University</p>
          <p className="text-xl font-semibold uppercase text-white">
            Cité Collégiale
          </p>
        </div>
        <div className="mt-4">
          <p className="text-light-100">StudentID</p>
          <p className="text-xl font-semibold text-white">{universityId}</p>
        </div>
      </div>

      <div className="mt-8">
        <IKImage
          path={universityCard}
          urlEndpoint={config.env.imageKit.urlEndpoint}
          width={486}
          height={287}
          className="rounded-md"
          alt={'university card'}
          loading={'eager'}
          // lqip={{ active: true }}
        />
      </div>
    </div>
  );
}
