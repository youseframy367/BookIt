import EditInventory from "@/app/components/Dashborad/Inventory/EditInventory";

export default function UpdateModerators({ id }: { id: string }) {
    const isShowData = true;

    return (
        <EditInventory isShowData={isShowData} />
    )
}