import { Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Icon from "../components/Icon";

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <>
            <Icon icon="search" />
            <Input
                {...props}
                minW={570}
                value={value}
                variant="form"
                onChange={(e: any) => setValue(e.target.value)}
            />
        </>
    );
}

export { DebouncedInput };
