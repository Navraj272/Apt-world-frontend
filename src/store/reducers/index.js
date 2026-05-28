import { DefaultCategoryIcons } from '@/assets/png';

// Define the initial state
export const initialState = {
  leftPanel: false,
  rightPanel: false,
  user: null,
  userLoading: false,
  userError: null,
  selectedCoin: 'sc',
  wheelConfig: null,
  spinWheelSound: false,
  spinWheelResult: {
    showResult: false,
    gc: '',
    sc: '',
    index: '',
    bonusActivated: false,
  },
  categoryData: [],
  providerData: [],
  loginSignupDialog: false,
  loginMode: false,
  isSearchSheetOpen: false,
  minimumWithDrawalLimit: 0,
  token: false,
  blockedStateData: null,
  liveWinsData: [],
  liveWinsSocketData: null,
  vipData: [],
  bannerData: [],
  bannerLoading: true,
  betsTableData: [],
  betsTableLoading: true,
  homeGamedata: [],
  homeGameLoading: true,
  isFullScreen: false,
  socialMediaData: null,
  customPackageLimits: {
    minPurchaseLimit: 10,
    maxPurchaseLimit: 10000,
  },
  paymnetControlOptions: [],

};

// Define a reducer function
export function reducer(state, action) {
  switch (action.type) {
    case 'SET_LEFT_PANEL':
      return { ...state, leftPanel: action.payload };
    case 'SET_RIGHT_PANEL':
      return { ...state, rightPanel: action.payload };
    // Add other actions as needed
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_USER_LOADING':
      return { ...state, userLoading: action.payload };
    case 'SET_USER_ERROR':
      return { ...state, userError: action.payload };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_SELECTED_COIN':
      return { ...state, selectedCoin: action.payload };
    case 'SET_LOGIN_SIGNUP_DIALOG':
      return { ...state, loginSignupDialog: action.payload };
    case 'SET_LOGIN_MODE':
      return { ...state, loginMode: action.payload };
    case 'SET_IS_SEARCH_SHEET_OPEN':
      return { ...state, isSearchSheetOpen: action.payload };
    case 'SET_MIN_WITHDRAWAL_LIMIT':
      return { ...state, minWithdrawalLimit: action.payload };
    case 'SET_BLOCKED_STATE_DATA':
      return { ...state, blockedStateData: action.payload };
    case 'SET_VIP_DATA':
      return { ...state, vipData: action.payload };
    case 'SET_BANNER_DATA':
      return { ...state, bannerData: action.payload };
    case 'SET_BANNER_LOADING':
      return { ...state, bannerLoading: action.payload };
    case 'SET_BETS_TABLE_DATA':
      return { ...state, betsTableData: action.payload };
    case 'SET_BETS_TABLE_LOADING':
      return { ...state, betsTableLoading: action.payload };
    case 'SET_LIVE_WINS_DATA':
      return { ...state, liveWinsData: action.payload };
    case 'SET_HOME_GAME_DATA':
      return { ...state, homeGamedata: action.payload };
    case 'SET_HOME_GAME_LOADING':
      return { ...state, homeGameLoading: action.payload };
    case 'SET_FULLSCREEN':
      return { ...state, isFullScreen: action.payload };
      case 'SET_PAYMENT_CONTROL_OPTIONS':
        return {
          ...state,
          paymnetControlOptions: action.payload,
        };
    case 'SET_CASINO_CATEGORY_DATA':
      return {
        ...state,
        categoryData:
          action.payload?.map((category) => ({
            label: category?.title || category?.name?.EN || 'Unknown',
            value: category?.id,
            url: category?.url || '#',
            icon: category?.imageUrl || DefaultCategoryIcons,
          })) || [],
      };
    case 'SET_PROVIDER_CATEGORY_DATA':
      return {
        ...state,
        providerData: action?.payload,
      };
      case 'SET_SOCIAL_MEDIA_DATA':
        return {
          ...state,
          socialMediaData: action?.payload,
        };
    // socket updates
    case 'UPDATE_SOCKET_WALLET': {
      return {
        ...state,
        user: {
          ...state.user,
          userWallet: state.user?.userWallet?.map((wallet) =>
            wallet.currencyCode === action.payload.currencyCode
              ? { ...wallet, balance: `${action.payload.balance}` }
              : wallet
          ),
        },
      };
    }
    case 'SET_CUSTOM_PACKAGE_LIMITS': {
      return {
        ...state,
        customPackageLimits: action?.payload || {
          minPurchaseLimit: 10,
          maxPurchaseLimit: 10000,
        },
      };
    }
    //vip progress update
    case 'UPDATE_SOCKET_VIP_PROGRESS': {
      return {
        ...state,
        user: {
          ...state.user,
          userTierProgress: [
            {
              ...state.user.userTierProgress[0],
              wageringThreshold:
                state?.user?.userTierProgress[0]?.wageringThreshold +
                action.payload?.amount,
            },
          ],
        },
      };
    }
    //live wins update
    case 'UPDATE_SOCKET_LIVE_WINS': {
      return {
        ...state,
        liveWinsSocketData: action.payload.filter((item) => {
          const win = parseFloat(item.win_amount) || 0;
          const bet = parseFloat(item.bet_amount) || 0;
          return win > bet;
        }),
      };
    }
    // spin wheel states
    case 'SET_SPIN_WHEEL_DATA':
      return {
        ...state,
        wheelConfig: action.payload,
      };
    case 'SET_SPIN_WHEEL_RESULT':
      return {
        ...state,
        spinWheelResult: action.payload,
      };
    case 'SET_SPIN_WHEEL_SOUND':
      return {
        ...state,
        spinWheelSound: action.payload,
      };
    default:
      return state;
  }
}
