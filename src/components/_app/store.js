import {
    createWithStore,
    profileStore,
} from '@/common/store';

export default createWithStore(
    {
        profile: profileStore,
    },
    { storeKey: '__SPEEDCASINO_APP_STORE__' },
);