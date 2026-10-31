import Header from './Header'
import Footer from './Footer'
import AnnouncementBar from './AnnouncementBar'
import BackToTop from './BackToTop'
import ErrorBoundary from './ErrorBoundary'
import CookieNotice from './CookieNotice'
import GlobalAds from './GlobalAds'
import Analytics from './Analytics'
import AdsDebugPanel from './AdsDebugPanel'
import DownloadGate from './DownloadGate'

export default function Layout({ children, savedCount }) {
  return <><a className="skip-link" href="#main-content">Skip to content</a><AnnouncementBar where="top"/><Header savedCount={savedCount}/><AnnouncementBar where="below_header"/><main id="main-content"><ErrorBoundary>{children}</ErrorBoundary></main><Footer/><AnnouncementBar where="bottom"/><BackToTop/><CookieNotice/><GlobalAds/><Analytics/><AdsDebugPanel/><DownloadGate/></>
}
