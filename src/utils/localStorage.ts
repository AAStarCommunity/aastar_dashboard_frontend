const keyMap: Record<string, string> = {
  login_status: "aastar" + process.env.NODE_ENV + "_0.1_" + "login_status",
};

export const KeyEume: Record<string, string> = {
  LOGINSTATUS: "login_status",
};

const keyMapper = (key: string) => {
  return "aastar" + process.env.NODE_ENV + "_0.1_" + key;
};
export function getLocal(key: string) {
  const data = localStorage.getItem(keyMap[KeyEume[key]] || keyMapper(key));
  try {
    return data ? JSON.parse(data) : "";
  } catch {
    return data;
  }
}
export function setLocal(key: string, value: string | Record<string, unknown>) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(keyMap[KeyEume[key]] || keyMapper(key), value);
}
