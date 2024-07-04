
export const Button = ({ onClick, children }: { onClick: () => void, children: React.ReactNode }) => {
    return (
        <button className="bg-purple-600 transition-all duration-300  hover:bg-purple-900 text-white font-semibold py-4 px-12 rounded-md tracking-wider text-2xl" onClick={onClick}>
            {children}
        </button>
    )
}