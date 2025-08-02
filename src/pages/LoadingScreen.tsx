import { LoadingSpinner } from "@/components/loading-spinner"

const LoadingScreen = () => {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <LoadingSpinner size="lg" />
            </div>
        </div>
    )
}

export default LoadingScreen