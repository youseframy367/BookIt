import EditInventory from "@/app/components/Dashborad/Inventory/EditInventory";

export default function UpdateStartInventory({ id }: { id: string }) {
    const isShowData = false;

    return (
        <EditInventory isShowData={isShowData} />
    )
}