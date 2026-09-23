import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCopyright,
  faFilm,
  faGamepad,
  faLock,
  faPalette,
  faShieldHalved,
  faTriangleExclamation,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Styles are imported above; stop Font Awesome injecting a <style> at runtime.
config.autoAddCss = false;

// Same Font Awesome solid glyphs the legacy pages loaded from the CDN
// (fa-shield-alt / fa-exclamation-triangle are the v5 names of the v6+ icons).
const icons = {
  bars: faBars,
  palette: faPalette,
  film: faFilm,
  video: faVideo,
  gamepad: faGamepad,
  shield: faShieldHalved,
  lock: faLock,
  warning: faTriangleExclamation,
  copyright: faCopyright,
} as const;

export type IconName = keyof typeof icons;

export default function Icon({ name }: { name: IconName }) {
  return <FontAwesomeIcon icon={icons[name]} aria-hidden="true" />;
}
