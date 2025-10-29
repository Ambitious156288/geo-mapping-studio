import { DrawToolbarMobile } from "./DrawToolbarMobile";
import { DrawToolbarDesktop } from "./DrawToolbarDesktop";
import { useMedia } from "@/hooks/useMedia";
import type { ModeType } from "@/types/ui";

type Props = {
  mode: ModeType;
  setMode: (m: ModeType) => void;
};

export const DrawToolbar = ({ mode, setMode }: Props) => {
  const { isMobile } = useMedia();

  if (isMobile) {
    return <DrawToolbarMobile mode={mode} onModeChange={setMode} />;
  }

  return <DrawToolbarDesktop mode={mode} onModeChange={setMode} />;
};

export default DrawToolbar;
