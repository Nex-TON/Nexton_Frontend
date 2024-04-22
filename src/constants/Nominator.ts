import IcBlueFlag from "@/assets/icons/Stake/ic_blue_flag.svg";
import IcOrangeFlag from "@/assets/icons/Stake/ic_orange_flag.svg";
import IcPurpleFlag from "@/assets/icons/Stake/ic_purple_flag.svg";

export const NOMINATOR_LIST = [
  {
    title: "KoreaTon Pool #1",
    totalStake: 822.056,
    ValidatorStake: 19.082,
    NominatorStake: 802.974,
    type: "profit",
    check: false,
    icon: IcPurpleFlag,
  },
  {
    title: "HB Pool #1",
    totalStake: 754.197,
    ValidatorStake: 18.304,
    NominatorStake: 735893,
    type: "profit",
    check: false,
    icon: IcBlueFlag,
  },
  {
    title: "DG Pool #1",
    totalStake: 937.263,
    ValidatorStake: 36.115,
    NominatorStake: 901.149,
    type: "nonProfit",
    check: false,
    icon: IcOrangeFlag,
  },
];
