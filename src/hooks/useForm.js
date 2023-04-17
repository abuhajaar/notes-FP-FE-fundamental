import React from 'react';

export function useForm(defaultValue) {
    const [value, setValue] = React.useState(defaultValue);
    const handleValueChange = (e) => setValue({ ...value, [e.target.ClassName]: e.target.value });
    return [value, handleValueChange];
}
