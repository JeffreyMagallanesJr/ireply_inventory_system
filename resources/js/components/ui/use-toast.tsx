import * as ToastPrimitive from "@radix-ui/react-toast";
import { useState } from "react";

export function useToast() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const showToast = (msg: string) => {
        setMessage(msg);
        setOpen(true);
    };

    return {
        open,
        setOpen,
        message,
        showToast,
    };
}
