const ft_list = document.getElementById("ft_list");

const COOKIE_EXPIRE = "Thu, 01 Jan 2026 00:00:00 UTC";

const deleteCookie = (key) => {
  document.cookie = `${key}=; expires=${COOKIE_EXPIRE};`;
};

const makeNode = (txt, key) => {
  const node = document.createElement("div");
  node.textContent = txt;
  node.onclick = () => {
    const check = confirm("delete?");
    if (check) {
      node.remove();
      deleteCookie(key);
    }
  };
  return node;
};

const create = () => {
  const txt = prompt("WHAT IS YOUR TODO?:");
  if (!txt) return;
  const name = String(new Date().getTime());
  document.cookie = `${name}=${txt}`;
  ft_list.prepend(makeNode(txt, name));
};

(document.cookie || "")
  .split(";")
  .map((s) => s.trim())
  .filter(Boolean)
  .forEach((kv) => {
    const [key, ...rest] = kv.split("=");
    const value = rest.join("=");
    ft_list.prepend(makeNode(value, key));
  });