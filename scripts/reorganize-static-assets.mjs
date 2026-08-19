import { existsSync, mkdirSync, readdirSync, renameSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

/**
 * ترحيل منظّم لأصول BookIt الثابتة.
 * لا يغيّر محتوى الصور أو ضغطها؛ ينقل الملفات ويستبدل المسارات الحرفية فقط.
 */
const root = process.cwd();
const renameMap = {
  '/assets/images/placeholder-restaurant.png': '/media/shared/placeholders/restaurant.png',
  '/assets/videos/about.mp4': '/media/platform/about/overview-video.mp4',
  '/assets/videos/error.mp4': '/media/platform/system/not-found-video.mp4',
  '/assets/webp/bg.webp': '/media/platform/landing/hero-background.webp',
  '/assets/webp/about.webp': '/media/platform/about/about-hero.webp',
  '/assets/webp/healthy.webp': '/media/platform/about/healthy-food-card.webp',
  '/assets/webp/little-infromation.webp': '/media/platform/about/business-info-illustration.webp',
  '/assets/webp/hero-menu.webp': '/media/platform/menu/menu-hero.webp',
  '/assets/webp/customer-content.webp': '/media/platform/customer/customer-content-illustration.webp',
  '/assets/webp/liked-restaurants.webp': '/media/platform/customer/favorite-restaurants-illustration.webp',
  '/assets/webp/popular-dishes.webp': '/media/platform/menu/popular-dishes-illustration.webp',
  '/assets/webp/faq.webp': '/media/platform/support/faq-hero.webp',
  '/assets/webp/face-wallet.webp': '/media/platform/payments/wallet-face-illustration.webp',
  '/assets/webp/wallet-numbers.webp': '/media/platform/payments/wallet-numbers-illustration.webp',
  '/assets/webp/paper.webp': '/media/platform/success/success-paper-illustration.webp',
  '/assets/webp/bg-login.webp': '/media/platform/auth/login-background.webp',
  '/assets/webp/bg-new-password.webp': '/media/platform/auth/new-password-background.webp',
  '/assets/webp/bg-otp.webp': '/media/platform/auth/otp-background.webp',
  '/assets/webp/bg-otp-mobile.webp': '/media/platform/auth/mobile-otp-background.webp',
  '/assets/webp/select.webp': '/media/platform/auth/password-reset-illustration.webp',
  '/assets/webp/Pizza.webp': '/media/platform/menu/legacy-pizza.webp',
  '/assets/webp/categorie.webp': '/media/platform/menu/legacy-category.webp',
  '/assets/webp/egg-salad.webp': '/media/platform/menu/legacy-egg-salad.webp',
  '/assets/webp/fattoush-salad.webp': '/media/platform/menu/legacy-fattoush-salad.webp',
  '/assets/webp/gallery-3.webp': '/media/platform/gallery/legacy-gallery-item.webp',
  '/assets/webp/product-2.webp': '/media/platform/menu/legacy-product-02.webp',
  '/assets/webp/product-3.webp': '/media/platform/menu/legacy-product-03.webp',
  '/assets/webp/product-4.webp': '/media/platform/menu/legacy-product-04.webp',
  '/assets/webp/product-5.webp': '/media/platform/menu/legacy-product-05.webp',
  '/assets/webp/product-7.webp': '/media/platform/menu/legacy-product-07.webp',
  '/assets/webp/vegetable-salad.webp': '/media/platform/menu/legacy-vegetable-salad.webp',
  '/assets/webp/video.webp': '/media/platform/media/legacy-video-cover.webp',
  '/assets/webp/bg_otp.webp': '/media/platform/auth/legacy-otp-background.webp',
  '/img/77777.svg': '/media/dashboard/navigation/reservations-white.svg',
  '/img/;;.svg': '/media/shared/ui/close.svg',
  '/img/;lhjn;jh.svg': '/media/shared/ui/arrow-forward.svg',
  '/img/Calendar.svg': '/media/dashboard/reservations/calendar.svg',
  '/img/ChatCircleDots.svg': '/media/shared/chat/message.svg',
  '/img/ChevronDown.svg': '/media/shared/ui/chevron-down.svg',
  '/img/Ellipse 3255.svg': '/media/dashboard/branding/avatar-badge.svg',
  '/img/FAxacBciPwmGGziG44usNqMrhpSsBJqVGg6QXn0Q 1.png': '/media/dashboard/branding/obayah-logo.png',
  '/img/Frame 1261153571.svg': '/media/dashboard/actions/delete.svg',
  '/img/Frame 1686551849.svg': '/media/dashboard/overview/checklist.svg',
  '/img/Frame 1686553822.svg': '/media/dashboard/reservations/search-document.svg',
  '/img/Frame 1686553878.svg': '/media/dashboard/overview/filter.svg',
  '/img/Frame 1686554170.svg': '/media/dashboard/overview/filter-active.svg',
  '/img/Frame 322.svg': '/media/dashboard/payments/card.svg',
  '/img/Group 1171275955.svg': '/media/dashboard/reservations/calendar-grid.svg',
  '/img/MagnifyingGlass.svg': '/media/shared/ui/search.svg',
  '/img/UploadSimple.svg': '/media/shared/ui/upload-white.svg',
  '/img/Vector-10888.svg': '/media/dashboard/reports/analytics.svg',
  '/img/Vector-145455.svg': '/media/dashboard/reports/analytics-white.svg',
  '/img/Vector.svg': '/media/shared/ui/arrow-back.svg',
  '/img/X.svg': '/media/shared/ui/close-muted.svg',
  '/img/category-2.svg': '/media/dashboard/overview/grid.svg',
  '/img/clock 2.svg': '/media/shared/ui/clock.svg',
  '/img/e6b08986e699dd21b87627e3b0a86a309ee36f03.png': '/media/dashboard/branding/cloud-boutique-logo.png',
  '/img/ewerwft.svg': '/media/dashboard/reports/trend-up.svg',
  '/img/ewewewew.svg': '/media/shared/ui/chevron-up.svg',
  '/img/fa0e294148503329ed0f8eb7448b70d301751871.jpg': '/media/dashboard/profile/member-portrait.jpg',
  '/img/ffdrffd.svg': '/media/dashboard/reservations/search-document-white.svg',
  '/img/fgtfddg.svg': '/media/dashboard/reservations/calendar-active.svg',
  '/img/gfgf.svg': '/media/dashboard/reports/trend-down.svg',
  '/img/gggg.svg': '/media/dashboard/access/access-key.svg',
  '/img/gtfg.svg': '/media/dashboard/actions/copy.svg',
  '/img/lkhgkjggujk.svg': '/media/dashboard/profile/owner-portrait.svg',
  '/img/ll;.svg': '/media/shared/ui/placeholder.svg',
  '/img/mhzon.svg': '/media/dashboard/inventory/cart.svg',
  '/img/mhzonActive.svg': '/media/dashboard/inventory/cart-white.svg',
  '/img/modetorIcon.svg': '/media/dashboard/team/moderators.svg',
  '/img/modetorIconActiv.svg': '/media/dashboard/team/moderators-white.svg',
  '/img/ollll.svg': '/media/dashboard/profile/user.svg',
  '/img/paper-plane 1.png': '/media/shared/chat/send.png',
  '/img/qwqwwqq.svg': '/media/dashboard/overview/grid-white.svg',
  '/img/rerreer.svg': '/media/dashboard/payments/card-active.svg',
  '/img/result 1.png': '/media/dashboard/branding/devmaster-logo.png',
  '/img/trackkkk 1.svg': '/media/dashboard/reservations/search-document.svg',
  '/img/trrruyeryer.svg': '/media/shared/ui/image-placeholder.svg',
  '/img/اغهخا.svg': '/media/dashboard/notifications/subscription.svg',
  '/img/msg.svg': '/media/shared/chat/message.svg',
  '/img/profile.jpg': '/media/dashboard/profile/member-portrait.jpg',
  '/img/تعديل.svg': '/media/dashboard/actions/edit.svg',
  '/img/حطتنح.svg': '/media/dashboard/actions/logout.svg',
  '/img/قففففق.png': '/media/dashboard/branding/legacy-mark.png',
  '/img/كمغخخحه.svg': '/media/dashboard/actions/chevron-up.svg',
  '/img/نمالمخهناه.svg': '/media/dashboard/actions/edit-outline.svg',
};

const directoryMoves = [
  ['/assets/icons', '/media/shared/icons'],
];

// تسميات إضافية للأيقونات التي كانت ملفاتها تحمل أسماء غير وصفية.
const sharedIconRenameMap = {
  'carcal.svg': 'order-status-pending.svg',
};

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function moveAsset(oldPath, newPath) {
  const from = join(root, 'public', oldPath.slice(1));
  const to = join(root, 'public', newPath.slice(1));
  if (!existsSync(from)) return;
  mkdirSync(dirname(to), { recursive: true });
  renameSync(from, to);
}

for (const [oldPath, newPath] of Object.entries(renameMap)) moveAsset(oldPath, newPath);
for (const [oldDirectory, newDirectory] of directoryMoves) {
  const sourceDirectory = join(root, 'public', oldDirectory.slice(1));
  const targetDirectory = join(root, 'public', newDirectory.slice(1));
  if (existsSync(sourceDirectory)) {
    mkdirSync(dirname(targetDirectory), { recursive: true });
    renameSync(sourceDirectory, targetDirectory);
  }
}

const sharedIconsDirectory = join(root, 'public', 'media', 'shared', 'icons');
for (const [oldName, newName] of Object.entries(sharedIconRenameMap)) {
  moveAsset(`/media/shared/icons/${oldName}`, `/media/shared/icons/${newName}`);
}

const sourceFiles = ['app', 'components', 'utils']
  .flatMap((directory) => walk(join(root, directory)))
  .filter((file) => /\.(?:[cm]?[jt]sx?)$/.test(file));

for (const sourceFile of sourceFiles) {
  const original = readFileSync(sourceFile, 'utf8');
  let updated = original.replaceAll('/assets/icons/', '/media/shared/icons/');
  for (const [oldPath, newPath] of Object.entries(renameMap)) {
    updated = updated.replaceAll(oldPath, newPath);
  }
  for (const [oldName, newName] of Object.entries(sharedIconRenameMap)) {
    updated = updated.replaceAll(`/media/shared/icons/${oldName}`, `/media/shared/icons/${newName}`);
  }
  if (updated !== original) writeFileSync(sourceFile, updated);
}

console.log(`نُقلت ${Object.keys(renameMap).length} صورة ثابتة ونُظمت أيقونات الواجهة المشتركة.`);
console.log(`تم تحديث المراجع داخل ${sourceFiles.length} ملفاً مصدر.`);
