interface ErrorMessageProps {
  message?: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p
      className={`text-sm text-red-500 h-5 ${
        message ? "visible" : "invisible"
      }`}
    >
      {message}
    </p>
  )
}
