import { styled } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import { MARK } from "../../../../constants/LerverageMark";

interface LeverageSliderProps {
  ratio: number;
  getValues: (event: Event, value: number | number[]) => void;
}

const LeverageSlider = (props: LeverageSliderProps) => {
  const { ratio, getValues } = props;

  return (
    <StyledReactSlider
      step={0.5}
      marks={MARK}
      max={5}
      min={1}
      defaultValue={1}
      value={ratio}
      onChange={getValues}
    />
  );
};

export default LeverageSlider;

const StyledReactSlider = styled(Slider)(() => ({
  width: "95%",
  height: "1.4rem",
  left: "50%",
  top: "0%",
  transform: "translateX(-50%)",
  color: "#007AFF",

  "&.Mui-disabled": {
    color: "#3E4064",
  },
  "& .MuiSlider-thumb": {
    width: "1.6rem",
    height: "1.6rem",
    borderRadius: 100,
    color: "#007AFF",

    "&:hover, &.Mui-focusVisible, &.Mui-active,": { boxShadow: "none" },
  },
  "& .MuiSlider-rail": {
    opacity: 100,
    height: "1.4rem",
    color: "#007AFF",
    borderRadius: 20,
    width: "100%",
    position: "relative",
    paddingLeft: "1.2rem",
    paddingRight: "1.2rem",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: "-1.2rem",
      // margin: "0 1.2rem",
      borderRadius: "2rem",
      backgroundColor: "#45464F",
      zIndex: -1,
    },
  },

  "& .MuiSlider-track": {
    zIndex: 1,
  },

  "& .MuiSlider-mark": {
    height: "0.5rem",
    width: "0.32rem",
    color: "#D9D9D9",
    borderRadius: 10,
    "&.MuiSlider-markActive": {
      backgroundColor: "#F2F2F7",
    },
  },
  "& .MuiSlider-markLabel": {
    marginTop: "0.4rem",
    color: "#C7C7CC",
    fontFamily: "Montserrat",
    fontSize: "1.1rem",
    fontStyle: "normal",
    fontWeight: "510",
    lineHeight: "1.4rem" /* 127.273% */,
    letterSpacing: "0.0066rem",
  },
}));
