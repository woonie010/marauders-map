'use client';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import Badges from '../Common/Badge';
import { ActivityListProps } from '@/types/activity';

export const ExpandableActivityCard: React.FC<ActivityListProps> = (props) => {
  const { activities_list } = props;
  const [active, setActive] = useState<(typeof activities_list)[number] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  const generateColor = (value: string): 'blue' | 'green' | 'purple' | 'red' | 'yellow' => {
    switch (value) {
      case 'Open':
        return 'green';
      case 'Close':
        return 'red';
      default:
        return 'blue';
    }
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[50%] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <div className="p-5">
                <div className="flex justify-between items-start p-4">
                  <div className="text-xl">
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-extrabold text-3xl text-customBlue_500 dark:text-customBlue_300"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-customBlue dark:text-customBlue_100"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <Badges colorTheme={generateColor(active.status)} context={active.status} />
                </div>
                <div className="pt-8 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-md md:text-sm lg:text-lg h-40 md:h-fit pb-3 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === 'function' ? <p>{active.content}</p> : <p>{active.content}</p>}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      {/* This part is the part of every element */}
      <ul className="w-full mx-auto gap-4">
        {activities_list?.length > 0 &&
          activities_list.map((card, index) => (
            <motion.div
              layoutId={`card-${card.name}-${id}`}
              key={`card-${card.name}-${id}`}
              onClick={() => setActive(card)}
              className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-customBlue_300 dark:hover:bg-customBlue_500  rounded-xl cursor-pointer"
            >
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="">
                  <motion.h3
                    layoutId={`title-${card.name}-${id}`}
                    className="font-bold text-2xl text-neutral-800 dark:text-customBlue_100 text-center md:text-left"
                  >
                    {card.name}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="pt-2 text-neutral-600 dark:text-stone-300 text-center md:text-left"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
              <Badges colorTheme={generateColor(card.status)} context={card.status} />
            </motion.div>
          ))}
      </ul>
    </>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
