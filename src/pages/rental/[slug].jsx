import RentalPage from '@/components/rental/components';
import { getRentalItem } from '@/components/rental/data/equipmentData';
import { SITE_NAME, truncate } from '@/common/SEOTags/seo';

export default function RentalItem({ slug }) {
  return <RentalPage initialSlug={slug} />;
}

export async function getServerSideProps({ params }) {
  const item = getRentalItem(params.slug);
  if (!item) return { notFound: true };

  return {
    props: {
      slug: item.slug,
      seo: {
        title: `${item.title} Rental | ${SITE_NAME}`,
        description: truncate(`Rent a ${item.title.toLowerCase()} across India. ${item.description.split('\n\n')[0]}`),
        image: item.image,
        path: `/rental/${item.slug}`,
      },
    },
  };
}
