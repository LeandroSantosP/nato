export function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") {
    return null; // Return null or handle appropriately for server-side rendering
  }
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name: string) {
  if (typeof document === "undefined") {
    return null; // Return null or handle appropriately for server-side rendering
  }
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
