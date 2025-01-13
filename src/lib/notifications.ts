export const toggleNotificationPermission = (currentPermission: string | null, setPermission: (permission: string) => void) => {
  if (!('Notification' in window)) {
    console.error('This browser does not support notifications.');
    return;
  }

  if (currentPermission === 'granted') {
    setPermission('default');
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        setPermission(permission);
      } else {
        setPermission('default');
      }
    });
  }
};