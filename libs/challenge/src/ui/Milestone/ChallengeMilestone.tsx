import { Disclosure, Transition } from '@headlessui/react';
import {
  ChevronUpIcon,
  CalendarIcon,
  ArrowRightIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import styles from './ChallengeMilestone.module.scss';
import { Milestone } from '../../typings';

/* eslint-disable-next-line */
export interface ChallengeMilestoneProps {
  milestone: Milestone;
}

export function ChallengeMilestone({ milestone }: ChallengeMilestoneProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <div
          className={`hover:bg-base-100 flex overflow-hidden rounded-lg shadow-sm duration-300 ease-in ${
            open ? 'bg-base-100' : ''
          }`}
          data-testid="milestone"
        >
          <div
            className="bg-secondary shrink-0 basis-40 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${milestone.image})` }}
            data-testid="milestone-image"
          ></div>
          <div className={`flex basis-full flex-wrap gap-4 p-4`}>
            <Disclosure.Button
              className="flex basis-full items-center gap-4"
              data-testid="milestone-collapsible-button"
            >
              <h3 className="text-xl font-medium" data-testid="milestone-title">
                {milestone.title}
              </h3>
              <ChevronUpIcon
                className={`ml-auto mr-4 h-8 w-8 transform duration-100 ease-in ${
                  open ? '' : 'rotate-180'
                }`}
              />
            </Disclosure.Button>
            <Transition
              show={open}
              enter="transition duration-1000 ease-out"
              enterFrom="transform opacity-0"
              enterTo="transform opacity-100"
              leave="transition duration-100 ease-out"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0"
            >
              <Disclosure.Panel className="text-neutral flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="badge badge-outline p-3"
                    data-testid="milestone-date-start"
                  >
                    <CalendarIcon className={`mr-2 h-4 w-4`} />
                    {formatDate(milestone.date?.start?.time)}
                  </span>
                  {milestone.date?.end?.time && (
                    <>
                      <ArrowRightIcon className={`h-4 w-4`} />
                      <span
                        className="badge badge-outline p-3"
                        data-testid="milestone-date-end"
                      >
                        <CalendarIcon className={`mr-2 h-4 w-4`} />
                        {formatDate(milestone.date?.end?.time)}
                      </span>
                    </>
                  )}
                </div>
                {milestone.location.url && (
                  <a
                    href={milestone.location?.url}
                    target="_blank"
                    rel="noreferrer"
                    data-testid="milestone-location"
                  >
                    <span className="btn btn-primary btn-xs rounded-full lowercase">
                      <MapPinIcon className="mr-2 h-4 w-4" />
                      <p className="line-clamp-1 basis-5/6">
                        {milestone.location?.url}
                      </p>
                    </span>
                  </a>
                )}
                <p className="text-base" data-testid="milestone-description">
                  {milestone?.description}
                </p>
              </Disclosure.Panel>
            </Transition>
          </div>
        </div>
      )}
    </Disclosure>
  );
}

export default ChallengeMilestone;

const formatDate = (date?: number): string => {
  if (!date) return '';

  const dateObj = new Date(date);

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
