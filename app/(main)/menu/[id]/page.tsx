/* ============================== صفحة المنيو العامة — نقطة الدخول ==============================
   id هنا هو businessId (UUID) للمحل — MenuClient يجلب المنيو الحقيقي
   ============================================================================ */
import MenuClient from "./MenuClient";

export default async function MenuPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MenuClient id={id} />;
}

export async function generateStaticParams() {
  return [{ id: "default" }];
}
