export function calculateTimeRemaining(timeDiff: number) {
  return {
    days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
  };
}

export function initializeTargetDate(setTargetDate: (date: string) => void, setThemeMode: (mode: 'light' | 'dark') => void) {
  const savedDate = localStorage.getItem('targetDate');
  if (savedDate) {
    setTargetDate(savedDate);
  }
  const savedTheme = localStorage.getItem('themeMode');
  if (savedTheme) {
    setThemeMode(savedTheme as 'light' | 'dark');
  }
}

export function updateThemeMode(themeMode: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', themeMode === 'dark');
  localStorage.setItem('themeMode', themeMode);
}

export function updateTimer(
  targetDate: string,
  notificationSent: boolean,
  notificationPermission: string | null,
  setTimeRemaining: (time: { days: number; hours: number; minutes: number; seconds: number }) => void,
  sendNotification: () => void
) {
  if (!targetDate) return;

  localStorage.setItem('targetDate', targetDate);

  const currentDate = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const timeDiff = target - currentDate;

  if (timeDiff <= 0) {
    if (!notificationSent && notificationPermission === 'granted') {
      sendNotification();
    }
    setTimeRemaining({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  } else {
    setTimeRemaining(calculateTimeRemaining(timeDiff));
  }
}

export function startCountdown(
  targetDate: string,
  notificationSent: boolean,
  notificationPermission: string | null,
  setTimeRemaining: (time: { days: number; hours: number; minutes: number; seconds: number }) => void,
  sendNotification: () => void
) {
  const update = () => updateTimer(targetDate, notificationSent, notificationPermission, setTimeRemaining, sendNotification);
  update();
  return setInterval(update, 1000);
}