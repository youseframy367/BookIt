/* ============================== صفحة المنيو العامة — نقطة الدخول ==============================
   id هنا هو businessId (UUID) للمحل — MenuClient يجلب المنيو الحقيقي
   ============================================================================ */
import MenuClient from "./MenuClient";

export default function MenuPage({ params }: { params: { id: string } }) {
  return <MenuClient id={params.id} />;
}

export async function generateStaticParams() {
  return [{ id: "default" }];
}
