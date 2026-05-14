export default function LoadingSpinner() {
    return (
        <>
            <div className="flex justify-center items-center">
                <div className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-orange-50 border-t-transparent"> </div>
            </div>
        </>
    )
}