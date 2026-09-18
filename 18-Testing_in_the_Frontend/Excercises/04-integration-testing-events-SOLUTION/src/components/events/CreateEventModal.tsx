import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { useFetcher } from 'react-router';

import { isErrorResult } from '@/types';
import type { CreateActionResult } from '@/types';

export default function CreateEventModal({
  modalRef,
}: {
  modalRef: RefObject<HTMLDialogElement | null>;
}) {
  const fetcher = useFetcher<CreateActionResult>();
  const formRef = useRef<HTMLFormElement | null>(null);

  const cleanUp = () => {
    formRef.current?.reset();
    modalRef.current?.close();
  };

  useEffect(() => {
    if (fetcher.data && 'success' in fetcher.data) {
      formRef.current?.reset();
      modalRef.current?.close();
    }
  }, [fetcher.data, modalRef]);

  return (
    <dialog
      ref={modalRef}
      className='modal'
      onClose={() => {
        formRef.current?.reset();
      }}
    >
      <div className='modal-box w-full max-w-2xl'>
        <h3 className='mb-6 text-xl font-bold lg:text-2xl'>Create New Event</h3>
        {isErrorResult(fetcher.data) && (
          <div className='alert alert-error'>
            <span>{fetcher.data.error}</span>
          </div>
        )}
        <fetcher.Form method='post' action='/app' className='space-y-6' ref={formRef}>
          <div className='grid gap-1'>
            <label className='label' htmlFor='title'>
              <span className='text-sm'>Event Title</span>
            </label>
            <input
              id='title'
              name='title'
              type='text'
              placeholder='Summer Gala 2025'
              className='input w-full'
            />
          </div>
          <div className='grid gap-1'>
            <label className='label' htmlFor='description'>
              <span className='text-sm'>Description</span>
            </label>
            <textarea
              id='description'
              name='description'
              placeholder="Give attendees a taste of what's coming…"
              className='textarea h-28 w-full resize-none'
            />
          </div>
          <div className='grid gap-1'>
            <label className='label' htmlFor='date'>
              <span className='text-sm'>Date & Time</span>
            </label>
            <input id='date' name='date' type='datetime-local' className='input w-full' />
          </div>
          <div className='grid gap-1'>
            <label className='label' htmlFor='location'>
              <span className='text-sm'>Location</span>
            </label>
            <input
              id='location'
              name='location'
              type='text'
              placeholder='Berlin Congress Center'
              className='input w-full'
            />
          </div>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div className='grid gap-1'>
              <label className='label' htmlFor='latitude'>
                <span className='text-sm'>Latitude</span>
              </label>
              <input
                id='latitude'
                name='latitude'
                type='number'
                step='any'
                placeholder='52.5200'
                className='input w-full'
              />
            </div>
            <div className='grid gap-1'>
              <label className='label' htmlFor='longitude'>
                <span className='text-sm'>Longitude</span>
              </label>
              <input
                id='longitude'
                name='longitude'
                type='number'
                step='any'
                placeholder='13.4050'
                className='input w-full'
              />
            </div>
          </div>
          <div className='modal-action mt-8'>
            <button type='button' className='btn btn-ghost' onClick={cleanUp}>
              Cancel
            </button>
            <button type='submit' className='btn btn-primary' disabled={fetcher.state !== 'idle'}>
              Create Event
            </button>
          </div>
        </fetcher.Form>
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button aria-label='Close modal'>close</button>
      </form>
    </dialog>
  );
}
