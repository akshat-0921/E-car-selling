import { useState, useCallback } from "react"

export const useForm = (initialState, validate) => {
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})

    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target
        const inputValue = type === "checkbox" ? checked : value

        setValues((prev) => ({
            ...prev,
            [name]: inputValue,
        }))

        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }))
    }, [])

    const handleBlur = useCallback(
        (e) => {
            const { name } = e.target

            setTouched((prev) => ({
                ...prev,
                [name]: true,
            }))

            if (validate) {
                const validationErrors = validate(values)
                setErrors(validationErrors)
            }
        },
        [values, validate],
    )

    const validateForm = useCallback(() => {
        if (validate) {
            const validationErrors = validate(values)
            setErrors(validationErrors)
            return Object.keys(validationErrors).length === 0
        }
        return true
    }, [values, validate])

    const resetForm = useCallback(() => {
        setValues(initialState)
        setErrors({})
        setTouched({})
    }, [initialState])

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        validateForm,
        resetForm,
        setValues,
    }
}
