import { EmailEntity } from '../atoms/StorageData/EmailEntity';
import { LocationEntity } from '../atoms/StorageData/LocationEntity';
import { NameEntity } from '../atoms/StorageData/NameEntity';
import { RandomEntity } from '../atoms/StorageData/RandomEntity';
import { StreetEntity } from '../atoms/StorageData/StreetEntity';
import { PageWrapper } from '../layout';

const RandomContentPage = () => {
  return (
    <PageWrapper>
      <h1 className="mb-4 text-6xl">Random Content Page</h1>
      <EmailEntity />
      <LocationEntity />
      <NameEntity />
      <RandomEntity />
      <StreetEntity />
    </PageWrapper>
  );
};

export { RandomContentPage };
