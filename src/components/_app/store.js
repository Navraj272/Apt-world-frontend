import {
    createWithStore,
    profileStore,
} from '@/common/store';

export default createWithStore(
    {
        profile: profileStore,
    },
    { storeKey: '__APT_WORLD_APP_STORE__' },
);