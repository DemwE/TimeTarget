import React, {useState, useRef, useEffect} from 'react';
import Image from "next/image";
import calendarIcon from "@/images/calendar.svg";
import githubIcon from "@/images/github.svg";
import notificationOnIcon from "@/images/notifications_active.svg";
import notificationOffIcon from "@/images/notifications_off.svg";
import lightModeIcon from "@/images/light_mode.svg";
import darkModeIcon from "@/images/dark_mode.svg";
import settingsIcon from "@/images/settings.svg";
import moreIcon from "@/images/more.svg";

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
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);
  const collapsibleRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  }

  useEffect(() => {
    if (collapsibleRef.current) {
      collapsibleRef.current.style.maxHeight = isCollapsed ? '0' : `${collapsibleRef.current.scrollHeight}px`;
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.style.maxWidth = isCalendarOpen ? '0' : `${calendarRef.current.scrollWidth}px`;
    }
  }, [isCalendarOpen]);

  return (
    <div className="fixed bottom-5 left-5 flex flex-col items-start space-y-2">
      <div className="space-y-2">
        <div ref={collapsibleRef}
             className={`max-h-0 overflow-hidden transition-[max-height] duration-300 ease-in-out ${isCollapsed ? '' : 'max-h-96'} flex flex-col space-y-2 bg-gray-600 dark:bg-gray-950/60 rounded-full`}>
          <a className="rounded-full bg-black p-3 hover:bg-gray-900 dark:hover:bg-gray-950 transition-colors select-none" target="_blank"
             href="https://github.com/DemwE/TimeTarget">
            <Image src={githubIcon} alt="github"/>
          </a>
          <button
            className="rounded-full bg-black p-3 hover:bg-gray-900 dark:hover:bg-gray-950 transition-colors select-none"
            onClick={toggleTheme}
          >
            <Image
              src={themeMode === 'light' ? lightModeIcon : darkModeIcon}
              alt="theme mode"
            />
          </button>
          <button
            className="rounded-full bg-black p-3 hover:bg-gray-900 dark:hover:bg-gray-950 transition-colors select-none"
            onClick={handleNotificationToggle}
          >
            <Image
              src={notificationPermission === 'granted' ? notificationOnIcon : notificationOffIcon}
              alt="notification"
            />
          </button>
          <a className="rounded-full bg-black p-3 hover:bg-gray-900 dark:hover:bg-gray-950 transition-colors select-none"
             href="/settings">
            <Image src={moreIcon} alt="settings"/>
          </a>
        </div>
        <button
          className="rounded-full bg-black p-3 hover:bg-gray-900 dark:hover:bg-gray-950 transition-colors select-none"
          onClick={toggleCollapse}>
          <Image src={settingsIcon} alt="settings"/>
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button className="rounded-full bg-black p-3 hover:bg-gray-900 dark:hover:bg-gray-950 transition-colors select-none"
                onClick={toggleCalendar}>
          <Image src={calendarIcon} alt="calendar"/>
        </button>
        <div ref={calendarRef}
             className={`max-w-0 overflow-hidden transition-[max-width] duration-300 ease-in-out ${isCalendarOpen ? '' : 'max-w-96'}`}>
          <input
            type="datetime-local"
            value={targetDate}
            onChange={handleDateTimeChange}
            className="p-2 border border-black rounded dark:bg-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;