import { useState } from 'react';
import { EmailEntity } from '../atoms/Settings/EmailEntity';
import { LocationEntity } from '../atoms/Settings/LocationEntity';
import { NameEntity } from '../atoms/Settings/NameEntity';
import { WordEntity } from '../atoms/Settings/WordEntity';
import { StreetEntity } from '../atoms/Settings/StreetEntity';
import { PageWrapper } from '../layout';

const ALL_TABS = ['Words', 'Names', 'Emails', 'Locations', 'Streets'];
const SettingTab = ({ selectedTab }: { selectedTab: string }) => {
  if (selectedTab === 'Words') {
    return <WordEntity />;
  }
  else if (selectedTab === 'Names') {
    return <NameEntity />
  }
  else if (selectedTab === 'Emails') {
    return <EmailEntity />
  }
  else if (selectedTab === 'Locations') {
    return <LocationEntity />
  } else {
    return <StreetEntity />
  }
}

const getTabClass = (isCurrentTab: boolean) => {
  if (isCurrentTab) {
    return "bg-sky-500 active dark:bg-sky-500";
  } else {
    return "dark:bg-gray-800 dark:hover:bg-gray-700";
  }
}

const SettingsPage = () => {
  const [currentTab, setCurrentTab] = useState(ALL_TABS[0]);

  return (
    <PageWrapper>
      <h1 className="mb-4 text-6xl">Settings</h1>
      <div className="flex">
        <div className="md:flex">
          <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
            {ALL_TABS.map(tab => {
              return (<li key={tab} className="me-2 cursor-pointer" onClick={() => setCurrentTab(tab)}>
                <span className={"inline-flex items-center px-4 py-3 w-full rounded-lg text-white " + getTabClass(currentTab === tab)}>
                  {tab}
                </span>
              </li>)
            })
            }
          </ul>
        </div>
        <SettingTab selectedTab={currentTab} />
      </div>
    </PageWrapper>
  );
};

export { SettingsPage };
