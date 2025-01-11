import React from 'react';
import Image from "next/image";
import {Popover, PopoverContent, PopoverTrigger} from '@radix-ui/react-popover';
import calendarIcon from "@/app/calendar.svg";
import githubIcon from "@/app/github.svg";
import notificationOnIcon from "@/app/notifications_active.svg";
import notificationOffIcon from "@/app/notifications_off.svg";
import lightModeIcon from "@/app/light_mode.svg";
import darkModeIcon from "@/app/dark_mode.svg";

interface ControlPanelProps {
  targetDate: string;
  themeMode: 'light' | 'dark';
  notificationPermission: string | null;
  handleDateTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleTheme: () => void;
  handleNotificationToggle: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
                                                     targetDate,
                                                     themeMode,
                                                     notificationPermission,
                                                     handleDateTimeChange,
                                                     toggleTheme,
                                                     handleNotificationToggle,
                                                   }) => {
  return (
    <div className="fixed bottom-5 left-5 flex flex-col space-y-2">
      <a className="rounded-full bg-black p-3 hover:bg-gray-900 transition-colors select-none" target="_blank"
         href="https://github.com/DemwE/TimeTarget">
        <Image src={githubIcon} alt="github"/>
      </a>
      <button
        className="rounded-full bg-black p-3 hover:bg-gray-900 transition-colors select-none"
        onClick={toggleTheme}
      >
        <Image
          src={themeMode === 'light' ? lightModeIcon : darkModeIcon}
          alt="theme mode"
        />
      </button>
      <button
        className="rounded-full bg-black p-3 hover:bg-gray-900 transition-colors select-none"
        onClick={handleNotificationToggle}
      >
        <Image
          src={notificationPermission === 'granted' ? notificationOnIcon : notificationOffIcon}
          alt="notification"
        />
      </button>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <button className="rounded-full bg-black p-3 hover:bg-gray-900 transition-colors select-none">
              <Image src={calendarIcon} alt="calendar"/>
            </button>
          </PopoverTrigger>
          <PopoverContent side="right" className="ml-2">
            <input
              type="datetime-local"
              value={targetDate}
              onChange={handleDateTimeChange}
              className="p-2 border border-black rounded dark:bg-gray-700"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ControlPanel;