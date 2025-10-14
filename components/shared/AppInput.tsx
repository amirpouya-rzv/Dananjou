import { ComponentProps } from "react"

function AppInput({ title, id, className, ...rest }: ComponentProps<'input'> & { title: string, id?: string }) {
    return (
        <div className="mb-5">
            <label
                htmlFor="password"
                className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${className}`}>
                {title}
            </label>
            <input
                type="text"
                id={id}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className}`} placeholder='description'
                {...rest}
                required
            />

        </div>
    )
}

export default AppInput