import { useState } from "react";

export function ClearLocalStorage() {
    const [msg, setMsg] = useState('')
    return (
      <div
        style={{ position: 'fixed', bottom: 0, background: 'orange', left: 0, padding: 10}}
        onClick={() => {
            window.localStorage.clear();
            setMsg('! Cleared !')
            setTimeout(() => setMsg(''), 3000)
        }}
      >Clear Local Storage {msg}</div>
    );
}