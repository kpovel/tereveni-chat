export default function ConfirmationDeleting() {
    return (
        <div>
            <h4 className="mb-3 text-[#050404] text-base font-semibold">Are you sure you want to permanently delete this chat?</h4>
            <p className="text-[#050404] text-xs font-normal">The chat will be deleted for you only</p>
            <div className="flex w-full justify-end mt-6">
                <button>yes</button>
                <button>no</button>
            </div>
        </div>
    )
}