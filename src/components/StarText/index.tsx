import React, { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '~/public/icons';

const StarText = ({ text }: { text: string }) => {
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className='flex flex-row items-center gap-4 '>
      <span className={isHidden ? 'text-lg' : ''}> {isHidden ? '*'.repeat(text.length) : text}</span>
      <span onClick={toggleVisibility} className='dark:text-white transition-all text-slate-900 hover-text-aastar-700 hover:cursor-pointer size-4 ml-2'>
        {isHidden ?
          <ViewIcon /> : <ViewOffIcon />}
      </span>

    </div>
  );
};

export default StarText;
