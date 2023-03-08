export const getRandomId = () => Math.random().toString(36).substr(2, 9);
export const isValidKey = (key: string) => key.startsWith("sk-") && key.length > 30;
