"use client";

import dynamic from "next/dynamic";

/*
  تأثيرات الحركة ليست جزءاً من محتوى الصفحة أو بياناتها. تحميلها المتأخر
  يحمي تصدير HTML الثابت ويمنع تحميل مكتبة AOS قبل أن يصبح المتصفح جاهزاً.
*/
const AOSWrapper = dynamic(() => import("./AOSWrapper"), { ssr: false });

export default function ClientVisualEffects() {
  return <AOSWrapper />;
}
