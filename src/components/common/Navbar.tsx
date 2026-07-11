import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


export default function Navbar() {
    const { t } = useTranslation();
  return (
    <nav>
      <Link to="/home">{t('nav.home')}</Link>
      {" | "}
      <Link to="/adventure">{t('nav.adventure')}</Link>
      {" | "}
      <Link to="/nature">{t('nav.nature')}</Link>
      {" | "}
      <Link to="/family">{t('nav.family')}</Link>
      {" | "}
      <Link to="/business">{t('nav.business')}</Link>
      {" | "}
      <Link to="/premium">{t('nav.premium')}</Link>
      {" | "}
      <Link to="/contact">{t('nav.contact')}</Link>
    </nav>
  );
}
